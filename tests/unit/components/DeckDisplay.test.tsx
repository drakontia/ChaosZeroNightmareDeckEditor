import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DeckDisplay } from '@/components/DeckDisplay';
import { CardType, CardCategory, CardStatus, DeckCard } from '@/types';
import { NextIntlClientProvider } from 'next-intl';

// Mock components
vi.mock('@/components/CardFrame', () => ({
  CardFrame: ({ isCopied, statuses, name }: any) => (
    <div data-testid="card-frame">
      <div data-testid="card-name">{name}</div>
      {isCopied && <div data-testid="is-copied">Flipped</div>}
      {statuses && statuses.length > 0 && (
        <div data-testid="statuses">{statuses.join(', ')}</div>
      )}
    </div>
  )
}));

vi.mock('@/components/HiramekiControls', () => ({
  HiramekiControls: () => <div data-testid="hirameki-controls">Controls</div>
}));

vi.mock('@/components/CardActionsMenu', () => ({
  CardActionsMenu: () => <div data-testid="card-actions">Actions</div>
}));

vi.mock('@/components/ui/card', () => ({
  Card: ({ children }: any) => <div data-testid="card-container">{children}</div>
}));

describe('DeckDisplay - Copied Card Feature', () => {
  const messages = {
    deck: {
      selectCharacterHint: 'Select a character'
    },
    category: {
      attack: 'Attack',
      skill: 'Skill',
      upgrade: 'Upgrade'
    },
    status: {
      unique: 'Unique',
      copied: 'Copied',
      exhaust: 'Exhaust'
    },
    cards: {
      'test-card': {
        name: 'Test Card',
        descriptions: {
          0: 'Base description'
        }
      }
    }
  };

  const createMockCard = (overrides?: Partial<DeckCard>): DeckCard => ({
    id: 'test-card',
    deckId: 'deck-1',
    name: 'Test Card',
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    hiramekiVariations: [
      {
        level: 0,
        cost: 2,
        description: 'Base description',
        statuses: []
      }
    ],
    selectedHiramekiLevel: 0,
    godHiramekiType: null,
    godHiramekiEffectId: null,
    isBasicCard: false,
    isCopied: false,
    ...overrides
  });

  const renderWithIntl = (ui: React.ReactElement) => {
    return render(
      <NextIntlClientProvider locale="en" messages={messages}>
        {ui}
      </NextIntlClientProvider>
    );
  };

  const mockHandlers = {
    onRemoveCard: vi.fn(),
    onUndoCard: vi.fn(),
    onCopyCard: vi.fn(),
    onConvertCard: vi.fn(),
    onUpdateHirameki: vi.fn(),
    onSetGodHirameki: vi.fn(),
    onSetGodHiramekiEffect: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display "copied" status for copied cards', () => {
    const copiedCard = createMockCard({
      deckId: 'deck-copied',
      isCopied: true
    });

    renderWithIntl(
      <DeckDisplay
        cards={[copiedCard]}
        egoLevel={0}
        hasPotential={false}
        {...mockHandlers}
      />
    );

    const statuses = screen.getByTestId('statuses');
    expect(statuses.textContent).toContain('Copied');
  });

  it('should not display "copied" status for non-copied cards', () => {
    const normalCard = createMockCard({
      deckId: 'deck-normal',
      isCopied: false
    });

    renderWithIntl(
      <DeckDisplay
        cards={[normalCard]}
        egoLevel={0}
        hasPotential={false}
        {...mockHandlers}
      />
    );

    const statusElements = screen.queryAllByTestId('statuses');
    if (statusElements.length > 0) {
      statusElements.forEach(element => {
        expect(element.textContent).not.toContain('Copied');
      });
    }
  });

  it('should display "copied" status along with other statuses', () => {
    const copiedCard = createMockCard({
      deckId: 'deck-copied-unique',
      isCopied: true,
      statuses: [CardStatus.UNIQUE, CardStatus.EXHAUST]
    });

    renderWithIntl(
      <DeckDisplay
        cards={[copiedCard]}
        egoLevel={0}
        hasPotential={false}
        {...mockHandlers}
      />
    );

    const statuses = screen.getByTestId('statuses');
    expect(statuses.textContent).toContain('Unique');
    expect(statuses.textContent).toContain('Exhaust');
    expect(statuses.textContent).toContain('Copied');
  });

  it('should pass isCopied prop to CardFrame', () => {
    const copiedCard = createMockCard({
      deckId: 'deck-copied',
      isCopied: true
    });

    renderWithIntl(
      <DeckDisplay
        cards={[copiedCard]}
        egoLevel={0}
        hasPotential={false}
        {...mockHandlers}
      />
    );

    // CardFrame should indicate the card is flipped
    expect(screen.getByTestId('is-copied')).toBeDefined();
  });

  it('should not pass isCopied as true for non-copied cards', () => {
    const normalCard = createMockCard({
      deckId: 'deck-normal',
      isCopied: false
    });

    renderWithIntl(
      <DeckDisplay
        cards={[normalCard]}
        egoLevel={0}
        hasPotential={false}
        {...mockHandlers}
      />
    );

    // CardFrame should not indicate the card is flipped
    expect(screen.queryByTestId('is-copied')).toBeNull();
  });

  it('should display multiple cards with mixed copied status', () => {
    const cards = [
      createMockCard({ deckId: 'deck-1', isCopied: false }),
      createMockCard({ deckId: 'deck-2', isCopied: true }),
      createMockCard({ deckId: 'deck-3', isCopied: false }),
      createMockCard({ deckId: 'deck-4', isCopied: true })
    ];

    renderWithIntl(
      <DeckDisplay
        cards={cards}
        egoLevel={0}
        hasPotential={false}
        {...mockHandlers}
      />
    );

    const cardFrames = screen.getAllByTestId('card-frame');
    expect(cardFrames).toHaveLength(4);

    const flippedCards = screen.getAllByTestId('is-copied');
    expect(flippedCards).toHaveLength(2);
  });
});
