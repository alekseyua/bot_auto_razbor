import classNames from "classnames";
import React from "react";

import style from '../styles/listmainbutton.module.scss';

const ItemList = ({
    el,
    children
}) => {
    console.log({el})
    return (
        <li
            className={classNames({
                [style['menu__items-list']]: true,
                [style['menu__items-list--disable']]: !!el && ('permission' in el)? !el?.permission : false,
            })}
        >
            {children}
        </li>
    )
}

export default ItemList;