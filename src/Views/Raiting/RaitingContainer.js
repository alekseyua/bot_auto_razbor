import React from 'react';
import Raiting from './RaitingView';

/**
 * 
  disabled,
  onChange = () => {},
  getSymbol,
  max,
  precision,
  readonly,
  value,
  label,
  countRaiting,
 * @param {*} param0 
 * @returns 
 */
const RaitingContainer = ({
  disabled,
  onChange = () => {},
  getSymbol,
  max,
  precision,
  readonly,
  value,
  label,
  countRaiting,
  sizeStarWidth,
  sizeStarHeight,
}) => {

  
  return (
    <Raiting
      disabled={disabled}
      onChange={onChange}
      max={max}
      precision={precision}
      readonly={readonly}
      ActiveStar={value}
      label={label}
      countRaiting={countRaiting}
      sizeStarWidth = {sizeStarWidth}
      sizeStarHeight={sizeStarHeight}
    />
  );
};

export default React.memo(RaitingContainer);
