/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/styles";

const liStyle = css`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
`;

type LiProps = {
  first?: boolean;
};

const Li = styled.li<LiProps>`
  ${liStyle}
  ${({ first }) =>
    first
      ? `margin-bottom: 2rem;
        @media (min-width: 950px) {
          margin-bottom: 0;
          grid-column: span 2;
          width: 60%;
          justify-self: center;
        }`
      : ""}
`;

const useStyles = makeStyles({
  root: {
    '& .MuiSlider-markLabel[data-index="0"]': {
      transform: "translateX(0%)",
    },
    '& .MuiSlider-markLabel[data-index="1"]': {
      transform: "translateX(-100%)",
    },
  },
});

const percentageMarks = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 100,
    label: "100%",
  },
];

type SliderCommandProps = {
  id: string;
  text: string;
  defaultValue: number | undefined;
  onChange: (event: object, value: number | number[]) => void;
  first?: boolean;
};

function SliderCommand({
  id,
  text,
  defaultValue,
  onChange,
  first,
}: SliderCommandProps) {
  const classes = useStyles();
  return (
    <Li first={first}>
      <label id={id}>{text}</label>
      <Slider
        defaultValue={defaultValue}
        valueLabelDisplay="auto"
        onChangeCommitted={onChange}
        aria-labelledby={id}
        marks={first && percentageMarks}
        className={classes.root}
      />
    </Li>
  );
}

export default SliderCommand;
