import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';

import ListMainButton from '../../Views/ListMainButton/ListMainButton';
import Message from '../../Views/Messages/Message/Message';
import Spinner from '../../Views/Spinner';

const CreateRequest = (
 
) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { dispatch, getContext, tg } = useStoreon('getContext', 'tg');
    const { message, buttons } = getContext;
    const [ messageInForm, setMessageInForm ] = useState({
        textMessage: '',
        colorMessage: ''
    });
    
    useEffect(()=>{
        console.log({state})
        state?.textMessage?
                setMessageInForm( c => ({
                    ...c,
                    textMessage: state?.textMessage,
                    colorMessage: state?.colorMessage
                }))
                : message?.name?
                    setMessageInForm( c => ({
                        ...c,
                        textMessage: message.name,
                    }))
                    : console.log('faick');
    },[message?.name, state?.textMessage])

    useEffect(() => {
        dispatch('setTextHeader', state?.name_button);
        dispatch('setActiveHeaderText', true);          
        tg.BackButton.show() // меняет в хэдере крестик на стрелку
        tg.BackButton.onClick(() => navigate ('/')) // метод при нажатии на кнопку действия 
        
        const params = {
            url: '/api_get_page/',
            page_id: state?.action_page_id ?? 2,
            dataRequst: () => { }
        };
        dispatch('setGetContext', params)
    }, [dispatch, tg.BackButton, navigate])

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
                                old_name_button ={state?.name_button}
                                localPath={'/button_make_request/'}
                                dispatch = {dispatch}
                                list = {buttons}
                        />   

                    </React.Fragment>
                    : <Spinner />
            }

        </React.Fragment>
    )
}
export default CreateRequest;
