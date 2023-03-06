import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import Offset from '../../../../Views/Offset';
import Spinner from '../../../../Views/Spinner';
import Button from '../../../../Views/Button/Button';
import { activeButtonBootomForConfirm, setDataButtonBotton } from '../../../../helpers';
import Message from '../../../../Views/Messages/Message/Message';

import CardApplicationAutoDelete from '../../../../Views/CardApplicationAutoDelete/CardApplicationAutoDelete';
import Pagination from '../../../../Views/Pagination/Pagination';

const CreateDeleteSaleList = (

) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { dispatch, getContext, tg } = useStoreon('getContext', 'tg');
    const [selectId, setSelectId] = useState([]);
    const [messageInForm, setMessageInForm] = useState({
        textMessage: '',
        colorMessage: ''
    });
    const { message } = getContext;
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
    }, [message?.name, state?.textMessage,state?.colorMessage])

    useEffect(() => {
        dispatch('setTextHeader', state?.name_button);
        dispatch('setActiveHeaderText', true);
        tg.BackButton.show() // меняет в хэдере крестик на стрелку
        tg.BackButton.onClick(() => navigate('/button_sales', {
            state: {
                name_button: state?.old_name_button ?? ''
            }
        })) // метод при нажатии на кнопку действия

        const paramsList = {
            url: '/api_get_sales/',
            page: 1,
            page_size: 30,
            dataRequst: res => {
                if (!!res?.error) return setMessageInForm({ textMessage: 'УПС..., возникла не предвиденная ошибка, сообщите о ней Вашему менеджеру' })
                if (res?.result.results.length) {
                    const copyData = res?.result?.results.slice();
                    setListAplication(c => ({
                        ...c,
                        ...res?.result,
                        count: res?.result.count,
                        results: [...copyData]
                    }))
                }
            }
        };
        dispatch('setListApplications', paramsList)
    }, [dispatch, state?.action_page_id, tg.BackButton, navigate,state?.name_button,state?.old_name_button])

    const handlerChooseItem = id => {

        if (selectId.includes(id)) {
            setSelectId(c => c.filter(el => el !== id))
            return
        }
        setSelectId(c => [...c, id])
    }

    const handlerSubmitChange = (data) => {

        data.map(id => {
            try {

                const params = {
                    page: 1,
                    page_size: 30,
                    sale_id: id,
                    url: '/api_delete_sale/',
                    dataRequst: res => {
                        const copyData = res?.result?.results.slice();
                        setListAplication(c => ({
                            ...c,
                            ...res?.result,
                            count: res?.result.count,
                            results: [...copyData]
                        }));
                        setSelectId(c => c.filter(el => el !== id));
                    },
                }
                dispatch('deleteApplicationId', params)
                return setDataButtonBotton(false, tg)
            } catch (err) {
                console.log('delete application ERROR', err);
                return setDataButtonBotton(false, tg)
            }
        })
        return false;
    }

    useEffect(() => {
        if (!!selectId.length) {
            activeButtonBootomForConfirm(tg, selectId, 'deleteApplication', 'Подтвердить удаление');
        }else{
            return setDataButtonBotton(false, tg)
        }
    }, [selectId, tg])

    const changePaginationPage = data => {
        const { page } = data;
        const paramsList = {
            url: '/api_get_sales/',
            page: page ?? 1,
            page_size: 30,
            dataRequst: res => {
                if (!!res?.error) return setMessageInForm({ textMessage: 'УПС..., возникла не предвиденная ошибка, сообщите о ней Вашему менеджеру' })
                if (res?.result.results.length) {
                    const copyData = res?.result?.results.slice();
                    setListAplication(c => ({
                        ...c,
                        ...res?.result,
                        count: res?.result.count,
                        results: [...copyData]
                    }));
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

                        <CardApplicationAutoDelete
                            listAplication={listAplication}
                            selectId={selectId}
                            handlerChooseItem={handlerChooseItem}
                        />
                        {
                            listAplication.count > 30 ?
                                <Pagination
                                    // data={listAplication.results}
                                    allCount={listAplication.count}
                                    count={30}
                                    handlerChangePaginations={changePaginationPage}
                                    currentPage={Number(listAplication.current_page)}
                                    location={'center'}
                                />
                                : null
                        }
                        <button
                            className='btn-click'
                            onClick={() => handlerSubmitChange(selectId)}
                        ></button>
                        {
                            !!!tg.initDataUnsafe?.query_id ?
                                <Offset
                                    mb={20}
                                >
                                    <Button
                                        disabled={!!!selectId.length}
                                        onClick={() => handlerSubmitChange(selectId)}
                                        type={'submit'}
                                        addClass={'form-submit__btn'}
                                        active={!!selectId.length}
                                    >
                                        <span>
                                            <span>Подтвердить удаление</span>
                                        </span>
                                    </Button>
                                </Offset>
                                : null
                        }
                    </React.Fragment>
                    : <Spinner
                        text={'У Вас нет пока заявок'}
                    />
            }

        </React.Fragment>
    )
}
export default CreateDeleteSaleList;