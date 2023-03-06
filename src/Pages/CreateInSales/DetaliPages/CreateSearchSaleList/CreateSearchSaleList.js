import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import { activeButtonBootomForConfirm, getOptions } from '../../../../helpers';
import Button from '../../../../Views/Button/Button';
import Offset from '../../../../Views/Offset';
import Select from '../../../../Views/Select';
import Spinner from '../../../../Views/Spinner';
import Message from '../../../../Views/Messages/Message/Message';
import CardApplication from '../../../../Views/CardApplication';
import Pagination from '../../../../Views/Pagination/Pagination';

const CreateSearchSaleList = (

) => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const { dispatch, getContext, tg } = useStoreon('getContext', 'tg');
    const [dataRequstBrand, setDataRequestBrand] = useState([]);
    const [listAplication, setListAplication] = useState({
        count: 0,
        results: []
    });
    const [messageInForm, setMessageInForm] = useState({
        textMessage: '',
        colorMessage: ''
    });

    useEffect(() => {
        dispatch('setTextHeader', state?.name_button);
        dispatch('setActiveHeaderText', true);
        tg.BackButton.show() // меняет в хэдере крестик на стрелку
        tg.BackButton.onClick(() => navigate('/button_parsing')) // метод при нажатии на кнопку действия
        const params = {
            url: '/api_get_cars/',
            page_id: state?.action_page_id ?? 3,
            type: 'brand',
            dataRequst: res => {
                console.log({ CreateSearchParserList: res })
                if (!!res?.error) return setMessageInForm({ textMessage: 'УПС..., возникла не предвиденная ошибка, сообщите о ней Вашему менеджеру' })
                if (res?.result.length) {
                    const copyData = res?.result?.slice();
                    setDataRequestBrand(c => [...c, ...getOptions(copyData)])
                }
            }
        };
        dispatch('setGetContext', params)
    }, [dispatch, tg.BackButton, navigate])


    const handlerSubmitSearch = (data, { setFieldValue }) => {
        delete data['type']
        delete data['brand_id']
        delete data['page_id']
        delete data['text']
        const params = {
            ...data,
            confirmShow: true,
            url: '/api_search_parsings/',
            setFieldValue: setFieldValue,
            dataRequst: res => {
                if (!!res?.error) return setMessageInForm({ textMessage: 'УПС..., возникла не предвиденная ошибка, сообщите о ней Вашему менеджеру' })
                if (res?.result.results.length) {
                    const copyData = res?.result?.results.slice();
                    setListAplication(c => ({
                        ...c,
                        ...res.result,
                        model_id: data.model_id,
                        generation_id: data.generation_id,
                        results: [...copyData]
                    }))
                }
            },
            redirectTo: (res) => { },
        }
        dispatch('setDataCreateRequest', params)
    }

    const changePaginationPage = data => {
        const { model_id, generation_id, page } = data;
        const paramsList = {
            url: '/api_search_parsings/',
            page: page ?? 1,
            page_size: 30,
            model_id,
            generation_id,
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
        dispatch('setDataCreateRequest', paramsList)
    }

    const handlerChangeData = (changeData) => {
        let params = {
            url: '/api_get_sales/',
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
                                    optionsBrand: dataRequstBrand,
                                    optionsModel: [],
                                    optionsGeneration: [],
                                    type: state.type,
                                    brand_id: '',
                                    model_id: '',
                                    generation_id: '',
                                    text: '',
                                    uploadFiles: null,
                                    page: 1,
                                    page_size: 30
                                }
                            }
                            onSubmit={handlerSubmitSearch}
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

                                    const sendDataToServer = () => {
                                        handlerSubmitSearch(values, { setFieldValue });
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
                                                        })
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
                                                        })
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
                                                        activeButtonBootomForConfirm(tg, { ...values, generation_id: value }, 'search', 'Найти', sendDataToServer, setFieldValue);
                                                    }
                                                    }
                                                />

                                                <Offset
                                                    mt={50}
                                                >
                                                    {
                                                        !!!tg.initDataUnsafe?.query_id ?
                                                            <Button
                                                                disabled={!(values.generation_id && values.brand_id && values.model_id)}
                                                                type={'submit'}
                                                                addClass={'form-submit__btn'}
                                                                active={values.generation_id && values.brand_id && values.model_id}
                                                            >
                                                                <span>
                                                                    <span>найти</span>
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

                    </React.Fragment>
                    : <Spinner />
            }

            {
                listAplication.results.length ?
                    <React.Fragment>
                        <div>
                            Результат поиска: {listAplication?.results.length}
                        </div>

                        <CardApplication
                            noAction
                            listAplication={listAplication}
                        />

                        {
                            listAplication.count > 30 ?
                                <Pagination
                                    data={listAplication}
                                    allCount={listAplication.count}
                                    count={30}
                                    handlerChangePaginations={changePaginationPage}
                                    currentPage={Number(listAplication.current_page)}
                                    location={'center'}
                                />
                                : null
                        }
                    </React.Fragment>
                    : <div>
                            Результат поиска: {listAplication?.results.length}
                        </div>
            }
        </React.Fragment>
    )
}
export default CreateSearchSaleList;