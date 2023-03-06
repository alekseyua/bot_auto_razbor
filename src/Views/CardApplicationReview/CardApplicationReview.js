import classNames from "classnames";
import React, { useState } from "react";
import Icon from "../Icon/Icon";
import Pagination from "../Pagination/Pagination";
import RaitingContainer from "../Raiting/RaitingContainer";

import style from './styles/cardApplicationReview.module.scss';

const CardApplicationReview = ({
    listAplication,
    changePaginationPage,
}) => {
    const [ activeStateButton, setActiveStateButton ] = useState(null);


    return(
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
                                                className={style['create-edit-parser-list__menu-items']}
                                            >
                                                    <div
                                                        className={style['create-edit-parser-list__container-application']}
                                                    >
                                                           <div
                                                            className={style['create-edit-parser-list__menu-items-container']}
                                                            style={{
                                                                width: `100%`
                                                            }}
                                                        >
                                                            <div
                                                                className={style['create-edit-parser-list__menu-items-container-name']}
                                                            >
                                                                <div
                                                                    className={style['create-edit-parser-list__menu-items-model']}
                                                                    onClick={()=> window.open(el.author_link)}
                                                                >                                                                    
                                                                    {el.author}
                                                                </div>
                                                                <div
                                                                    className={style['create-edit-parser-list__menu-items-review']}
                                                                >
                                                                       <RaitingContainer
                                                                        max={5}
                                                                        value={el.rating}
                                                                        // ActiveStar={el.rating}

                                                                    />
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={style['create-edit-parser-list__menu-items-text']}
                                                            >
                                                                {el.text}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* author
: 
"Пабло Бамперов Ижевск Бампера в цвет на все АВТО"
author_link: "https://t.me/autoshtab18"
id
: 
2384
rating
: 
5
text
: 
"Самый крутой чел в мире мкоторый придумал самый круто бот в телеге !!\nПропустил бы с ним пару стаканчиков ,С привеликим удовольствием !!!!!\nРеспект и уважуха"
user
: 
"Илья" */}
                                                {/* </Link> */}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
        </React.Fragment>
    )
}

export default CardApplicationReview;