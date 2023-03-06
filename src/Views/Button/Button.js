import React from 'react';
import classNames from 'classnames';

import example from './styles/example.module.scss';
import Disabled from './styles/disabled.module.scss';
import activeStyle from './styles/active.module.scss';
import style from './styles/icons.module.scss';
import styleAddClass from './styles/addClass.module.scss';

import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';


/**
 * 
 * @param {
 * size - стилизируем размер кнопки
 * disabled - делаем активную и не активную кнопку
 * hasFocus - 
 * full - закрашеная или пустая
 * circle - 
 * pill - 
 * outline - 
 * variant - передаём вариант стиля кнопки
 * className - задаваемый стиль кнопке из вне
 * addClass - добавляем названия класса 
 * href - используем Link для навигации
 * target - в связке вместе с href для открытия на новой странице
 * onClickIcon - навешиваем событие на иконку
 * classNameIcon - стилизауи
 * } 
 * @returns 
 */
const Button = ({
  active,
  size,
  type,
  id,
  disabled = false,
  hasFocus,
  full,
  circle,
  pill,
  outline,
  variant,
  className,
  onClick,
  iconLeft,
  iconRight,
  children,
  href,
  target,
  onClickIcon,
  classNameIcon,
  datanoClick,
  value,
  addClass,
  dataintro,
  ...props
}) => {

  const getVariantStyleBtn = (variant) => {
    switch (variant) {
      case 'example':
        return example['example'];
      default: 
        return example['examp']
    }
  }

  const classes = {
    [`button`]: true,
    [`button--${size}`]: !!size,
    [Disabled[`button--disabled`]]: disabled,
    [`button--focused`]: hasFocus,
    [`button--full`]: full,
    [`button--circle`]: circle,
    [`button--pill`]: pill,
    [`button--outline`]: outline,
    [activeStyle['button-blue__container']]: true,
    [activeStyle['active']]: active,

  };

  const customClassName = classNames({
    [getVariantStyleBtn(variant)]: variant !== 'none',
    [className]: !!className,
    [styleAddClass[addClass]]: !!addClass,
    ...classes
  });

  return (
    <>
      {disabled ?
        (
          !href ?
            <button
              type={type}
              id = { id }
              value = { value }
              className={customClassName}
              datanoclick={datanoClick}
              disabled={disabled}
            >
               {iconLeft ? <Icon slot="icon-right" className={style[classNameIcon]} style={{marginRight: `10px`}} onClick={onClickIcon} src={iconLeft} width={25} height={25} /> : null}
              {children}
              {iconRight ? <Icon slot="icon-left" className={style[classNameIcon]} style={{marginLeftt: `10px`}} onClick={onClickIcon} src={iconRight} width={25} height={25} /> : null}
            </button>
            : <Link
              id = { id }
              value = { value }
              to='#'
              className={customClassName}
              disabled={disabled}
              datanoclick={datanoClick}
            >
              {children}
            </Link>
        ) : (
          !href ?
            <button
              type={type}
              id = { id }
              value = { value }
              onClick={onClick}
              className={customClassName}
              datanoclick={datanoClick}
            >
              {iconLeft ? <Icon slot="icon-right" className={style[classNameIcon]}  onClick={onClickIcon} src={iconLeft} width={25} height={25} /> : null}
              {children}
              {iconRight ? <Icon slot="icon-left" className={style[classNameIcon]} onClick={onClickIcon} src={iconRight} width={25} height={25} /> : null}
            </button>
            : <Link
              id = { id }
              value = { value }
              to={`${href}`}
              target={target}
              datanoclick = { datanoClick }
              onClick = { onClick }
              className = { customClassName }
              rel="noopener noreferrer"
            >
              {iconLeft ? <Icon slot="icon-right" className={style[classNameIcon]}  onClick={onClickIcon} src={iconLeft} width={25} height={25}  /> : null}
              {children}
              {iconRight ? <Icon slot="icon-left" className={style[classNameIcon]} onClick={onClickIcon} src={iconRight} width={25} height={25} /> : null}
            </Link>
        )}
    </>
  );
};

export default Button;
