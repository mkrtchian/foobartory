/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

type CircleProps = {
  size: number;
};

const circle = css`
  position: absolute;
  border-radius: 50%;
  transition: all 0.3s ease;
  transition-property: width, height, top, left, font-size;
  background-color: #333;
  color: #eee;
  display: grid;
  place-content: center;
`;

const FooCircle = styled.div<CircleProps>`
  ${circle}
  top: 0;
  left: 0;
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  font-size: ${({ size }) => size / 1.5}rem;
`;

const BarCircle = styled.div<CircleProps>`
  ${circle}
  top: 0;
  right: 0;
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  font-size: ${({ size }) => size / 1.5}rem;
`;

const FactoryCircle = styled.div<CircleProps>`
  ${circle}
  bottom: 0;
  left: 0;
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  font-size: ${({ size }) => size / 1.5}rem;
`;

const ShopCircle = styled.div<CircleProps>`
  ${circle}
  bottom: 0;
  right: 0;
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  font-size: ${({ size }) => size / 1.5}rem;
`;

const MovingCircle = styled.div<CircleProps>`
  ${circle}
  top: calc(50% - calc(${({ size }) => size}rem / 2));
  left: calc(50% - calc(${({ size }) => size}rem / 2));
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  font-size: ${({ size }) => size / 1.5}rem;
`;

export { FooCircle, BarCircle, FactoryCircle, ShopCircle, MovingCircle };
