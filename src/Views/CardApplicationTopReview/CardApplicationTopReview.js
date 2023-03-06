import React from "react";
import style from './styles/cardApplicationTopReview.module.scss';

const CardApplicationTopReview = ({
    listAplication,
}) => {
    return(
        <React.Fragment>
                      <div
                            className={style['top-review__main-container-list']}
                        >
                            <ul
                                className={style['top-review__container-list']}
                            >
                                {

                                    listAplication.results.map((el, i) => {
                                        return (
                                            <li
                                                key={el.id}
                                                className={style['top-review__items']}
                                            >
                                                <div
                                                    className={style['top-review__container-review']}
                                                >
                                                    <div
                                                        className={style['top-review__count']}
                                                    >
                                                        {
                                                            
                                                            i + ((Number(listAplication.current_page) * 30) - 30 + 1)
                                                        }
                                                    </div>
                                                    
                                                    <div
                                                        className={style['top-review__items-container']}
                                                        style={{
                                                            width: `100%`
                                                        }}
                                                        onClick={() => window.open(el.user_link)}
                                                    >
                                                        <div
                                                            className={style['top-review__items-container-username']}
                                                        >
                                                                {el.telegram_username}
                                                          
                                                        </div>
                                                        <div
                                                            className={style['top-review__items-user']}
                                                        >
                                                            {el.user}
                                                        </div>
                                                    </div>
                                                        <div
                                                            className={style['top-review__items-comments']}
                                                        >
                                                            {el.comments}
                                                        </div>

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

export default CardApplicationTopReview;