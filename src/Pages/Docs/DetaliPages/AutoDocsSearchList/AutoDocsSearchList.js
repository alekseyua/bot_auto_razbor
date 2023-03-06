import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import { activeButtonBootomForConfirm, getOptions } from '../../../../helpers';
import Button from '../../../../Views/Button/Button';
import Offset from '../../../../Views/Offset';
import Select from '../../../../Views/Select';
import Spinner from '../../../../Views/Spinner';
import CardApplicationAuto from '../../../../Views/CardApplicationAuto';
import Message from '../../../../Views/Messages/Message/Message';
import Pagination from '../../../../Views/Pagination/Pagination';

const AutoDocsSearchList = (

) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading ] = useState(false);
    const { dispatch, getContext, tg } = useStoreon('getContext', 'tg');
    const [dataRequstBrand, setDataRequestBrand] = useState([]);
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
        tg.BackButton.onClick(() => navigate('/button_docs', {
            state: {
                name_button: state?.old_name_button ?? ''
            }
        })) // метод при нажатии на кнопку действия
        const params = {
            url: '/api_get_cars/',
            page_id: 4,
            type: 'brand',
            dataRequst: res => {
                if (!!res?.error) return setMessageInForm({ textMessage: 'УПС..., возникла не предвиденная ошибка, сообщите о ней Вашему менеджеру' })
                const copyData = res?.result?.slice();
                setDataRequestBrand(c => [...c, ...getOptions(copyData)]);
            }
        };
        dispatch('setGetContext', params)
    }, [dispatch, tg.BackButton, navigate, state?.name_button,state?.old_name_button]);

    const handlerSubmitSearch = (data, { setFieldValue }) => {
        delete data['type']
        delete data['brand_id']
        delete data['page_id']
        delete data['text']
        const params = {
            ...data,
            confirmShow: true,
            url: '/api_search_docs/',
            setFieldValue: setFieldValue,
            setIsLoading: setIsLoading,
            dataRequst: res => { setListAplication(c => ({ ...c, ...res.result })) },
            redirectTo: (res) => { }
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
        return () => handlerSubmitSearch(values, setFieldValue)
    }

    const changePaginationPage = data => {
        const { page } = data;
        const paramsList = {
            url: '/api_search_docs/',
            page: page ?? 1,
            page_size: 30,
            setFieldValue: () => { },
            setIsLoading: setIsLoading,
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
                            initialValues={{
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
                                page_size: 30
                            }}
                            onSubmit={handlerSubmitSearch}
                        >
                            {
                                ({ values, errors, setFieldValue }) => {
                                    const handlerChangeDataRequest = (data) => {
                                        let options = getOptions(data.result);

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
                                                    // //height: 'calc(100% + 70px)',
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
                                                            handlerChangeDataRequest: handlerChangeDataRequest,
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
                                                            handlerChangeDataRequest: handlerChangeDataRequest,
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
                                                        activeButtonBootomForConfirm(tg, {...values, generation_id : value }, 'search', 'Найти');
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
                                                                disabled={!(values.generation_id && values.brand_id && values.model_id)}
                                                                type={'submit'}
                                                                addClass={'form-submit__btn'}
                                                                active={values.generation_id && values.brand_id && values.model_id}
                                                            >
                                                                <span>
                                                                    <span>найти</span>
                                                                </span>
                                                            </Button>
                                                        </Offset>
                                                        : null
                                                }
                                            </Form>

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
                        <div
                            // className={style['create-edit-parser-list__menu-main-result-search']}
                        >
                            Результат поиска: {listAplication?.results.length}
                        </div>

                        <CardApplicationAuto
                            listAplication={listAplication}
                            pathGoTo={'/button_docs/button_edit_doc_form'}
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
                    : <div
                        // className={style['create-edit-parser-list__menu-main-result-search']}
                    >Результат поиска: {listAplication?.results.length}</div>                    
            }
            
            {
                    isLoading?
                        <Spinner />
                        : null
            }
        </React.Fragment>   
    )
}

export default AutoDocsSearchList;