import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import Button from '../../../../Views/Button/Button';
import Offset from '../../../../Views/Offset';
import Input from '../../../../Views/Input/Input';
import { color } from '../../../../helpers/const';
import Message from '../../../../Views/Messages/Message/Message';
import CardApplicationReview from '../../../../Views/CardApplicationReview/CardApplicationReview';
import { activeButtonBootomForConfirm, setDataButtonBotton } from '../../../../helpers';
import Spinner from '../../../../Views/Spinner';

const SeeReview = (

) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading ] = useState(false);
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
        tg.BackButton.onClick(() => {
            // activeButtonBootomForConfirm(tg);
            tg.MainButton.disable() // сделать активной 
            tg.MainButton.setParams({
                textColor: color.bgc__red,
                text: 'Ruuum',
                color: color.bgc__black,
            })
            tg.MainButton.hide() // скрыть кнопку
            tg.MainButton.show() // показать кноп
            navigate('/button_rating', {
                state: {
                    name_button: state?.old_name_button ?? ''
                }
            })
        }) // метод при нажатии на кнопку действия
    }, [dispatch, tg.BackButton, navigate,state?.name_button,state?.old_name_button,tg.MainButton])

    const handlerSubmitSearch = data => {
        const params = {
            ...data,
            page: 1,
            page_size: 30,
            setIsLoading: setIsLoading,
            url: '/api_get_ratings/',
            dataRequst: res => {
                if (res?.result?.status) {
                    setMessageInForm({
                        colorMessage: '#ff0000',
                        textMessage: res?.result?.status
                    })
                    return setListAplication(c => ({ ...c, results: [] }));
                }
                if (!!res?.error) return
                setMessageInForm({
                    textMessage: 'УПС..., возникла не предвиденная ошибка, сообщите о ней Вашему менеджеру',
                    colorMessage: '#ff0000',
                })
                setMessageInForm({
                    colorMessage: color.bgc__green,
                    textMessage: `найдено ${res?.result?.results?.length ?? 0} записей`
                });
                if (res?.result?.results?.length) {
                    const copyData = res?.result?.results.slice();
                    setListAplication(c => ({
                        ...c,
                        ...res.result,
                        results: [...copyData]
                    }))
                }
                setDataButtonBotton(false,tg)
            },
        };
        dispatch('getContextSearch', params);
    }

    const changePaginationPage = page => {
        const paramsList = {
            url: '/api_get_ratings/',
            page: page ?? 1,
            page_size: 30,
            setIsLoading: setIsLoading,
            dataRequst: res => {
                setListAplication(c => ({
                    ...c,
                    ...res.result,
                    results: [...res?.result?.results.slice()]
                }))
            },
        };
        dispatch('setListApplications', paramsList);
        return false;
    }
    const handlerVirtualClick = (values, setFieldValue) => {
        return () => handlerSubmitSearch(values, setFieldValue)
    }
    return (
        <React.Fragment>
            <Message
                message={messageInForm.textMessage}
                colorMessage={messageInForm.colorMessage}
            />
            <Formik
                initialValues={{
                    username: '',
                    page: 1,
                    page_size: 30
                }}
                onSubmit={handlerSubmitSearch}
            >
                {
                    ({ values, setFieldValue, handleChange }) => {
                        return (
                            <React.Fragment>
                                <Form 
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    //height: 'calc(100% + 70px)',
                                    padding: '0 15px',
                                    position: 'relative',
                                }} 
                                >
                                    <Input
                                        value={values.username}
                                        placeholder={'введите имя пользователя'}
                                        name={'username'}
                                        id={1}
                                        onChange={e => {
                                            const value = e.target.value;
                                            setFieldValue('username', value)
                                            if (value.length > 3) {
                                                activeButtonBootomForConfirm(tg, { ...values, username: value }, 'searchReview', 'найти')
                                            }
                                        }
                                        }
                                    />
                                    <button
                                        className='btn-click'
                                        onClick={() => handlerVirtualClick(values, setFieldValue)}
                                    ></button>
                                    {
                                        !!!tg.initDataUnsafe?.query_id ?
                                            <Offset
                                                mt={50}
                                            >
                                                <Button
                                                    disabled={!(values.username)}
                                                    type={'submit'}
                                                    addClass={'form-submit__btn'}
                                                    active={values.username}
                                                >
                                                    <span>
                                                        <span>найти</span>
                                                    </span>
                                                </Button>
                                            </Offset>
                                            : null
                                    }
                                </Form>
                                {/* <Offset mb={90} /> */}
                            </React.Fragment>
                        )
                    }
                }
            </Formik>

            {
                isLoading?
                <Spinner />
                : listAplication.results.length ?
                    <React.Fragment>
                        <div>найдено {listAplication?.results.length} отзыв(ов)</div>
                        <CardApplicationReview
                            changePaginationPage={changePaginationPage}
                            listAplication={listAplication}
                        />

                    </React.Fragment>                    
                        : null
            }
        </React.Fragment>
    )
}
export default SeeReview;