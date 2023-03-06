import React from "react";

import style from '../styles/listMainButtonMain.module.scss';

const ItemName = ({
    name
}) => {

    return (
        <div
            className={style['menu__items-text']}
        >{ name }</div>
    )
}

export default ItemName;