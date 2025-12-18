"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Character } from "@/types";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Field } from "./ui/field";

interface CharacterSelectorProps {
  characters: Character[];
  selectedCharacter: Character | null;
  onSelect: (character: Character) => void;
}

export function CharacterSelector({ characters, selectedCharacter, onSelect }: CharacterSelectorProps) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (character: Character) => {
    onSelect(character);
    setIsOpen(false);
  };

  return (
    <Field className="mb-6">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-32 border-dashed relative overflow-hidden"
          >
            {selectedCharacter ? (
              <>
                {selectedCharacter.imgUrl && (
                  <div className="absolute inset-0 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={selectedCharacter.imgUrl}
                      alt={t(selectedCharacter.name)}
                      fill
                      className="object-cover"
                      sizes="100%"
                    />
                  </div>
                )}
                <div 
                  className="relative z-10 ml-auto flex flex-col text-right pr-4 text-shadow-md"
                >
                  <span className="text-4xl font-semibold text-white">{t(selectedCharacter.name)}</span>
                  <span className="text-2xl text-white">{t(`rarity.${selectedCharacter.rarity}`)}</span>
                </div>
              </>
            ) : (
              <span className="text-muted-foreground font-semibold">{t('character.select')}</span>
            )}
          </Button>
        </DialogTrigger>

        <DialogContent className="max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>{t('character.select')}</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-0 overflow-y-auto max-h-[65vh]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {characters.map((character) => (
                <Button
                  key={character.id}
                  variant={selectedCharacter?.id === character.id ? "secondary" : "outline"}
                  className="h-auto flex-col justify-start p-4 text-center"
                  onClick={() => handleSelect(character)}
                >
                  {character.imgUrl && (
                    <div className="relative w-full aspect-square rounded-md overflow-hidden bg-muted mb-3">
                      <Image
                        src={character.imgUrl}
                        alt={t(character.name)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-col w-full">
                    <span className="text-base font-semibold">{t(character.name)}</span>
                    <span className="text-xs text-muted-foreground">{t(`rarity.${character.rarity}`)}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Field>
  );
}
