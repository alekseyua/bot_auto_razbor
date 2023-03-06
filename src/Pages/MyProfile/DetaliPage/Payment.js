import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStoreon } from "storeon/react";
import { activeButtonBootomForConfirm, getOptions, getOptionsPayment, setDataButtonBotton } from "../../../helpers";
import Button from "../../../Views/Button/Button";
import Message from "../../../Views/Messages/Message/Message";
import Offset from "../../../Views/Offset";
import Select from "../../../Views/Select";
import Spinner from "../../../Views/Spinner";

const Payment = (

) => {
    const { state } = useLocation();
    const { tg, dispatch } = useStoreon('tg');
    const navigate = useNavigate();
    const [isLoading, setIsLoading ] = useState(false);  
    const { add_message, message } = state;

    const [messageInForm, setMessageInForm] = useState({
        textMessage: '',
        colorMessage: ''
    });
    const [messageInFormDop, setMessageInFormDop] = useState({
        textMessage: '',
        colorMessage: ''
    });

    useEffect(() => {
        setMessageInForm(c => ({
            ...c,
            textMessage: message,
            colorMessage: state?.colorMessage
        }))

    }, [message])
    useEffect(() => {
        setMessageInFormDop(c => ({
            ...c,
            textMessage: add_message,
            colorMessage: state?.colorMessage
        }))

    }, [add_message])





    const handlerSubmitChooseAggrigate = (data, { setFieldValue }) => {
        delete data['optionsAccess'];
        delete data['optionsBank'];
        delete data['optionsPeriod'];
        delete data['access_text'];
        delete data['bank_text'];
        delete data['period_text'];

        const params = {
            ...data,
            url: '/api_get_pay_url/',
            setIsLoading:setIsLoading,
            dataRequst: res => {  
                console.log('res = ', res.result)
                window.open(`${res.result.url}`, '_blank')
                setDataButtonBotton(false, tg)
            }
        }
        dispatch('setDataCreateRequest', params);
        return false;
    }

    const handlerVirtualClick = (values, setFieldValue) => {
        return () => handlerSubmitChooseAggrigate(values, setFieldValue)
    }

    return (
        <React.Fragment>

            <Message
                noicon
                message={<span dangerouslySetInnerHTML={{ __html: messageInForm.textMessage.split(',').join('<br>')}}></span>}
                colorMessage={messageInForm.colorMessage}
            />
            <Message
                message={<span dangerouslySetInnerHTML={{ __html: messageInFormDop.textMessage.split('_/').join('<br>') }}></span>}
                colorMessage={messageInFormDop.colorMessage}
            />
            {

                !isLoading ?
                    <Formik
                        initialValues={
                            {
                                optionsAccess: getOptionsPayment(state.drop_down_list_access),
                                optionsBank: getOptionsPayment(state.drop_down_list_bank),
                                optionsPeriod: getOptionsPayment(state.drop_down_list_period),
                                access_text: '',
                                access: '',
                                bank_text: '',
                                bank: '',
                                period_text: '',
                                period: '',

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
                                                position: 'relative',
                                            }}
                                        >
                                            <Select
                                                options={values.optionsAccess}
                                                value={values.access_text}
                                                placeholder={'сделайте Ваш выбор'}
                                                addClass={'select__dropdown-list-car'}
                                                name={'access_text'}
                                                id={1}
                                                style={{ zIndex: 998 }}
                                                onClick={e => {
                                                    const value = e.target.getAttribute('value');
                                                    const key_value = e.target.getAttribute('key_value');
                                                    setFieldValue('access_text', value);
                                                    setFieldValue('access', key_value);
                                                    setFieldValue('bank_text', '');
                                                    setFieldValue('bank', '');
                                                    setFieldValue('period_text', '');
                                                    setFieldValue('period', '');
                                                }}
                                            />
                                            <Select
                                                options={values.optionsBank}
                                                disable={!values.access}
                                                value={values.bank_text}
                                                placeholder={'сделайте Ваш выбор'}
                                                addClass={'select__dropdown-list-car'}
                                                name={'bank_text'}
                                                id={2}
                                                style={{ zIndex: 997 }}
                                                onClick={e => {
                                                    const value = e.target.getAttribute('value');
                                                    const key_value = e.target.getAttribute('key_value');
                                                    setFieldValue('bank_text', value);
                                                    setFieldValue('bank', key_value);
                                                    setFieldValue('period_text', '');
                                                    setFieldValue('period', '');
                                                }
                                                }
                                            />
                                            <Select
                                                options={values.optionsPeriod}
                                                disable={!values.bank_text}
                                                value={values.period_text}
                                                placeholder={'сделайте Ваш выбор'}
                                                addClass={'select__dropdown-list-car'}
                                                name={'period_text'}
                                                id={3}
                                                style={{ zIndex: 996 }}
                                                onClick={e => {
                                                    const value = e.target.getAttribute('value');
                                                    const key_value = e.target.getAttribute('key_value');
                                                    setFieldValue('period_text', value);
                                                    setFieldValue('period', key_value);
                                                    activeButtonBootomForConfirm(tg, {...values, period: key_value}, 'payment', 'перейти к оплате');
                                                }
                                                }
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
                                                            disabled={!(values.access && values.bank && values.period)}
                                                            type={'submit'}
                                                            addClass={'form-submit__btn'}
                                                            active={values.access && values.bank && values.period}
                                                        >
                                                            <span>
                                                                <span>оплатить</span>
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
                    : <Spinner />
            }
       </React.Fragment>
    )
}

export default Payment;