import { Container, ContainerInvisible } from './styles';
import { Card } from 'types';
import { CSSProperties, forwardRef, Ref, useImperativeHandle, useRef } from 'react';

type Props = {
  card: Card;
  onSelect: (card: Card) => void;
  selected: boolean;
  disabled?: boolean;
  shadowXY?: number;
};

export type CardItemRef = {
  startRemovedAnimation: (animationEnd?: () => void) => void;
};

const AnimationsClassNames = ['remove-pyramid-card-animation-right', 'remove-pyramid-card-animation-left'];

function CardItem({ card, onSelect, selected, disabled = false, shadowXY }: Props, ref: Ref<CardItemRef>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => {
    return {
      startRemovedAnimation: startRemovedAnimation,
    };

    function startRemovedAnimation(animationEnd?: () => void) {
      if (!containerRef.current) throw Error('containerRef is null');
      const container = containerRef.current;

      const animation = AnimationsClassNames[Math.floor(Math.random() * AnimationsClassNames.length)];

      requestAnimationFrame(() => {
        container.classList.add(animation);
        container.addEventListener('animationend', () => {
          animationEnd && animationEnd();
          container.classList.remove(animation);
        });
      });
    }
  });

  function handleOnClick() {
    if (disabled) {
      return;
    }
    onSelect(card);
  }

  function getStyle() {
    let style: CSSProperties = {};
    if (shadowXY && !selected) {
      style = {
        boxShadow: `${shadowXY}px ${shadowXY}px #00000022`,
      };
    }
    return { ...style, cursor: disabled ? 'default' : 'pointer' };
  }

  return (
    <Container ref={containerRef} selected={selected} onClick={handleOnClick} style={getStyle()}>
      <img src={`/cards/${card.imgSrc}`} alt="Card" />
    </Container>
  );
}

export function CardItemInvisible() {
  return <ContainerInvisible />;
}

export default forwardRef<CardItemRef, Props>(CardItem);
