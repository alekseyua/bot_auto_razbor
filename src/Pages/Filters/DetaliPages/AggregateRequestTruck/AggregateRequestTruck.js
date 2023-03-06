import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import { activeButtonBootomForConfirm } from '../../../../helpers';
import Button from '../../../../Views/Button/Button';
import Message from '../../../../Views/Messages/Message/Message';
import Offset from '../../../../Views/Offset';
import TextArea from '../../../../Views/TextArea/TextArea';

const AggregateRequestTruck = () => {

    const { state } = useLocation();
    const navigate = useNavigate();
    const { dispatch, tg } = useStoreon('tg');
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
    }, [dispatch, tg.BackButton, navigate])

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
                <Message message={messageInForm.textMessage} />

                <Formik
                    initialValues={
                        {
                            type: state.type,
                            text: '',
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

                                        <Offset mt={20} />
                                        <TextArea
                                            className={'textarea-application'}
                                            value={values.text}
                                            name={'text'}
                                            placeholder={'Опишите Вашу заявку'}
                                            height={110}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setFieldValue('text', value);
                                                activeButtonBootomForConfirm(tg, values, 'text', 'создать')
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
                                                        disabled={!(values.text)}
                                                        type={'submit'}
                                                        addClass={'form-submit__btn'}
                                                        active={values.text}
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
    )
}
export default AggregateRequestTruck;