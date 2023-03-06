import React from "react";

import style from '../styles/listMainButtonMain.module.scss';

const BlockContainerList = ({
    children
}) => {

    return(
        <ul
                className={style['menu__container-list']}
            >
                {children}
        </ul>
    )
}

export default BlockContainerList;