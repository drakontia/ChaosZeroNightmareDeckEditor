"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { toPng } from "html-to-image";

export function useExportDeckImage() {
  const t = useTranslations();
  const [isExporting, setIsExporting] = useState(false);

  const handleExportDeckImage = useCallback(
    async (deckCaptureRef: React.RefObject<HTMLDivElement | null>, deckName: string) => {
      if (isExporting) return;
      const node = deckCaptureRef.current;
      if (!node) return;

      const placeholderImg =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAtMB9oN2sT8AAAAASUVORK5CYII=";
      const cleanup: Array<() => void> = [];

      try {
        setIsExporting(true);
        // Give the layout a tick to ensure sizes are settled
        await new Promise(requestAnimationFrame);

        // Replace cross-origin images to avoid canvas tainting
        const imgs = Array.from(node.querySelectorAll("img"));
        imgs.forEach((img) => {
          const src = img.currentSrc || img.src;
          try {
            const url = new URL(src, window.location.href);
            if (url.origin !== window.location.origin) {
              const original = img.src;
              img.src = placeholderImg;
              cleanup.push(() => {
                img.src = original;
              });
            }
          } catch {
            // Ignore malformed URLs
          }
        });

        const pixelRatio = Math.min(window.devicePixelRatio || 2, 3);
        const dataUrl = await toPng(node, {
          cacheBust: true,
          pixelRatio,
        });

        const link = document.createElement("a");
        link.download = `${deckName || "deck"}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("Failed to export deck image", message);
        alert(
          t("deck.exportImageFailed", {
            defaultValue: "デッキ画像の保存に失敗しました。",
          })
        );
      } finally {
        cleanup.forEach((fn) => fn());
        setIsExporting(false);
      }
    },
    [isExporting, t]
  );

  return { isExporting, handleExportDeckImage };
}
