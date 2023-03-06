import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import { activeButtonBootomForConfirm, getOptions } from '../../../../helpers';
import Button from '../../../../Views/Button/Button';
import Message from '../../../../Views/Messages/Message/Message';
import Offset from '../../../../Views/Offset';
import Select from '../../../../Views/Select';
import Spinner from '../../../../Views/Spinner';
import TextArea from '../../../../Views/TextArea/TextArea';

const AggregateRequestRespair = () => {

    const { state } = useLocation();
    const navigate = useNavigate();
    const { dispatch, getContext, tg } = useStoreon('getContext', 'tg');
    const [dataRequstCountry, setDataRequestCountry] = useState([]);
    const [messageInForm, setMessageInForm] = useState({
        textMessage: '',
        colorMessage: ''
    });

    useEffect(() => {
        dispatch('setTextHeader', state?.name_button);
        dispatch('setActiveHeaderText', true);
        tg.BackButton.show() // меняет в хэдере крестик на стрелку
        tg.BackButton.onClick(() => navigate('/button_make_request', {
            state: {
                name_button: state?.old_name_button ?? ''
            }
        })) // метод при нажатии на кнопку действия

        const params = {
            url: '/api_get_countrys/',
            page_id: state?.action_page_id ?? 2,
            dataRequst: setDataRequestCountry,
            dataRequst: res => {
                if (!!res?.error) return setMessageInForm({ textMessage: 'УПС..., возникла не предвиденная ошибка, сообщите о ней Вашему менеджеру' })
                if (res?.result.length) {
                    const copyData = res?.result?.slice();
                    setDataRequestCountry(c => [...JSON.parse(JSON.stringify(copyData))])
                }
            }
        };
        dispatch('setGetContext', params)
    }, [dispatch, state?.action_page_id, tg.BackButton, navigate])

    const handlerSubmitChooseAggrigate = (data, { setFieldValue }) => {
        const params = {
            ...data,
            url: '/api_create_request/',
            setFieldValue: setFieldValue,
            dataRequst: () => { },
            redirectTo: (res) => navigate('/button_make_request', {
                state: {
                    ...state,
                    textMessage: res?.textMessage,
                    colorMessage: res?.colorMessage ?? '#000'
                }
            })
        }
        dispatch('setDataCreateRequest', params);
        return false;
    }

    const handlerVirtualClick = (values, setFieldValue) => {
        return () => handlerSubmitChooseAggrigate(values, setFieldValue)
    }

    return (
        <React.Fragment>
            {
                Array.isArray(getContext) ?
                    <React.Fragment>
                        <Message
                            message={messageInForm.textMessage}
                            colorMessage={messageInForm.colorMessage}
                        />
                        <Formik
                            initialValues={
                                {
                                    optionsCountry: dataRequstCountry,
                                    optionsCities: [],
                                    activeCity: false,
                                    type: state?.type,
                                    country_id: null,
                                    city_id: null,
                                    text: '',
                                }
                            }
                            onSubmit={handlerSubmitChooseAggrigate}
                        >
                            {
                                ({ values, errors, setFieldValue }) => {

                                    const handlerChangeDataRequest = (data) => {
                                        let options = getOptions(data);
                                        return options;
                                    }

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
                                                    options={getOptions(values.optionsCountry)}
                                                    value={values.country_id}
                                                    placeholder={'сделайте Ваш выбор'}
                                                    addClass={'select__dropdown-list-car'}
                                                    name={'country'}
                                                    id={1}
                                                    style={{ zIndex: 998 }}
                                                    onClick={e => {
                                                        const value = +e.target.getAttribute('value');
                                                        const sities = handlerChangeDataRequest(values.optionsCountry.map(el => {
                                                            if (el.id === value)
                                                                return el.citys;
                                                        }).filter(el => el !== undefined)[0]);
                                                        setFieldValue('country_id', value);
                                                        setFieldValue('optionsCities', sities);
                                                        setFieldValue('city_id', null);
                                                    }
                                                    }
                                                />
                                                <Select
                                                    options={values.optionsCities}
                                                    disable={!values.optionsCities.length}
                                                    value={values.city_id}
                                                    placeholder={'сделайте Ваш выбор'}
                                                    addClass={'select__dropdown-list-car'}
                                                    name={'city'}
                                                    id={2}
                                                    style={{ zIndex: 997 }}

                                                    onClick={e => {
                                                        const value = +e.target.getAttribute('value');
                                                        setFieldValue('city_id', value);
                                                        activeButtonBootomForConfirm(tg, values, 'country-text', 'создать');
                                                    }
                                                    }
                                                />

                                                <Offset mt={20} />
                                                <TextArea
                                                    className={'textarea-application'}
                                                    value={values.text}
                                                    name={'text'}
                                                    placeholder={'Введите данные для запроса'}
                                                    height={110}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        setFieldValue('text', value);
                                                        activeButtonBootomForConfirm(tg, { ...values, text: value }, 'country-text', 'создать');
                                                    }}
                                                />
                                                <Offset mt={50} />

                                                <Offset
                                                    mb={90}
                                                >
                                                    <button
                                                        className='btn-click'
                                                        onClick={() => handlerVirtualClick(values, setFieldValue)}
                                                    ></button>
                                                    {
                                                        !!!tg.initDataUnsafe?.query_id ?
                                                            <Button
                                                                disabled={!(values.text && values.country_id && values.city_id)}
                                                                type={'submit'}
                                                                addClass={'form-submit__btn'}
                                                                active={values.text && values.country_id && values.city_id}
                                                            >
                                                                <span>
                                                                    <span>создать</span>
                                                                </span>
                                                            </Button>
                                                            : null
                                                    }
                                                </Offset>
                                            </Form>
                                        </React.Fragment>
                                    )
                                }
                            }
                        </Formik>

                    </React.Fragment>
                    : <Spinner />
            }
        </React.Fragment>
    )
}
export default AggregateRequestRespair;