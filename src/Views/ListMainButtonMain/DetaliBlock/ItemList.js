import classNames from "classnames";
import React from "react";

import style from '../styles/listMainButtonMain.module.scss';

const ItemList = ({
    el,
    children,
    
} ) => {
    return (
        <li
            key={el?.id}
            className={classNames({
                [style['menu__items-list']]: true,
                [style['menu__items-list--disable']]: !el?.can_click?.status && !!!el?.can_click?.redirect_payment 
            })
            } 
        >
            {children}
        </li>
    )
}

export default ItemList;