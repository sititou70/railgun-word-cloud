import React, { FC, useMemo } from "react";
import { throttle } from "throttle-debounce";
import styled from "@emotion/styled";
import { EpisodeRange } from "../types";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";

import { getEpisodeString } from "./utils";

const SliderLabel: FC<{
  value: number;
  open: boolean;
  children: JSX.Element;
}> = ({ value, open, children }) => {
  const content = useMemo(() => getEpisodeString(value), [value]);

  return (
    <Tooltip open={open} placement="top" title={content}>
      {children}
    </Tooltip>
  );
};

const EpisodeSlider: FC<{
  range: EpisodeRange;
  max_ep: number;
  setEpisodeRange: (range: EpisodeRange) => void;
}> = ({ range, max_ep, setEpisodeRange }) => {
  const value = useMemo(() => [range.from, range.to], [range.from, range.to]);
  const onChange = useMemo(
    () =>
      throttle<(_: any, v: number | number[]) => void>(100, (_, v) => {
        v instanceof Array &&
          setEpisodeRange({
            from: v[0],
            to: v[1],
          });
      }),
    [setEpisodeRange]
  );

  return (
    <EpisodeSliderRoot>
      <Slider
        value={value}
        onChange={onChange}
        max={max_ep}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        ValueLabelComponent={SliderLabel}
      />
    </EpisodeSliderRoot>
  );
};
const EpisodeSliderRoot = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  width: 90%;
  max-width: 700px;
  transform: translateX(-50%);
`;

export default EpisodeSlider;
