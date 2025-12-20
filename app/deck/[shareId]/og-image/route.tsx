import { ImageResponse } from 'next/og';
import { decodeDeckShare } from '@/lib/deck-share';
import { cookies } from 'next/headers';

export const runtime = 'edge';

async function getLocaleMessages(locale: string) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch {
    return (await import(`@/messages/ja.json`)).default;
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ shareId: string }> }
) {
  const { shareId } = await params;
  const deck = decodeDeckShare(shareId);

  if (!deck) {
    return new Response('Deck not found', { status: 404 });
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'ja';
  const messages = await getLocaleMessages(locale);

  const t = (key: string, fallback: string) => {
    const keys = key.split('.');
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
      if (!value) return fallback;
    }
    return value || fallback;
  };

  const deckName = deck.name || t('deck.noDeck', 'Unnamed Deck');
  const characterName = deck.character?.name 
    ? (messages as any).character?.[deck.character.id] || deck.character.name
    : t('character.select', 'No Character');
  const cardCount = deck.cards.length;
  const createdDate = new Date(deck.createdAt).toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // Calculate faint memory points
  let faintMemoryPoints = 0;
  for (const card of deck.cards) {
    if (card.type === 'shared') faintMemoryPoints += 20;
    if (card.type === 'monster') faintMemoryPoints += 80;
    if (card.type === 'forbidden') faintMemoryPoints += 20;
    if ((card.type === 'shared' || card.type === 'monster') && card.selectedHiramekiLevel > 0) {
      faintMemoryPoints += 10;
    }
    if (card.godHiramekiType) faintMemoryPoints += 20;
  }

  const labels = {
    title: t('app.title', 'カオスゼロナイトメア デッキエディター'),
    character: t('character.title', 'キャラクター'),
    totalCards: t('deck.totalCards', 'カード枚数'),
    faintMemory: t('character.faintMemory', '曖昧な記憶'),
    createdDate: t('deck.createdDate', '作成日'),
    cardUnit: t('deck.shareCardUnit', '枚'),
  };

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#1a1a1a',
          padding: '60px',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#2a2a2a',
            borderRadius: '20px',
            padding: '40px',
            width: '100%',
            height: '100%',
            border: '3px solid #404040',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 48,
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '20px',
            }}
          >
            {deckName}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 32,
              color: '#a0a0a0',
              marginBottom: '40px',
            }}
          >
            {labels.title}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              fontSize: 28,
              color: '#e0e0e0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#9090ff', marginRight: '10px' }}>{labels.character}:</span>
              <span>{characterName}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#9090ff', marginRight: '10px' }}>{labels.totalCards}:</span>
              <span>{cardCount}{labels.cardUnit}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#9090ff', marginRight: '10px' }}>{labels.faintMemory}:</span>
              <span>{faintMemoryPoints} pt</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#9090ff', marginRight: '10px' }}>{labels.createdDate}:</span>
              <span>{createdDate}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
