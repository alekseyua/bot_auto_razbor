import classNames from "classnames";
import React, { useState } from "react";
import Icon from "../Icon/Icon";

import style from './styles/cardApplication.module.scss';

const CardApplication = ({
    listAplication,
    noAction,
    handlerInCatalogApplication = () => { },
    handlerChangeApplication = () => { },
    handlerDeleteApplication = () => { },


}) => {
    const [activeStateButton, setActiveStateButton] = useState(null);

    const handlerChangeState = (id) => {
        setActiveStateButton(id)
    }


    return (
        <React.Fragment>
            <div
                className={style['create-in-parsing__menu-main-container-list']}
            >

                <ul
                    className={style['create-in-parsing__application-container-list']}
                >
                    {
                        listAplication.results.map(el => {
                            return (
                                <li
                                    className={style['create-in-parsing__application-items']}
                                    key={`list-app-${el.id}`}
                                >
                                    {
                                        !noAction ?
                                            <div
                                                className={classNames({
                                                    [style['create-in-parsing__menu-edit']]: true,
                                                    [style['active']]: el.id === activeStateButton
                                                })
                                                }
                                            >
                                                <span
                                                    className={style['create-in-parsing__menu-edit-close']}
                                                    onClick={() => setActiveStateButton(null)}
                                                >x</span>
                                                <ul
                                                    className={style['create-in-parsing__menu-edit-list']}
                                                >
                                                    <li
                                                        className={style['create-in-parsing__menu-edit-list-item']}
                                                        onClick={() => handlerInCatalogApplication(el.id)}
                                                    >
                                                        в каталог
                                                    </li>
                                                    <li
                                                        className={style['create-in-parsing__menu-edit-list-item']}
                                                        onClick={() => handlerChangeApplication(el.id)}
                                                    >
                                                        редактировать
                                                    </li>
                                                    <li
                                                        className={style['create-in-parsing__menu-edit-list-item']}
                                                        onClick={() => handlerDeleteApplication(el.id)}
                                                    >
                                                        удалить
                                                    </li>
                                                </ul>
                                            </div>
                                            : null
                                    }
                                    <div
                                        className={classNames({
                                            [style['create-in-parsing__application-wrap']]: true,
                                            [style['active']]: el.id === activeStateButton && !noAction
                                        })}
                                        onClick={() => !noAction? handlerChangeState(el.id) : null}
                                    >
                                        <div
                                            className={style['create-in-parsing__application-list-container']}
                                        >
                                            <p>{el.model} * {el.generation}</p>
                                            <p>{el.text}</p>
                                        </div>
                                        <Icon
                                            image={el?.images[0]?.url ? el.images[0].url : '#'}
                                            width={60}
                                            height={60}
                                        />
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </React.Fragment>
    )
}

export default CardApplication;