import React, { useEffect, useState } from 'react';
import { Form, useLocation, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import Offset from '../../../../../Views/Offset';
import Spinner from '../../../../../Views/Spinner';
import style from './styles/ourWarrantlyMembers.module.scss';
import { getOptions } from '../../../../../helpers';
import Select from '../../../../../Views/Select';
import { Formik } from 'formik';
import CardApplicationReviewMembers from '../../../../../Views/CardApplicationReviewMembers';
import Message from '../../../../../Views/Messages/Message/Message';

const OurWarrantlyMembers = (

) => {
    const { state } = useLocation();
    const [isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();
    const { dispatch, getContext, tg } = useStoreon('getContext', 'tg');
    const [dataRequstCountry, setDataRequestCountry] = useState([]);
    const [messageInForm, setMessageInForm] = useState({
        textMessage: '',
        colorMessage: ''
    });

    useEffect(() => {
        dispatch('setTextHeader', `Гарант от администрации`);
        dispatch('setActiveHeaderText', true);
        tg.BackButton.show() // меняет в хэдере крестик на стрелку
        tg.BackButton.onClick(() => navigate('/button_rating/button_garant_rating', {
            state: {
                name_button: state?.old_name_button ?? ''
            }
        })) // метод при нажатии на кнопку действия

        const params = {
            url: '/api_get_garant_members/',
            page: 1,
            page_size: 30,
            dataRequst: res => {
                if (!!res?.error) return setMessageInForm({ textMessage: 'УПС..., возникла не предвиденная ошибка, сообщите о ней Вашему менеджеру' })
                if (res?.result.length) {
                    const copyData = res?.result?.slice();
                    setDataRequestCountry(c => [...c, ...getOptions(copyData)])
                }
            },
        };
        dispatch('setGetContext', params)

    }, [dispatch, state?.action_page_id, tg.BackButton, navigate, state?.old_name_button, state?.name_button]);

    const handlerSubmitChooseAggrigate = (data, { setFieldValue }) => {
        const params = {
            ...data,
            url: '/api_create_request/',
            setFieldValue: setFieldValue,
            setIsLoading:setIsLoading,
            dataRequst: () => { },
            redirectTo: res => navigate('/button_make_request', {
                state: {
                    ...state,
                    textMessage: res?.textMessage,
                    colorMessage: res?.colorMessage ?? '#000'
                }
            })
        }
        dispatch('setDataCreateRequest', params)
    }
    const handlerChangeData = (changeData, setFieldValue) => {
        let params = {
            url: '/api_get_city_members/',
            city_id: changeData.value,
            setIsLoading:setIsLoading,
            dataRequst: res => setFieldValue('members', [...res.result])
        };
        dispatch('setGetContext', params)
    }

    return (
        <React.Fragment>
            <Message
                message={messageInForm.textMessage}
                colorMessage={messageInForm.colorMessage}
            />
            {

                Array.isArray(getContext) ?

                    <Formik
                        initialValues={
                            {
                                optionsCountry: dataRequstCountry,
                                members: [],
                                country_id: null,
                            }
                        }
                        onSubmit={handlerSubmitChooseAggrigate}
                    >
                        {
                            ({ values, errors, setFieldValue }) => {
                                return (
                                    <React.Fragment>
                                        <Form
                                            style={{
                                                width: '100%',
                                                //height: 'calc(100% + 70px)',
                                                position: 'relative',
                                            }}
                                        >
                                            <Select
                                                options={values.optionsCountry}
                                                value={values.brand}
                                                placeholder={'сделайте Ваш выбор'}
                                                addClass={'select__dropdown-list-car'}
                                                name={'country'}
                                                id={1}
                                                style={{ zIndex: 998 }}
                                                onClick={e => {
                                                    const value = +e.target.getAttribute('value');
                                                    handlerChangeData({ value }, setFieldValue)
                                                    setFieldValue('country_id', value);
                                                }
                                                }
                                            />
                                            <Offset mb={20} />

                                        </Form>
                                        {
                                            isLoading?
                                                <Spinner />
                                                : values.members.length ?
                                                    <React.Fragment>
                                                        <div
                                                            className={style['create-edit-parser-list__menu-main-result-search']}
                                                        >
                                                            Результат запроса: {values.members?.length}
                                                        </div>
                                                        <CardApplicationReviewMembers
                                                            listAplication={{ results: values.members }}
                                                        />
                                                    </React.Fragment>
                                                    : null
                                        }

                                    </React.Fragment>
                                )
                            }
                        }
                    </Formik>
                    : <Spinner />
            }
        </React.Fragment>
    )
}
export default OurWarrantlyMembers;