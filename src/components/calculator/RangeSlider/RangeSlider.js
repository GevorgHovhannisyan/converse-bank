import { useRef } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import './style.css'

export default function Range({value, ...restProps}) {
  const valueRef = useRef(value)
  const end = value[1];
  const { onEnd, onInput } = restProps;
  return (
    <div>
      <RangeSlider
        value={value}
        onThumbDragEnd={() => {
          onEnd(end);
        }}
        onInput={([start, end]) => {
          valueRef.current = end;
          typeof onInput === 'function' && onInput([start, end]);
        }}
        {...restProps}
      />
    </div>
  );
}
