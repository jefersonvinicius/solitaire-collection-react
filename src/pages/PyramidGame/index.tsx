import { useEffect, useRef, useState } from 'react';
import CardItem, { CardItemInvisible, CardItemRef } from 'components/CardItem';
import { Card } from 'types';
import { createDeck, shuffleDeck } from 'utils/decks';
import { Container, CardPlaceholder, ExtraCardsBox, Pyramid, PyramidRow } from './styles';
import { isDisabledCardToSelect } from './helpers';

const USE_PYRAMID_SMALL = false;

export type PyramidCards = (Card | null)[];

export default function PyramidGame() {
  const [extraDeckRight, setExtraDeckRight] = useState<Card[]>([]);
  const [extraDeckLeft, setExtraDeckLeft] = useState<Card[]>([]);
  const [pyramid, setPyramid] = useState<PyramidCards>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const cardsRefs = useRef<{ [key: string]: CardItemRef | null }>({});

  function initGame() {
    const deck = createDeck();
    const deckShuffled = shuffleDeck(deck);
    let pyramidCards: PyramidCards = deckShuffled.slice(0, 28);
    if (USE_PYRAMID_SMALL) {
      pyramidCards = pyramidCards.map((card, index) => {
        if (index < 3) {
          return card;
        }
        return null;
      });
    }
    const restCards = deckShuffled.slice(28);
    setPyramid(pyramidCards);
    setExtraDeckRight(restCards);
    setExtraDeckLeft([]);
  }

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (pyramid.length > 0 && pyramid.every((card) => card === null)) {
      alert('Ganhou! Para béns.');
      initGame();
    }
  }, [pyramid]);

  function handleSelectCard(card: Card) {
    if (card.id === selectedCard?.id) {
      setSelectedCard(null);
      return;
    }

    if (isKingCard()) {
      setSelectedCard(null);
      cardsRefs.current[card.id]?.startRemovedAnimation(() => {
        setPyramid((state) => state.map(markSelectedCardAsNull));
        setExtraDeckRight((state) => state.filter(filterCardsNotSelected));
        setExtraDeckLeft((state) => state.filter(filterCardsNotSelected));
      });
      return;
    }

    if (selectionIsEquals13()) {
      setSelectedCard(null);
      cardsRefs.current[selectedCard?.id || '']?.startRemovedAnimation();
      cardsRefs.current[card.id]?.startRemovedAnimation(() => {
        setPyramid((state) => state.map(markSelectionAsNull));
        setExtraDeckRight((state) => state.filter(filterCardNotPresentInSelection));
        setExtraDeckLeft((state) => state.filter(filterCardNotPresentInSelection));
      });
      return;
    }

    setSelectedCard(card);

    function isKingCard() {
      return card.value === 13;
    }

    function selectionIsEquals13() {
      return (selectedCard?.value ?? 0) + card.value === 13;
    }

    function markSelectedCardAsNull(c: Card | null) {
      if (c?.id === card.id) {
        return null;
      }
      return c;
    }

    function markSelectionAsNull(c: Card | null) {
      if (c?.id === selectedCard?.id || c?.id === card.id) {
        return null;
      }
      return c;
    }

    function filterCardNotPresentInSelection(c: Card) {
      return c.id !== selectedCard?.id && c.id !== card.id;
    }

    function filterCardsNotSelected(c: Card) {
      return c.id !== card.id;
    }
  }

  function renderPyramid() {
    let cardIndex = 0;
    const pyramidElement: JSX.Element[] = [];
    for (let row = 1; row <= 7; row++) {
      const cardsItems: JSX.Element[] = [];
      for (let column = 0; column < row; column++) {
        const card = pyramid[cardIndex];
        const cardItem = renderCardItem(card, cardIndex);
        cardsItems.push(cardItem);
        cardIndex++;
      }

      pyramidElement.push(<PyramidRow key={row.toString()}>{cardsItems}</PyramidRow>);
    }

    return pyramidElement;

    function renderCardItem(card: Card | null, index: number) {
      if (!card) {
        return <CardItemInvisible key={index.toString()} />;
      }

      const disabled = isDisabledCardToSelect(index, pyramid);

      return (
        <CardItem
          ref={(ref) => (cardsRefs.current[card.id] = ref)}
          key={card.id}
          card={card}
          onSelect={handleSelectCard}
          selected={card.id === selectedCard?.id}
          disabled={disabled}
        />
      );
    }
  }

  function handleExtraCardClick() {
    if (extraDeckRight.length > 0) {
      const cardToMove = extraDeckRight.shift() as Card;
      setExtraDeckRight([...extraDeckRight]);
      setExtraDeckLeft([cardToMove, ...extraDeckLeft]);
    } else {
      setExtraDeckRight(extraDeckLeft.reverse());
      setExtraDeckLeft([]);
    }
  }

  const rightDeckCardTop = extraDeckRight[0];
  const leftDeckCardTop = extraDeckLeft[0];

  return (
    <Container>
      {pyramid.length > 0 && <Pyramid>{renderPyramid()}</Pyramid>}
      <ExtraCardsBox>
        {leftDeckCardTop ? (
          <CardItem
            ref={(ref) => (cardsRefs.current[leftDeckCardTop.id] = ref)}
            card={leftDeckCardTop}
            onSelect={handleSelectCard}
            selected={leftDeckCardTop.id === selectedCard?.id}
            shadowXY={extraDeckLeft.length * 0.2}
          />
        ) : (
          <CardPlaceholder />
        )}
        <button onClick={handleExtraCardClick} />
        {rightDeckCardTop ? (
          <CardItem
            ref={(ref) => (cardsRefs.current[rightDeckCardTop.id] = ref)}
            card={rightDeckCardTop}
            onSelect={handleSelectCard}
            selected={rightDeckCardTop.id === selectedCard?.id}
            shadowXY={extraDeckRight.length * 0.2}
          />
        ) : (
          <CardPlaceholder />
        )}
      </ExtraCardsBox>
    </Container>
  );
}
