import React from "react";

import style from '../styles/message.module.scss';

const MessageContainer = ({
    children
}) => {

    return (
        <div
            className={style['message__description']}
        >
            {children}
        </div>
    )
}

export default MessageContainer;