/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// these factors mulpitply the arrows' size for smaller viewports
const SMALL_RESPONSIVE_FACTOR = 1.6;
const MEDIUM_RESPONSIVE_FACTOR = 1.3;

type ArrowContainerProps = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  size: number;
  rotate: number;
  children: React.ReactNode;
};

type SpecificArrowProps = {
  size: number;
  value: number;
};

function FooArrow({ size, value }: SpecificArrowProps) {
  return (
    <ArrowContainer top={5} left={30} rotate={170} size={size}>
      <ArrowValue value={value} top={1.5} right={1} size={size} />
    </ArrowContainer>
  );
}

function BarArrow({ size, value }: SpecificArrowProps) {
  return (
    <ArrowContainer top={5} right={30} rotate={300} size={size}>
      <ArrowValue value={value} top={1.5} left={1} size={size} />
    </ArrowContainer>
  );
}

function FactoryArrow({ size, value }: SpecificArrowProps) {
  return (
    <ArrowContainer bottom={5} left={30} rotate={120} size={size}>
      <ArrowValue value={value} bottom={1.5} right={1} size={size} />
    </ArrowContainer>
  );
}

function ShopArrow({ size, value }: SpecificArrowProps) {
  return (
    <ArrowContainer bottom={5} right={30} rotate={350} size={size}>
      <ArrowValue value={value} bottom={1.5} left={1} size={size} />
    </ArrowContainer>
  );
}

function ArrowContainer({
  top,
  bottom,
  left,
  right,
  size,
  rotate,
  children,
}: ArrowContainerProps) {
  function buildRules(size: number) {
    return `${top ? buildVerticalPositionRule("top", top, size) : ""}
        ${bottom ? buildVerticalPositionRule("bottom", bottom, size) : ""}
        ${left ? buildHorizontalPositionRule("left", left, size) : ""}
        ${right ? buildHorizontalPositionRule("right", right, size) : ""}
        `;
  }
  function buildVerticalPositionRule(
    positionName: string,
    position: number,
    size: number
  ) {
    return `${positionName}: calc(${position}rem - calc(${size}rem / 2));`;
  }
  function buildHorizontalPositionRule(
    positionName: string,
    position: number,
    size: number
  ) {
    return `${positionName}: calc(${position}% - calc(${size}rem / 2));`;
  }
  return (
    <div
      css={css`
        transition: all 0.3s ease;
        transition-property: top, bottom, left, right;
        position: absolute;
        ${buildRules(size / SMALL_RESPONSIVE_FACTOR)}

        @media (min-width: 450px) {
          ${buildRules(size / MEDIUM_RESPONSIVE_FACTOR)}
        }
        @media (min-width: 600px) {
          ${buildRules(size)}
        }
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
    // SVG Arrow by Daria Szymonowicz from the Noun Project
    <svg
      xmlns="http://www.w3.org/2000/svg"
      css={css`
        transition: all 0.3s ease;
        transition-property: width, height;
        transform: rotate(${rotate}deg);
        width: ${size / SMALL_RESPONSIVE_FACTOR}rem;
        height: ${size / SMALL_RESPONSIVE_FACTOR}rem;

        @media (min-width: 450px) {
          width: ${size / MEDIUM_RESPONSIVE_FACTOR}rem;
          height: ${size / MEDIUM_RESPONSIVE_FACTOR}rem;
        }
        @media (min-width: 600px) {
          width: ${size}rem;
          height: ${size}rem;
        }
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
  const fontSizeFactor = 4.4;
  const horizontalPositionFactor = 5;
  const verticalPositionFactor = 7;
  function buildRules(size: number) {
    return `${top ? buildVerticalPositionRule("top", top, size) : ""}
        ${bottom ? buildVerticalPositionRule("bottom", bottom, size) : ""}
        ${left ? buildHorizontalPositionRule("left", left, size) : ""}
        ${right ? buildHorizontalPositionRule("right", right, size) : ""}
        font-size: ${size / fontSizeFactor}rem;
        `;
  }
  function buildVerticalPositionRule(
    positionName: string,
    position: number,
    size: number
  ) {
    return `${positionName}: ${(position * size) / verticalPositionFactor}rem;`;
  }
  function buildHorizontalPositionRule(
    positionName: string,
    position: number,
    size: number
  ) {
    return `${positionName}: ${
      (position * size) / horizontalPositionFactor
    }rem;`;
  }
  return (
    <span
      css={css`
        position: absolute;
        transition: all 0.3s ease;
        transition-property: font-size, top, bottom, left, right;
        ${buildRules(size / SMALL_RESPONSIVE_FACTOR)}

        @media (min-width: 450px) {
          ${buildRules(size / MEDIUM_RESPONSIVE_FACTOR)}
        }
        @media (min-width: 600px) {
          ${buildRules(size)}
        }
      `}
    >
      {value}
    </span>
  );
}

export { FooArrow, BarArrow, FactoryArrow, ShopArrow };
