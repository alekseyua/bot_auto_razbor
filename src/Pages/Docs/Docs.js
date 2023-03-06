import React, { useEffect, useState } from "react";
import { useStoreon } from "storeon/react";
import Spinner from "../../Views/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import Message from "../../Views/Messages/Message/Message";
import ListMainButton from "../../Views/ListMainButton/ListMainButton";

const Docs = ( 

) => {
    const { dispatch, getContext, tg } = useStoreon('getContext', 'tg');
    const { state } = useLocation();
    const navigate = useNavigate();
    const { message, buttons } = getContext;
    const [ messageInForm, setMessageInForm ] = useState({
        textMessage: '',
        colorMessage: ''
    });

    useEffect(()=>{
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
        tg.BackButton.show() // меняет в хэдере крестик на стрелку
        tg.BackButton.onClick( () => navigate('/') ) // метод при нажатии на кнопку действия

        dispatch('setTextHeader', state?.name_button);        
        dispatch('setActiveHeaderText', true);    
        const params = {
            url: '/api_get_page/',
            page_id: 4,
            dataRequst: () => { }
        };
        dispatch('setGetContext', params)
    }, [dispatch, state?.action_page_id, tg.BackButton,navigate])

    return (
        <React.Fragment>
            {
                ('buttons' in getContext)?
                    <React.Fragment>

                            <Message
                                message={messageInForm.textMessage}
                                colorMessage={messageInForm.colorMessage}
                            />
                            {
                                 buttons.length?    
                                    <ListMainButton
                                        old_name_button ={state?.name_button}
                                        localPath={'/button_docs/'}
                                        dispatch = {dispatch}
                                        list = {buttons}
                                    />   
                                    : null
                            }                   
                    </React.Fragment>
                    : <Spinner />
            }
        </React.Fragment>
    )
}

export default Docs;