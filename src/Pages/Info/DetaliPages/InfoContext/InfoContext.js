import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStoreon } from "storeon/react";

import style from './styles/detaliInfo.module.scss'

const InfoContext = () => {
    const { dispatch, tg } = useStoreon('tg');
    const { state } = useLocation();
    const navigate = useNavigate();
    const { context, title } = state;
    const [ newText, setNewText ] = useState('');   

    useEffect(() => {
        tg.BackButton.show() // меняет в хэдере крестик на стрелку
        tg.BackButton.onClick( () => navigate('/button_info', {
            state: {
                name_button: state?.old_name_button ?? ''
            }
        }) ) // метод при нажатии на кнопку действия
        dispatch('setTextHeader', title);        
        dispatch('setActiveHeaderText', true);
    }, [dispatch, tg.BackButton, navigate])
    useEffect(()=>{
        setNewText(context.split(' ').map( (el, i) => el.includes('https://')? `<a href=${el}>${el}</a>` : el).join(' '))

    },[context])
    return(
        <React.Fragment>
            <div
                className={style['detali-info__container']}
                dangerouslySetInnerHTML={{ __html: newText }}>      
            </div>
        </React.Fragment>
    )
}

export default InfoContext;