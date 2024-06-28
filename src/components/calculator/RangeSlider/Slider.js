import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const scaleEnum = (amount) => {

  const scaleMap = new Map([
    [500, 50],
    [1_000, 50],
    [5_000, 100],
    [10_000, 1_000],
    [50_000, 5_000],
    [100_000, 10_000],
    [500_000, 50_000],
    [1_000_000, 100_000],
    [5_000_000, 500_000],
    [10_000_000, 1_000_000],
    [50_000_000, 5_000_000],
    [100_000_000, 10_000_000],
  ]);

  for (const [threshold, value] of scaleMap) {
    if (amount < threshold) {
      return value;
    }
  }
  return 50_000_000;
};

export const sliderCurve = (x, amount) => {
  const scale = scaleEnum(amount);
  const res = Math.ceil(Math.pow(10, x));
  const rounded = Math.trunc(Math.floor(res / scale));

  return Math.ceil(rounded * scale);
};
export const inverseCurve = Math.log10;

const RangeSlider = ({
  min,
  max,
  stepsInRange,
  onChange,
  amount,
  ...restProps
}) => (
  <Slider
    defaultValue={inverseCurve(amount)}
    value={inverseCurve(amount)}
    min={inverseCurve(min)}
    max={inverseCurve(max)}
    step={(inverseCurve(max) - inverseCurve(min)) / stepsInRange}
    onChange={onChange}
    {...restProps}
  />
);

export { RangeSlider };
