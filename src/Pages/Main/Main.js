import React, { useEffect, useState } from "react";
import { useStoreon } from "storeon/react";
import Spinner from "../../Views/Spinner";
import { useLocation, useNavigate } from "react-router-dom";

import Message from "../../Views/Messages/Message/Message";
import ListMainButtonMain from "../../Views/ListMainButtonMain/ListMainButtonMain";

const Main = (

) => {
    const { dispatch, getContext, tg } = useStoreon('getContext', 'tg');
    const navigate = useNavigate();
    const { state } = useLocation();
    const { message, buttons } = getContext;
    const [ newButtons, setNewButtons ] = useState([])
    
    const [ messageInForm, setMessageInForm ] = useState({
        textMessage: '',
        colorMessage: ''
      });

    useEffect(()=>{ 
        message?.name?
            setMessageInForm( c => ({
                ...c,
                textMessage: message.name,
            }))
            : console.log('faick');
    },[message?.name])


    useEffect(() => {
 
        tg.BackButton.hide();
        dispatch('setTextHeader', '');        
        dispatch('setActiveHeaderText', false);    

        const params = {
            url: '/api_get_page/',
            page_id: state?.action_page_id || 1,
            dataRequst: () => { }
        };
        
        dispatch('setGetContext', params);

    }, [dispatch, state?.action_page_id])


    useEffect(()=>{
        console.log({buttons})
        if( !buttons?.length ) return;
        // setNewButtons(buttons)
        setNewButtons([
            ...buttons,
            // {
            //     action_page_id: null,
            //     additional_info: "",
            //     id: 32,
            //     image: `#`,
            //     name: "",
            //     parent_page_id: 32,
            //     slug: 'button_filters',
            //     text: "Фильтра",
            //     class: '',
            //     can_click: {
            //         message: "test",
            //         redirect_payment: false,
            //         status: true,
            //     },
            // },
            // {
            //     action_page_id: null,
            //     additional_info: "",
            //     id: 32,
            //     image: '',
            //     name: "Фильтра",
            //     parent_page_id: 32,
            //     slug: 'button_filters',
            //     text: "Фильтра",
            //     class: '',
            //     can_click: {
            //         message: "test",
            //         redirect_payment: true,
            //         status: true,
            //     },
            // },
        ])
    },[buttons])
    

    return (
        <React.Fragment>
            {
                ('buttons' in getContext) ?
                    <React.Fragment>

                        <Message
                            message={messageInForm.textMessage}
                            colorMessage={messageInForm.colorMessage}
                        />
                            <ListMainButtonMain
                                navigate = {navigate}
                                localPath={'/'}
                                dispatch = {dispatch}
                                list = {newButtons}
                            />                            
                    </React.Fragment>
                    : <Spinner />
            }
        </React.Fragment>
    )
}

export default Main;