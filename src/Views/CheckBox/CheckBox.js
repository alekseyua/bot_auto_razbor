import React, { useRef } from 'react';
import style from './Default.module.scss';
import classNames from 'classnames';

const variantEnum = {
  default: 'default',
  large: 'large',
  light: 'light',
  switch: 'switch',
};

const getVariantStyleCheckbox = (variant = variantEnum.default) => {
  switch (variant) {
    case variantEnum.large:
      return style['checkbox__large'];
    case variantEnum.switch:
      return style['checkbox__switch'];
    case variantEnum.light:
      return style['checkbox__light'];
    default:
      return style['checkbox__input'];
  }
};

/**
 * 
 * @param {
 *  @!!!!   работает только на -----onChange----- !!!!!!!!
 * classNameLabel - класс для label
 * className - класс для CheckBox
 * 
 * } param0 
 * @returns checked 
 */


const CheckBox = ({
  classNameLabel,
  colorField = false,
  className,
  onChange,
  disabled,
  children,
  helpText,
  variant,
  checked,
  value,
  label,
  name,
  id,
  ...props
}) => {
  //todo: чтоб не светился ошибками сделаю мега костыль не бейте пж
  const refCheck = useRef(null);

  const handlerOnChange = (e) =>{
    onChange(refCheck.current)
  }

  if (!checked) {
    checked = false
  }else{
    checked = true
  }

  const classNameCustom = classNames({
    [style['type-checkbox']]: true,
    [getVariantStyleCheckbox(variant)]: true,
    // [className]: !!className,
  });

  const classNameLabelCheckBox = classNames({
    [style['checkbox__label']]: true,
    [classNameLabel]: !!classNameLabel
  })

  return (
    <div 
      className={classNames({
          [style['checkbox__container']]: true,
          [className]: !!className
        })
      }
      onClick={handlerOnChange} 
    >
        {
          colorField ? (
            <span style={{ backgroundColor: colorField }} className={style['color-field__icon']}></span>
          ) : null
        }
      <input
        key={name}
        onChange={()=>{}} //чтобы не ругался реакт
        ref={refCheck}  
        type={ 'checkbox' }
        className={classNameCustom}
        disabled={disabled}
        checked={checked}
        label={label}
        name = { name }//iAgreeDataProcessing   ----- name="check" 
        id={id}
        value = { value } 
        {...props}
      />
        <label 
          htmlFor="check" 
          className={classNameLabelCheckBox}
        >
          <span></span>
          <span>
            {label}
          </span>
        </label>

      {
        helpText?
          helpText
          : null        
      }
      {children}

    </div>
  );
};

export default React.memo(CheckBox);
