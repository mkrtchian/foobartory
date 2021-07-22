/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

type ArrowContainerProps = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  size: number;
  rotate: number;
  children: React.ReactNode;
};

function ArrowContainer({
  top,
  bottom,
  left,
  right,
  size,
  rotate,
  children,
}: ArrowContainerProps) {
  function buildVerticalPositionRule(positionName: string, position: number) {
    return `${positionName}: calc(${position}rem - calc(${size}rem / 2));`;
  }
  function buildHorizontalPositionRule(positionName: string, position: number) {
    return `${positionName}: calc(${position}% - calc(${size}rem / 2));`;
  }
  return (
    <div
      css={css`
        transition: all 0.3s ease;
        transition-property: top, bottom, left, right;
        ${top ? buildVerticalPositionRule("top", top) : ""}
        ${bottom ? buildVerticalPositionRule("bottom", bottom) : ""}
        ${left ? buildHorizontalPositionRule("left", left) : ""}
        ${right ? buildHorizontalPositionRule("right", right) : ""}
        position: absolute;
      `}
    >
      <Arrow rotate={rotate} size={size} />
      {children}
    </div>
  );
}

type ArrowProps = {
  rotate: number;
  size: number;
};

function Arrow({ rotate, size }: ArrowProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      css={css`
        transition: all 0.3s ease;
        transition-property: width, height;
        transform: rotate(${rotate}deg);
        width: ${size}rem;
        height: ${size}rem;
      `}
      height="100%"
      width="100%"
      viewBox="0 0 100 100"
    >
      <g>
        <path d="M84.68,75.29l-13.78-31L64,53.77c-2.89-1.86-5.92-3.51-8.87-5.28L42.23,40.37C33.55,35,24.81,29.77,15.93,24.71l-.61.83c7.56,6.88,15.26,13.56,23,20.17l11.72,9.8c2.6,2.25,5.11,4.63,7.77,6.8L51,71.75Z" />
      </g>
    </svg>
  );
}

type ArrowValueProps = {
  value: number;
  size: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

function ArrowValue({
  value,
  size,
  top,
  bottom,
  left,
  right,
}: ArrowValueProps) {
  function buildPositionRule(positionName: string, position: number) {
    return `${positionName}: ${(position * size) / 7}rem;`;
  }
  return (
    <span
      css={css`
        position: absolute;
        transition: all 0.3s ease;
        transition-property: font-size, top, bottom, left, right;
        ${top ? buildPositionRule("top", top) : ""}
        ${bottom ? buildPositionRule("bottom", bottom) : ""}
        ${left ? buildPositionRule("left", left) : ""}
        ${right ? buildPositionRule("right", right) : ""}
        font-size: ${size / 4}rem;
      `}
    >
      {value}
    </span>
  );
}

type SpecificArrowProps = {
  size: number;
  value: number;
};

function FooArrow({ size, value }: SpecificArrowProps) {
  return (
    <ArrowContainer top={5.5} left={30} rotate={170} size={size}>
      <ArrowValue value={value} top={1.5} right={1} size={size} />
    </ArrowContainer>
  );
}

function BarArrow({ size, value }: SpecificArrowProps) {
  return (
    <ArrowContainer top={5.5} right={30} rotate={300} size={size}>
      <ArrowValue value={value} top={1.5} left={1} size={size} />
    </ArrowContainer>
  );
}

function FactoryArrow({ size, value }: SpecificArrowProps) {
  return (
    <ArrowContainer bottom={5.5} left={30} rotate={120} size={size}>
      <ArrowValue value={value} bottom={1.5} right={1} size={size} />
    </ArrowContainer>
  );
}

function ShopArrow({ size, value }: SpecificArrowProps) {
  return (
    <ArrowContainer bottom={5.5} right={30} rotate={350} size={size}>
      <ArrowValue value={value} bottom={1.5} left={1} size={size} />
    </ArrowContainer>
  );
}

export { FooArrow, BarArrow, FactoryArrow, ShopArrow };
