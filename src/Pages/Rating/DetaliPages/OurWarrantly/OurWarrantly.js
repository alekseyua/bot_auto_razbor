import React, { useEffect, useState } from "react";
import { useStoreon } from "storeon/react";
import Icon from "../../../../Views/Icon/Icon";
import Spinner from "../../../../Views/Spinner";
import { info } from "../../../../images";
import { Link, useLocation, useNavigate } from "react-router-dom";

import style from './styles/ourWarrantly.module.scss';
import Message from "../../../../Views/Messages/Message/Message";
import ListMainButton from "../../../../Views/ListMainButton/ListMainButton";

const OurWarrantly = (

) => {
    const { dispatch, getContext, tg } = useStoreon('getContext', 'tg');
    const { state } = useLocation();
    const navigate = useNavigate();
    const { message, buttons } = getContext;

    const [messageInForm, setMessageInForm] = useState({
        textMessage: '',
        colorMessage: ''
    });

    useEffect(() => {
        state?.textMessage ?
            setMessageInForm(c => ({
                ...c,
                textMessage: state?.textMessage,
                colorMessage: state?.colorMessage
            }))
            : message?.text ?
                setMessageInForm(c => ({
                    ...c,
                    textMessage: message.text,
                    colorMessage: '#000'
                }))
                : console.log('faick');

    }, [state?.textMessage, message?.text])

    useEffect(() => {
        tg.BackButton.show() // меняет в хэдере крестик на стрелку
        tg.BackButton.onClick(() => navigate('/button_rating', {
            state: {
                name_button: state?.old_name_button ?? ''
            }
        })) // метод при нажатии на кнопку действия

        dispatch('setTextHeader', state?.name_button);
        dispatch('setActiveHeaderText', true);
        const params = {
            url: '/api_get_page/',
            page_id: 6,
            dataRequst: (res) => { console.log({ res }) }
        };
        dispatch('setGetContext', params)
    }, [dispatch, state?.action_page_id, tg.BackButton])

    return (
        <React.Fragment>
            {
                ('buttons' in getContext) ?
                    <React.Fragment>
                        <Message
                            message={messageInForm.textMessage}
                            colorMessage={messageInForm.colorMessage}
                        />

                        <ListMainButton
                            old_name_button={state?.name_button}
                            localPath={'/button_rating/'}
                            dispatch={dispatch}
                            list={buttons}
                        />

                    </React.Fragment>
                    : <Spinner />
            }
        </React.Fragment>
    )
}

export default OurWarrantly;