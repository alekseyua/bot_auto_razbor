import React, { useEffect, useState } from "react";
import { useStoreon } from "storeon/react";
import Spinner from "../../Views/Spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";

import style from './styles/info.module.scss';

const Info = (

) => {
    const { dispatch, getContext, tg } = useStoreon('getContext', 'tg');
    const { state } = useLocation();
    const navigate = useNavigate();
    const { buttons } = getContext;
    const [ buttonsInfo, setButtonsInfo ] = useState([]);

    useEffect(() => {
        tg.BackButton.show() // меняет в хэдере крестик на стрелку
        tg.BackButton.onClick( () => navigate('/') ) // метод при нажатии на кнопку действия

        dispatch('setTextHeader', 'Информация');        
        dispatch('setActiveHeaderText', true);    
        const params = {
            url: '/api_get_info/',
            page_id: state?.action_page_id ?? 7,
            dataRequst: (info) => { 
                setButtonsInfo(info.result.buttons.map( ( el, i ) => {
                    return ({
                        text: el.name,
                        slug: i + 1,
                        context: el.text
                    })
                }))
            }
        };
        dispatch('setGetContext', params)
    }, [dispatch, state?.action_page_id, tg.BackButton]);
    
    return (
        <React.Fragment>
            {
                buttonsInfo.length?
                    <React.Fragment>

                        <div
                            className={style['info__info-container-list']}
                        >
                            {
                                 buttons.length?        
                                    <ul
                                        className={style['info__container-list']}
                                    >
                                        {

                                            buttonsInfo.map(el => {
                                                return (
                                                    <li
                                                        key={el.id}
                                                        className={style['info__items']}
                                                    >
                                                        <Link
                                                            to={`/button_info/${el.slug}`}
                                                            state={{ 
                                                                context : el.context,
                                                                title: el.text
                                                            }}
                                                            onClick={() => el.slug? dispatch('setActiveHeaderText', true) : dispatch('setActiveHeaderText', false)}                                                    
                                                        >                                                               
                                                            <div
                                                                className={style['info__items-text']}
                                                            >{el.text}</div>
                                                        </Link>
                                                    </li>
                                                )
                                            })

                                        }
                                    </ul>
                                    : null
                            }   
                        </div>

                 
                    </React.Fragment>
                    : <Spinner />
            }
        </React.Fragment>
    )
}

export default Info;