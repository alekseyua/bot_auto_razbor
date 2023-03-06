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
import FormUploadImage from '../../../../Views/UploadImage/FormUploadImage';


const AddAutoParsing = (

) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { dispatch, getContext, tg } = useStoreon('getContext', 'tg');
    const [dataRequstBrand, setDataRequestBrand] = useState([])
    const [messageInForm, setMessageInForm] = useState({
        textMessage: '',
        colorMessage: ''
    });

    useEffect(() => {
        state?.textMessage ?
            setMessageInForm(c => ({
                ...c,
                textMessage: state?.textMessage,
                colorMessage: state?.colorMessage
            }))
            : console.log('faick');
    }, [state?.textMessage, state?.colorMessage])

    useEffect(() => {
        dispatch('setTextHeader', state?.name_button);
        dispatch('setActiveHeaderText', true);
        tg.BackButton.show() // меняет в хэдере крестик на стрелку
        tg.BackButton.onClick(() => navigate('/button_parsing', {
            state: {
                name_button: state?.old_name_button ?? ''
            }
        })) // метод при нажатии на кнопку действия

        const params = {
            url: '/api_get_cars/',
            page_id: state?.action_page_id ?? 3,
            type: 'brand',
            dataRequst: res => {
                if (!!res?.error) return setMessageInForm({ textMessage: 'УПС..., возникла не предвиденная ошибка, сообщите о ней Вашему менеджеру' })
                if (res?.result.length) {
                    const copyData = res?.result?.slice();
                    setDataRequestBrand(c => [...c, ...getOptions(copyData)])
                }
            }
        };
        dispatch('setGetContext', params)
    }, [dispatch, tg.BackButton, navigate, state])

    const handlerSubmitChooseAggrigate = (data, { setFieldValue }) => {
        delete data['type']
        delete data['brand_id']
        const params = {
            ...data,
            confirmShow: true,
            url: '/api_create_parsing/',
            setFieldValue: setFieldValue,
            dataRequst: () => { },
            redirectTo: res => {
                navigate('/button_parsing', {
                    state: {
                        ...state,
                        textMessage: res?.message ?? res?.textMessage,
                        colorMessage: res?.colorMessage ?? '#000',
                        name_button: state?.name_button
                    }
                })
            }
        }
        dispatch('setDataCreateRequest', params);
        return false;
    }

    const handlerChangeData = (changeData) => {
        let params = {
            url: '/api_get_cars/',
            page_id: state?.action_page_id,
            type: changeData.type,
            dataRequst: changeData.handlerChangeDataRequest
        };
        if (changeData.brand_id) {
            params = {
                ...params,
                brand_id: changeData.brand_id
            }
        }
        if (changeData.model_id) {
            params = {
                ...params,
                model_id: changeData.model_id
            }
        }
        dispatch('setGetContext', params)
    }

    const handlerVirtualClick = (values, setFieldValue) => {
        return () => handlerSubmitChooseAggrigate(values, setFieldValue)
    }

    return (
        <React.Fragment>

            <Message message={messageInForm.textMessage} />
            {

                Array.isArray(getContext) ?
                    <Formik
                        initialValues={
                            {
                                optionsBrand: dataRequstBrand,
                                optionsModel: [],
                                optionsGeneration: [],
                                type: state.additional_info,
                                brand_id: '',
                                model_id: '',
                                generation_id: '',
                                text: '',
                                uploadFiles: null,
                                page: 1,
                                page_size: 30,
                                send: true
                            }
                        }
                        onSubmit={handlerSubmitChooseAggrigate}
                    >
                        {
                            ({ values, errors, setFieldValue }) => {

                                const handlerChangeDataRequest = (data) => {
                                    let options = getOptions(data.results);
                                    if (data.type === 'model')
                                        setFieldValue('optionsModel', options);
                                    if (data.type === 'generation')
                                        setFieldValue('optionsGeneration', options);
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
                                                options={values.optionsBrand}
                                                value={values.brand_id}
                                                placeholder={'сделайте Ваш выбор'}
                                                addClass={'select__dropdown-list-car'}
                                                name={'brand'}
                                                id={1}
                                                style={{ zIndex: 998 }}
                                                onClick={e => {
                                                    const value = e.target.getAttribute('value');
                                                    setFieldValue('brand_id', value);
                                                    setFieldValue('generation_id', '');
                                                    setFieldValue('model_id', '');
                                                    handlerChangeData({
                                                        type: 'model',
                                                        brand_id: value,
                                                        handlerChangeDataRequest: res => {
                                                            const copyData = res.result.slice();
                                                            handlerChangeDataRequest({
                                                                results: copyData,
                                                                type: res.type
                                                            })
                                                        },
                                                        values
                                                    });
                                                }
                                                }
                                            />
                                            <Select
                                                options={values.optionsModel}
                                                disable={!values.brand_id && !values.optionsModel.length}
                                                value={values.model_id}
                                                placeholder={'сделайте Ваш выбор'}
                                                addClass={'select__dropdown-list-car'}
                                                name={'model'}
                                                id={2}
                                                style={{ zIndex: 997 }}
                                                onClick={e => {
                                                    const value = e.target.getAttribute('value');
                                                    setFieldValue('model_id', value);
                                                    setFieldValue('generation_id', '');
                                                    handlerChangeData({
                                                        type: 'generation',
                                                        model_id: value,
                                                        handlerChangeDataRequest: res => {
                                                            const copyData = res.result.slice();
                                                            handlerChangeDataRequest({
                                                                results: copyData,
                                                                type: res.type
                                                            })
                                                        },
                                                    });

                                                }
                                                }
                                            />
                                            <Select
                                                options={values.optionsGeneration}
                                                value={values.generation_id}
                                                disable={!values.model_id && !values.optionsGeneration.length}
                                                placeholder={'сделайте Ваш выбор'}
                                                addClass={'select__dropdown-list-car'}
                                                name={'generation'}
                                                id={3}
                                                style={{ zIndex: 996 }}
                                                onClick={e => {
                                                    const value = e.target.getAttribute('value');
                                                    setFieldValue('generation_id', value);
                                                    activeButtonBootomForConfirm(tg, values, null, 'Добавить')
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
                                                    activeButtonBootomForConfirm(tg, values, null, 'Добавить')
                                                }}
                                            />
                                            <FormUploadImage
                                                multiple
                                                values={values}
                                                setFieldValue={setFieldValue}
                                                label={'прикрепить изображения'}
                                            />

                                            <Offset
                                                mb={20}
                                            >

                                                <button
                                                    className='btn-click'
                                                    onClick={() => handlerVirtualClick(values, setFieldValue)}
                                                ></button>
                                                {
                                                    !!!tg.initDataUnsafe?.query_id ?
                                                        <Button
                                                            disabled={!(values.text && values.generation_id && values.brand_id && values.model_id)}
                                                            type={'submit'}
                                                            addClass={'form-submit__btn'}
                                                            active={values.text && values.generation_id && values.brand_id && values.model_id}
                                                        >
                                                            <span>
                                                                <span>Добавить</span>
                                                            </span>
                                                        </Button>
                                                        : null
                                                }
                                            </Offset>
                                        </Form>
                                        {/* <Offset mb={90} /> */}
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
export default AddAutoParsing;