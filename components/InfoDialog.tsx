import * as React from "react";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";


interface InfoDialogProps {
  description: string;
  rarity: string;
  triggerAsChild?: boolean;
}

export function InfoDialog({ description, rarity, triggerAsChild }: InfoDialogProps) {
  const t = useTranslations();
  return (
    <Popover>
      <PopoverTrigger asChild={!!triggerAsChild}>
        {triggerAsChild ? (
          <span
            className="absolute top-1 right-1 z-20 rounded-full bg-black/60 hover:bg-black/80 p-1 text-white shadow focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            aria-label={t('equipment.info', { defaultValue: '詳細情報' })}
            tabIndex={0}
            onClick={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
            role="button"
          >
            <Info size={18} />
          </span>
        ) : (
          <button
            type="button"
            className="absolute top-1 right-1 z-20 rounded-full bg-black/60 hover:bg-black/80 p-1 text-white shadow focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={t('equipment.info', { defaultValue: '詳細情報' })}
            tabIndex={0}
            onClick={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
          >
            <Info size={18} />
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent className="max-w-xs text-sm text-muted-foreground bg-background border">
        <div className="font-bold mb-2">{t('equipment.info', { defaultValue: '詳細情報' })}</div>
        <div className="mb-1"><span className="font-semibold">{t('equipment.rarity.name', { defaultValue: 'レアリティ' })}: </span>{rarity}</div>
        <div>{description}</div>
      </PopoverContent>
    </Popover>
  );
}
