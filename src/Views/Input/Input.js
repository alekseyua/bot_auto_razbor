import React, { useRef } from 'react';

import classNames from 'classnames';
import style from './styles/input.module.scss';

const Input = ({
  variant, 
  className, 
  value, 
  children, 
  label, 
  autofocus, 
  type = 'text', 
  placeholder, 
  onChange,
  name, 
  autocomplete = 'off',
  helpText,
  addClass,
  ...props
}) => {

  const inputRef = useRef(null);

  return (
    <>
      <label
        className={style['input__label']}
      >{label}</label>
      <div
        className={classNames({
          [style['input__wrapper']]: true,
          [style[className]]: !!className,
          [addClass]: !!addClass
        })}
      >
        <input
          autoComplete={autocomplete}
          type={type}
          autoFocus={autofocus}
          onFocus={ autofocus? e => e.currentTarget.select() : null }
          className={style['input__input']}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          ref={inputRef}
        />
        {children}
        {
          helpText?
            helpText
            : null        
        }
      </div>

    </>
  )
}

export default Input;