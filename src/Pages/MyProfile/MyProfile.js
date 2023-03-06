import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import Icon from '../../Views/Icon/Icon';
import Block from '../../Views/ListMainButton/DetaliBlock';
import Message from '../../Views/Messages/Message/Message';
import Spinner from '../../Views/Spinner';

import style from './styles/myprofile.module.scss';

const MyProfile = (
 
) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [ context, setContext ] = useState({ message : '', buttons : [] })
    const { dispatch, getContext, tg } = useStoreon('getContext', 'tg');

    const { message, buttons } = context;
    const [ messageInForm, setMessageInForm ] = useState({
        textMessage: '',
        colorMessage: ''
    });
    
    useEffect(()=>{
        setContext(c => ({...c, ...getContext.children}))
    }, [getContext?.children])

    useEffect(()=>{
        state?.textMessage?
                setMessageInForm( c => ({
                    ...c,
                    textMessage: state?.textMessage,
                    colorMessage: state?.colorMessage
                }))
                : context.message?
                    setMessageInForm( c => ({
                        ...c,
                        textMessage: context.message,
                    }))
                    : console.log('faick');
    },[context.message, state?.textMessage])

    useEffect(() => {
        dispatch('setTextHeader', state?.name_button);
        dispatch('setActiveHeaderText', true);          
        tg.BackButton.show() // меняет в хэдере крестик на стрелку
        tg.BackButton.onClick(() => navigate ('/')) // метод при нажатии на кнопку действия 
        
        const params = {
            url: '/api_get_context_profile/',
            page_id: state?.action_page_id ?? 31,
            dataRequst: () => { }
        };
        dispatch('setGetContext', params)
    }, [dispatch, tg.BackButton, navigate])

console.log({getContext})

    return (
        <React.Fragment>
            
            {
                buttons.length ?
                    <React.Fragment>

                        <Message
                            message={messageInForm.textMessage}
                            colorMessage={messageInForm.colorMessage}
                        />
                        <Block.BlockContainerList>
                {

                    buttons.map(el => {
                        return (
                            
                            <Block.ItemList
                                key={el.value}
                                {...el}
                            >
                                <Link
                                    to={`/button_my_profile/payment`}
                                    state={{
                                        ...getContext?.children.buttons[0].children                                        
                                    }}
                                    onClick={() => el.slug ? dispatch('setActiveHeaderText', true) : dispatch('setActiveHeaderText', false)}
                                >
                                    <Icon
                                        image={el.image}
                                        width={20}
                                        height={20}
                                        className={style['menu__items-image']}
                                    />
                                    
                                    <Block.ItemName 
                                        name={el.value}
                                    />                                   

                                </Link>
                            </Block.ItemList>
                        )
                    })
                }
            </Block.BlockContainerList>  

                    </React.Fragment>
                    : <Spinner />
            }

        </React.Fragment>
    )
}
export default MyProfile;
