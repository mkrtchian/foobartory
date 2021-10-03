/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import robotImage from "./robot.svg";

// these factors mulpitply the circles' size for smaller viewports
const SMALL_RESPONSIVE_FACTOR = 1.6;
const MEDIUM_RESPONSIVE_FACTOR = 1.3;
const FONT_FACTOR = 2.3;

type CircleProps = {
  size: number;
  positions: string;
  children: React.ReactNode;
};

type SpecificCircleProps = {
  size: number;
  children: React.ReactNode;
};

const circle = css`
  position: absolute;
  transition: all 0.3s ease;
  transition-property: width, height, top, left, font-size;
  color: #eee;
  display: grid;
  place-content: center;
  /* SVG robot By Simon Sim, SG from the Noun Project */
  background-image: url(${robotImage});
  background-position: 50% 50%;
  background-size: 130%;
`;

function FooCircle({ size, children }: SpecificCircleProps) {
  return (
    <Circle size={size} positions="top: 0; left: 0;">
      {children}
    </Circle>
  );
}

function BarCircle({ size, children }: SpecificCircleProps) {
  return (
    <Circle size={size} positions="top: 0; right: 0;">
      {children}
    </Circle>
  );
}

function FactoryCircle({ size, children }: SpecificCircleProps) {
  return (
    <Circle size={size} positions="bottom: 0; left: 0;">
      {children}
    </Circle>
  );
}

function ShopCircle({ size, children }: SpecificCircleProps) {
  return (
    <Circle size={size} positions="bottom: 0; right: 0;">
      {children}
    </Circle>
  );
}

function Circle({ size, positions, children }: CircleProps) {
  function buildRules(size: number) {
    return `width: ${size}rem;
        height: ${size}rem;
        font-size: ${size / FONT_FACTOR}rem;
        `;
  }
  return (
    <div
      css={css`
        ${circle}
        ${positions}
        ${buildRules(size / SMALL_RESPONSIVE_FACTOR)}

        @media (min-width: 450px) {
          ${buildRules(size / MEDIUM_RESPONSIVE_FACTOR)}
        }
        @media (min-width: 600px) {
          ${buildRules(size)}
        }
      `}
    >
      {children}
    </div>
  );
}

function MovingCircle({ size, children }: SpecificCircleProps) {
  function buildRules(size: number) {
    return `top: calc(50% - calc(${size}rem / 2));
        left: calc(50% - calc(${size}rem / 2));
        width: ${size}rem;
        height: ${size}rem;
        font-size: ${size / FONT_FACTOR}rem;
        `;
  }
  return (
    <div
      css={css`
        ${circle}
        ${buildRules(size / SMALL_RESPONSIVE_FACTOR)}

        @media (min-width: 450px) {
          ${buildRules(size / MEDIUM_RESPONSIVE_FACTOR)}
        }
        @media (min-width: 600px) {
          ${buildRules(size)}
        }
      `}
    >
      {children}
    </div>
  );
}

export { FooCircle, BarCircle, FactoryCircle, ShopCircle, MovingCircle };
