import React from 'react'
import { SketchPicker } from 'react-color';

const ColorPicker = ({ setColor, color }) => {
  return (
    <SketchPicker
      color={color}
      onChangeComplete={(color) => setColor(color?.hex)}
    />
  )
}

export default ColorPicker;
