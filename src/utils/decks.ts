import { Card } from 'types';
import { v4 as uuid } from 'uuid';

const Suits = ['C', 'D', 'H', 'S'];
const CardValueMappedToLetter: { [key: number]: string } = {
  1: 'A',
  11: 'J',
  12: 'Q',
  13: 'K',
};

export function createDeck(): Card[] {
  const cards: Card[] = [];

  for (let i = 1; i <= 13; i++) {
    let cardLetter = CardValueMappedToLetter[i];
    if (!cardLetter) cardLetter = String(i);

    for (const suit of Suits) {
      const img = `${cardLetter}${suit}.png`;
      const card: Card = {
        id: uuid(),
        imgSrc: img,
        value: i,
      };
      cards.push(card);
    }
  }

  return cards;
}

export function shuffleDeck(deck: Card[]) {
  for (let i = 0; i < deck.length; i++) {
    const index = random();
    const targetIndex = random();
    swap(index, targetIndex);
  }
  return deck;

  function random() {
    return Math.floor(Math.random() * deck.length);
  }

  function swap(index: number, targetIndex: number) {
    const hold = deck[index];
    deck[index] = deck[targetIndex];
    deck[targetIndex] = hold;
  }
}
