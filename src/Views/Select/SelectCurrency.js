import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import { infoWhite, arrowDown } from '../../images';

import style from './styles/select.module.scss';
import BlackStyle from './styles/blackStyle.module.scss';

const SelectCurrency = ({
  className,
  label = "",
  placeholder,
  options = [],
  selectSettings,
  variant,
  children,
  helpText = null,
  onClick,
  value,
  ...props
}) => {
  /**
   * @param {
   *  onClick - возращает значение по элементу option
   *  option - [
   *  {
   *    title: 'title',
   *    value: 'value'
   *  }
   * ]
   *  placeholder - текст в initial титуле
   *  
   * } @values
   * @return 
   */



  const [active, setActive] = useState(false)
  const [textPlaceholder, setTextPlaceholder] = useState(placeholder);

  const hendlerClick = (e) => {
    const textItem = e.target.getAttribute('name');
    setTextPlaceholder(textItem.toLocaleUpperCase())
    onClick(e)
  }

  const variantEnum = {
    default: 'default',
    black: 'black',
  };

  const getVariantStyleSelect = (variant = variantEnum.default) => {
    switch (variant) {
      case 'select-currency-theme__black-full':
        return BlackStyle['select__btn'];
      case 'select-currency-feedback':
        return style['select-currency-feedback']
      default:
        return style['select-currency'];
    }
  };

  const customClassName = classNames({
    [style['select-currency__body']]: true,
    [style['select-currency__body--active']]: active,
    [style[getVariantStyleSelect(variant)]]: !!variant,
    [style[className]]: !!className,
  });

  const handlerChangeList = () => {
    setActive(c => !c)
  }

  useEffect(()=>{
    if(!!!value) setTextPlaceholder(placeholder)
  },[value])

  useEffect(()=>{
    const handleClickLayout = (e) => {
      const element = e.target;
      element.getAttribute('name') ==='select-currency' && !active ? setActive(true) : setActive(false)
    }
    document.addEventListener('click',handleClickLayout)
    return ()=> document.removeEventListener('click',handleClickLayout)
  },[])

  return (
    <div
      className={style['select-currency__container']}
      >
        <label
          className={style['select-currency__label']}
        >{label}</label>
      <div
        name={'select-currency'}
        className={customClassName}
        onClick={handlerChangeList}
      >
        <span>
          {textPlaceholder.toLocaleUpperCase()}
        </span>
        <div
          className={classNames({
            [style['select-currency__option-container']]: true,
            [style['select-currency__option-container--active']]: active
          })
          }
        >

          {
          
          options.map((el, i) => {
            const { name, value, className, ...elData } = el;
            return (
              <span
                key={i}
                value={value}
                name={name}
                onClick={hendlerClick}
                className={style['select-currency__option-item']}
                {...elData}
              >
                { name?.toLocaleUpperCase() }
              </span>
            );
          })
          
          }
        </div >
      </div>

      {/* <Icon
        className={classNames({
          [style['select-currency__icon']]:true,
          [style['select-currency__icon--active']]: active
        })
        }
        slot="suffix"
        id = { 'droppown-select-currency' }
        src={arrowDown}
        width={20}
        height={20}
        filter={'invert(50%)'}

      /> */}
      {
        helpText ?
          helpText
          : null
      }
    </div>
  );
};

export default React.memo(SelectCurrency);
