import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import Spinner from '../../../../../Views/Spinner';

import style from './styles/ourWarrantlyAdmin.module.scss';

const OurWarrantlyAdmin = (

) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { dispatch, getContext, tg } = useStoreon('getContext', 'tg');
    const { message, results } = getContext;
    const [ newText, setNewText ] = useState('');

    useEffect(() => {
        dispatch('setTextHeader', state?.name_button);
        dispatch('setActiveHeaderText', true);
        tg.BackButton.show() // меняет в хэдере крестик на стрелку
        tg.BackButton.onClick(() => navigate('/button_rating/button_garant_rating', {
            state: {
                name_button: state?.old_name_button ?? ''
            }
        })) // метод при нажатии на кнопку действия

        const paramsList = {
            url: '/api_get_page/',
            page_id: 7,
            dataRequst: (resAdmin) => { console.log({resAdmin})},
        };

        dispatch('setGetContext', paramsList)
   
    }, [dispatch, state?.action_page_id, tg.BackButton, navigate]);

    useEffect(()=>{
        setNewText(message?.text.split(' ').map( (el, i) => el.includes('https://')? `<a href=${el}>${el}</a>` : el).join(' '))

    },[message?.text])

    return (

        <React.Fragment>
            {
                !!Object.keys(getContext).length?
                    <React.Fragment>
                        {/* <pre
                            className={style['detali-info__container']}
                        >                         
                           {message?.text}                           
                        </pre>     */}
                        <div
                            className={style['detali-info__container']}
                        dangerouslySetInnerHTML={{ __html: newText }}>

                        </div>    

                    </React.Fragment>
                    : <Spinner />
            }


        </React.Fragment>
    )
}
export default OurWarrantlyAdmin;