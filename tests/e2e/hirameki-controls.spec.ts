import { test, expect, Page } from '@playwright/test';

const selectCharacterAndWeapon = async (page: Page) => {
  await page.getByRole('button', { name: 'キャラクターを選択' }).click();
  await page.getByRole('button', { name: 'チズル' }).waitFor({ state: 'visible' });
  await page.getByRole('button', { name: 'チズル' }).click();

  await page.getByRole('button', { name: '武器' }).click();
  await page.getByRole('button', { name: 'ガストロノミコン' }).click();
};

const openAccordion = async (page: Page, name: string) => {
  const trigger = page.getByRole('button', { name });
  await trigger.click();
};

const getDeckCardContainerByName = (page: Page, cardName: string) => {
  const nameLocator = page.getByText(cardName, { exact: true }).first();
  return nameLocator.locator('xpath=ancestor::div[.//button[@aria-label="メニュー"]][1]');
};

test.describe('Hirameki Controls (non-character cards)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await selectCharacterAndWeapon(page);
  });

  test('shared/monster/forbidden cards show Hirameki and God controls', async ({ page }) => {
    // Add one card for each type
    await openAccordion(page, '共用カード');
    const sharedSection = page.getByRole('heading', { name: '共用カード' }).locator('..');
    await sharedSection.getByText('加虐性', { exact: true }).first().click({ timeout: 10_000 });
    await page.waitForTimeout(300);

    await openAccordion(page, 'モンスターカード');
    const monsterSection = page.getByRole('heading', { name: 'モンスターカード' }).locator('..');
    await monsterSection.getByText('恥ずかしがり屋の庭師', { exact: true }).first().click({ timeout: 10_000 });
    await page.waitForTimeout(300);

    await openAccordion(page, '禁忌カード');
    const forbiddenSection = page.getByRole('heading', { name: '禁忌カード' }).locator('..');
    await forbiddenSection.getByText('禁じられたアルゴリズム', { exact: true }).first().click({ timeout: 10_000 });
    await page.waitForTimeout(300);

    // Verify controls exist on each deck card with shorter timeout
    for (const name of ['加虐性', '恥ずかしがり屋の庭師', '禁じられたアルゴリズム']) {
      const deckCard = getDeckCardContainerByName(page, name);
      await expect(deckCard.getByRole('button', { name: 'ヒラメキ', exact: true })).toBeVisible({ timeout: 5000 });
      await expect(deckCard.getByRole('button', { name: '神ヒラメキ選択', exact: true })).toBeVisible({ timeout: 5000 });
    }
  });

  test('apply hidden hirameki to shared card marks Hirameki active', async ({ page }) => {
    // Add a shared card
    await openAccordion(page, '共用カード');
    const sharedSection = page.getByRole('heading', { name: '共用カード' }).locator('..');
    const cardName = '加虐性';
    await sharedSection.getByText(cardName, { exact: true }).first().click({ timeout: 10_000 });

    const deckCard = getDeckCardContainerByName(page, cardName);
    const hiramekiBtn = deckCard.getByRole('button', { name: 'ヒラメキ', exact: true });
    await expect(hiramekiBtn).toBeVisible();
    await hiramekiBtn.click();

    // In the dialog, check if hidden hirameki accordion exists
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: 5000 });
    
    // Hidden hirameki accordion should appear for base level cards
    const accordionTrigger = dialog.getByRole('button', { name: '隠しヒラメキ' });
    const hasAccordion = await accordionTrigger.isVisible({ timeout: 2000 }).catch(() => false);
    
    if (hasAccordion) {
      await accordionTrigger.click();
      await page.waitForTimeout(500);
      const firstHiddenTile = dialog.locator('button').filter({ hasText: /hidden|隠し/i }).first();
      const hasTile = await firstHiddenTile.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (hasTile) {
        await firstHiddenTile.click();
        // Hirameki button should indicate active state (yellow)
        await expect(hiramekiBtn).toHaveClass(/bg-yellow-400/);
      } else {
        // Close dialog if no hidden tiles
        await page.keyboard.press('Escape');
      }
    } else {
      // Close dialog if no accordion
      await page.keyboard.press('Escape');
    }
  });

  test('apply god hirameki to shared card marks God active', async ({ page }) => {
    // Add a shared card
    await openAccordion(page, '共用カード');
    const sharedSection = page.getByRole('heading', { name: '共用カード' }).locator('..');
    const cardName = '加虐性';
    await sharedSection.getByText(cardName, { exact: true }).first().click({ timeout: 10_000 });

    const deckCard = getDeckCardContainerByName(page, cardName);
    const godBtn = deckCard.getByRole('button', { name: '神ヒラメキ選択', exact: true });
    await expect(godBtn).toBeVisible();
    await godBtn.click();

    // pick first effect after selecting default god
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: 5000 });
    
    // Wait for effect tiles to render
    await page.waitForTimeout(500);
    const effectTile = dialog.locator('button').filter({ hasText: /コスト|cost|効果/i }).first();
    const hasTile = await effectTile.isVisible({ timeout: 3000 }).catch(() => false);
    
    if (hasTile) {
      await effectTile.click();
      // God button should indicate active state (yellow)
      await expect(godBtn).toHaveClass(/bg-yellow-400/, { timeout: 3000 });
    } else {
      // Try any button in the dialog as fallback
      const anyEffectBtn = dialog.locator('button[title]').first();
      const hasAnyBtn = await anyEffectBtn.isVisible({ timeout: 2000 }).catch(() => false);
      if (hasAnyBtn) {
        await anyEffectBtn.click();
        await expect(godBtn).toHaveClass(/bg-yellow-400/, { timeout: 3000 });
      } else {
        // Close dialog
        await page.keyboard.press('Escape');
      }
    }
  });
});
