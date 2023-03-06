import classNames from "classnames";
import React from "react";


import style from './styles/cardApplicationReviewMembers.module.scss';

const CardApplicationReviewMembers = ({
    listAplication,
    changePaginationPage,
}) => {

    const handlerGoTo = path => window.open(path);
    return (
        <React.Fragment>
            <div
                className={style['create-edit-parser-list__menu-main-container-list']}
            >
                <ul
                    className={style['create-edit-parser-list__menu-container-list']}
                >
                    {

                        listAplication.results.map(el => {
                            return (
                                <li
                                    key={el.id}
                                    className={style['create-edit-parser-list__items']}
                                    onClick={() => handlerGoTo(el.username)}
                                >
                                    <div
                                        className={style['create-edit-parser-list__container-application']}
                                    >

{
                                            el.username ?
                                                <div
                                                    className={style['create-edit-parser-list__wrap']}
                                                >
                                                    <div
                                                        className={style['create-edit-parser-list__item']}
                                                    >
                                                        <span>
                                                            Пользователь: 
                                                        </span>
                                                        <span>
                                                            {el.username}
                                                        </span>
                                                    </div>
                                                </div>

                                                : null
                                        }
                                         {
                                            el.seller_organization ?
                                                <div
                                                    className={style['create-edit-parser-list__wrap']}
                                                >
                                                    <div
                                                        className={style['create-edit-parser-list__item']}
                                                    >
                                                         <span>
                                                            Компания: 
                                                         </span>
                                                         <span>
                                                            {el.seller_organization}
                                                         </span>
                                                    </div>
                                                </div>

                                                : null
                                        }
                                        <div
                                            className={classNames({ 
                                                [style['create-edit-parser-list__wrap']]: true,
                                                [style['create-edit-parser-list__wrap--line']]: true
                                            
                                            })}
                                        >
                                            <div
                                                className={style['create-edit-parser-list__item']}
                                            >
                                                {el.date_joined}
                                            </div>

                                            <div
                                                className={style['create-edit-parser-list__item']}
                                            >
                                                {el.rating}
                                            </div>
                                        </div>

                                       
                                        

                                        {
                                            el.seller_address ?
                                                <div
                                                    className={style['create-edit-parser-list__wrap']}
                                                >
                                                    <div
                                                        className={style['create-edit-parser-list__item']}
                                                    >
                                                        {el.seller_address}
                                                    </div>
                                                </div>
                                                : null
                                        }

                                        {
                                            el.seller_worked ?
                                                <div
                                                    className={style['create-edit-parser-list__item']}
                                                >
                                                    {el.seller_worked}
                                                </div>

                                                : null
                                        }

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

export default CardApplicationReviewMembers;