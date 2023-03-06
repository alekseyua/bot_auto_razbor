import classNames from 'classnames';
import React from 'react';

import style from './styles/icon.module.scss';

const Icon = ({
    value,
    image,
    width = 20,
    height = 20,
    mr = 0,
    ml = 0,
    mt=0,
    mb=0,
    filter,
    className,
    onClick,
    invert,
    opacity,
    brightness,
}) => {
const styleImage = classNames({
    [style['icon__image']]:true,
    [className]:!!className,
    
})
return(
<React.Fragment>
    <div
        value={value}
        className={styleImage}
        onClick={onClick}
        style={{
            backgroundImage: `url(${image})`,
            width: `${width}px`,
            minWidth: `${width}px`,
            height: `${height}px`,
            marginRight: `${mr}px`,
            marginLeft: `${ml}px`,
            marginTop: `${mt}px`,
            marginBottom: `${mb}px`,
            filter: `${
                invert? 
                    `invert: ${invert}` 
                    : brightness? 
                        brightness
                        : invert && brightness? 
                            `${invert, brightness}`    
                            : 
                            filter}`,
            opacity: `${opacity}`,

        }}
    ></div>
</React.Fragment>
)
}
export default Icon;