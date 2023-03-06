import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import Offset from '../../../../Views/Offset';
import Spinner from '../../../../Views/Spinner';

import Message from '../../../../Views/Messages/Message/Message';
import CardApplicationAuto from '../../../../Views/CardApplicationAuto/CardApplicationAuto';
import Pagination from '../../../../Views/Pagination/Pagination';

const CreateEditParserList = (

) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { dispatch, getContext, tg } = useStoreon('getContext', 'tg');
    const { message, results } = getContext;
    const [messageInForm, setMessageInForm] = useState({
        textMessage: '',
        colorMessage: ''
    });

    const [listAplication, setListAplication] = useState({
        count: 0,
        results: []
    });

    useEffect(() => {
        dispatch('setTextHeader', state?.name_button ?? 'Каталог разбора');
        dispatch('setActiveHeaderText', true);
        tg.BackButton.show() // меняет в хэдере крестик на стрелку
        tg.BackButton.onClick(() => navigate('/button_parsing', {
            state: {
                name_button: state?.old_name_button ?? ''
            }
        })) // метод при нажатии на кнопку действия

        const paramsList = {
            url: '/api_get_parsings/',
            page: 1,
            page_size: 30,
            dataRequst: res => {
                if (!!res?.error) return setMessageInForm({ textMessage: 'УПС..., возникла не предвиденная ошибка, сообщите о ней Вашему менеджеру' })
                if (res?.result.results.length) {
                    const copyData = res?.result?.results.slice();
                    setListAplication(c => ({
                        ...c, 
                        ...res.result,
                        results: [...copyData]
                    }))
                }
            },
        };
        dispatch('setListApplications', paramsList)
    }, [dispatch, state?.action_page_id, tg.BackButton, navigate])
    const changePaginationPage = data => {
        const { page } = data;
        const paramsList = {
            url: '/api_get_parsings/',
            page: page ?? 1,
            page_size: 30,
            dataRequst: res => {
                if (!!res?.error) return setMessageInForm({ textMessage: 'УПС..., возникла не предвиденная ошибка, сообщите о ней Вашему менеджеру' })
                if (res?.result.results.length) {
                    const copyData = res?.result?.results.slice();
                    setListAplication(c => ({
                        ...c,
                        ...res.result,
                        results: [...copyData]
                    }))
                }
            },
        };
        dispatch('setListApplications', paramsList)
    }

    return (
        <React.Fragment>
            {
                listAplication.results.length ?
                    <React.Fragment>
                        <Message
                            message={messageInForm.textMessage}
                            colorMessage={messageInForm.colorMessage}
                        />

                        <CardApplicationAuto
                            listAplication={listAplication}
                            pathGoTo={`/button_parsing/button_edit_parsing_form`}
                        />

                        {
                            listAplication.count > 30?
                                <Pagination
                                    // data={listAplication.results}
                                    allCount={listAplication.count}
                                    count={30}
                                    handlerChangePaginations={ changePaginationPage }
                                    currentPage={Number(listAplication.current_page)}
                                    location={'center'}
                                />
                                : null
                        }
                        <Offset mb={50} />

                    </React.Fragment>
                    : <Spinner
                        text={'У Вас нет пока заявок'}
                    />
            }

        </React.Fragment>
    )
}
export default CreateEditParserList;