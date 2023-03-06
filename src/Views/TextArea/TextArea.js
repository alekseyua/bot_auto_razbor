import classNames from 'classnames';
import React from 'react';

import style from './style/textarea.module.scss';

/**
* @param {placeholder,
    *      className 
    *      helpText 
    *      label
    *      value
    *      name
    *      onChange
    *      onBlur
    * } param0 
    * @returns 
    * 
    */

const TextArea = ({
    placeholder,
    addClass,
    className,
    helpText,
    height,
    label,
    value,
    name,
    onChange = ()=>{},
    onBlur,
}) => {

    const styleTextarea = classNames({
        [addClass]: !!addClass,
        [style['textarea__container']]: true,
        [style[className]]: !!className,
    })

    return (
        <div
            className = {  styleTextarea }
        >   
            { 
                label? 
                    <span
                        className = { style['textarea__label']}
                    >{label}</span>
                    : null
            }
            <textarea
                className = { style['textarea__textarea'] }
                placeholder = { placeholder }
                onBlur = { onBlur }
                value = { value }
                name = { name }
                onChange = { onChange }
                style={{
                    height: height? `${height}px`: 'none',

                }}
            />
                {
                    helpText?
                        <span
                            className = { style['textarea__help-text']}
                        >{helpText}</span>
                        : null
                }
        </div>
    )
}

export default  TextArea;