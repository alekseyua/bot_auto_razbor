import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import Offset from '../../../../Views/Offset';
import Spinner from '../../../../Views/Spinner';
import CardApplicationTopReview from '../../../../Views/CardApplicationTopReview/CardApplicationTopReview';
import Message from '../../../../Views/Messages/Message/Message';
import Pagination from '../../../../Views/Pagination/Pagination';

const TopReview = (

) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { dispatch, tg } = useStoreon('tg');
    const [messageInForm, setMessageInForm] = useState({
        textMessage: '',
        colorMessage: ''
    });
    const [listAplication, setListAplication] = useState({
        count: 0,
        results: []
    });

    useEffect(() => {
        dispatch('setTextHeader', state?.name_button);
        dispatch('setActiveHeaderText', true);
        tg.BackButton.show() // меняет в хэдере крестик на стрелку
        tg.BackButton.onClick(() => navigate('/button_rating', {
            state: {
                name_button: state?.old_name_button ?? ''
            }
        })) // метод при нажатии на кнопку действия

        const paramsList = {
            url: '/api_top_rating/',
            page: 1,
            page_size: 30,
            dataRequst: (res) => { setListAplication(c => ({ ...c, ...res.result })); },
        };
        setTimeout(() => {
            dispatch('setListApplications', paramsList)
        }, 100);

    }, [dispatch, state?.action_page_id, tg.BackButton, navigate]);

    const changePaginationPage = data => {
        const { page } = data;
        const paramsList = {
            url: '/api_top_rating/',
            page: page ?? 1,
            page_size: 30,
            setFieldValue: () => { },
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
            redirectTo: (res) => { }
        };
        dispatch('setListApplications', paramsList)
    }
    return (
        <React.Fragment>
            <Message
                message={messageInForm.textMessage}
                colorMessage={messageInForm.colorMessage}
            />
            {
                listAplication.results.length ?
                    <React.Fragment>
                        <CardApplicationTopReview
                            listAplication={listAplication}
                            changePaginationPage={changePaginationPage}
                        />
                        {
                                         listAplication.count > 30?
                                            <Pagination
                                                data={listAplication.results}
                                                allCount={listAplication.count}
                                                count={30}
                                                handlerChangePaginations={changePaginationPage}
                                                currentPage={Number(listAplication.current_page)}
                                                location={'center'}
                                            />: null
}
                        <Offset mb={90} />
                    </React.Fragment>
                    : <Spinner
                        text={'Список отзывов пуст'}
                    />
            }
        </React.Fragment>
    )
}
export default TopReview;