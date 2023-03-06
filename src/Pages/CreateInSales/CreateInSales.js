import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import CardApplication from '../../Views/CardApplication';
import ListMainButton from '../../Views/ListMainButton/ListMainButton';
import Message from '../../Views/Messages/Message/Message';
import Spinner from '../../Views/Spinner';

const CreateInSales = (

) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading ] = useState(false);
    const { dispatch, getContext, tg } = useStoreon('getContext', 'tg');
    const { message, buttons } = getContext;
    const [messageInForm, setMessageInForm] = useState({
        textMessage: '',
        colorMessage: ''
    });

    const [listAplication, setListAplication] = useState({
        count: 0,
        results: []
    });

    useEffect(() => {
        state?.textMessage ?
            setMessageInForm(c => ({
                ...c,
                textMessage: state?.textMessage,
                colorMessage: state?.colorMessage
            }))
            : message?.name ?
                setMessageInForm(c => ({
                    ...c,
                    textMessage: message.name,
                }))
                : console.log('faick');
    }, [message?.name, state?.textMessage])

    useEffect(() => {
        dispatch('setTextHeader', state?.name_button);
        dispatch('setActiveHeaderText', true);
        tg.BackButton.show() // меняет в хэдере крестик на стрелку
        tg.BackButton.onClick(() => navigate('/')) // метод при нажатии на кнопку действия

        const params = {
            url: '/api_get_page/',
            page_id: state?.action_page_id ?? 8 ,
            dataRequst: () => { }
        };
        dispatch('setGetContext', params)

        const paramsList = {
            url: '/api_get_sales/',
            page: 1,
            page_size: 5,
            setIsLoading: setIsLoading,
            dataRequst: res => {
                const copyData = res.result.results.slice();
                return setListAplication(c => ({
                    ...c,
                    ...res.result,
                    results: [...copyData]
                }))
            }
        };
        dispatch('setListApplications', paramsList)

    }, [dispatch, state?.action_page_id, navigate])


    const handlerDeleteApplication = id => {
        const params = {
            url: '/api_delete_sale/',
            parsing_id: id,
            setIsLoading: setIsLoading,
            dataRequst: res => {
                const copyData = res.result.results.slice();
                return setListAplication(c => ({
                    ...c,
                    ...res.result,
                    results: [...copyData]
                }))
            }
        }
        dispatch('deleteApplicationId', params)
    }
    
    const handlerChangeApplication = id => {
        navigate('/button_sales/button_edit_sale_form', {
            state: {
                application: id
            }
        })
    }

    const handlerInCatalogApplication = id => {
        navigate('/button_sales/button_edit_sale', {
            state: {
                application: id
            }
        })
    }

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
                            localPath={'/button_sales/'}
                            dispatch={dispatch}
                            list={buttons}
                        />

                    </React.Fragment>
                    : <Spinner />
            }
            {

                isLoading? 
                <Spinner />
                : !listAplication.count ?
                    <CardApplication
                        listAplication={listAplication}
                        handlerDeleteApplication={handlerDeleteApplication}
                        handlerChangeApplication={handlerChangeApplication}
                        handlerInCatalogApplication={handlerInCatalogApplication}

                    />
                    : null
            }

        </React.Fragment>
    )
}
export default CreateInSales;