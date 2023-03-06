import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';

import ListMainButton from '../../Views/ListMainButton/ListMainButton';
import Message from '../../Views/Messages/Message/Message';
import Spinner from '../../Views/Spinner';

const Filters = (
 
) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { dispatch, tg } = useStoreon('tg');
    const [ message, setMessage ] = useState('');
    const [ buttons, setbuttons ] = useState([]);
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
                : message?
                    setMessageInForm( c => ({
                        ...c,
                        textMessage: message,
                    }))
                    : console.log('faick');
    },[message, state?.textMessage])

    useEffect(() => {
        dispatch('setTextHeader', state?.name_button);
        dispatch('setActiveHeaderText', true);          
        tg.BackButton.show() // меняет в хэдере крестик на стрелку
        tg.BackButton.onClick(() => navigate ('/')) // метод при нажатии на кнопку действия 
        
        const params = {
            url: '/api_get_context/',
            page_id: state?.action_page_id ?? 2,
            dataRequst: res => {
                console.log({res})
                setMessage(res.result.message);
                setbuttons(res.result.buttons);
                return
            }
        };
        dispatch('setGetContextFilters', params)
    }, [dispatch, tg.BackButton, navigate])

    return (
        <React.Fragment>
            {
                buttons.length ?
                    <React.Fragment>

                        <Message
                            message={messageInForm.textMessage}
                            colorMessage={messageInForm.colorMessage}
                        />
                        <ListMainButton
                                old_name_button ={state?.name_button}
                                localPath={'/button_filters/'}
                                dispatch = {dispatch}
                                list = {buttons}
                        />   

                    </React.Fragment>
                    : <Spinner />
            }

        </React.Fragment>
    )
}
export default Filters;
