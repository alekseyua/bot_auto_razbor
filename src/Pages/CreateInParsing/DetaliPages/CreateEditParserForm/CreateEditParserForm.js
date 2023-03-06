import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import { activeButtonBootomForConfirm } from '../../../../helpers';
import Button from '../../../../Views/Button/Button';
import Message from '../../../../Views/Messages/Message/Message';
import Offset from '../../../../Views/Offset';
import PreviewImages from '../../../../Views/PreviewImages/PreviewImages';
import Spinner from '../../../../Views/Spinner';
import TextArea from '../../../../Views/TextArea/TextArea';
import FormUploadImage from '../../../../Views/UploadImage/FormUploadImage';

const CreateEditParserForm = (

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
        dispatch('setTextHeader', `редактировать заявку №${state.application}`);
        dispatch('setActiveHeaderText', true);
        tg.BackButton.show() // меняет в хэдере крестик на стрелку
        tg.BackButton.onClick(() => navigate('/button_parsing', {
            state: {
                name_button: state?.old_name_button ?? ''
            }
        })) // метод при нажатии на кнопку действия

        const paramsList = {
            url: '/api_get_parsings/',
            page: 1,
            page_size: 1111130,
            dataRequst: res => {
                if (!!res?.error) return setMessageInForm({ textMessage: 'УПС..., возникла не предвиденная ошибка, сообщите о ней Вашему менеджеру' })
                if (res?.result.results.length) {
                    const copyData = res?.result?.results.slice().filter(el => el.id === state.application);
                    setListAplication(c => ({
                        ...c,
                        ...res.result,
                        results: [...copyData]
                    }))
                }
            },
        };
        dispatch('setListApplications', paramsList)
    }, [dispatch, tg.BackButton, navigate, state.application, state?.old_name_button]);

    const handlerSubmitChange = (data, setFieldValue) => {
        delete data['type']
        delete data['brand_id']
        const params = {
            ...data,
            confirmShow: true,
            url: '/api_edit_parsing/',
            setFieldValue: setFieldValue,
            redirectTo: res => navigate('/button_parsing', {
                state: {
                    ...state,
                    textMessage: res?.textMessage,
                    colorMessage: res?.colorMessage ?? '#000'
                }
            })
        }
        dispatch('setDataEditRequest', params)
        return false;
    }

    // const editImage = (id, image) => {
    //     console.log('editImage = ', id, ' image = ', image);

    //     const params = {
    //         parsing_image_id: id, 
    //         uploadFiles: image,
    //         url: '/api_edit_parsing/',
    //         dataRequst: res => {
    //             if (!!res?.error) return setMessageInForm({ textMessage: 'УПС..., возникла не предвиденная ошибка, сообщите о ней Вашему менеджеру' })
    //             if (res?.result.results.length) {
    //                 const copyData = res?.result?.results.slice();
    //                 setListAplication(c => ({
    //                     ...c,
    //                     ...res.result,
    //                     results: [...copyData]
    //                 }))
    //             }
    //         },
    //         redirectTo: (res)=>{}
    //         // redirectTo: (res)=>navigate('/button_parsing', {state: {
    //         //                                 ...state,
    //         //                                 textMessage: res?.textMessage,
    //         //                                 colorMessage: res?.colorMessage ?? '#000'
    //         //                              }
    //         //                      })
    //     }
    //     dispatch('setDataEditRequest', params)
    // }
    const deleteImage = id => {
        try {
            const params = {
                parsing_image_id: id,
                url: '/api_delete_parsing_image/',
                dataRequst: res => {
                    if (!!res?.error) return setMessageInForm({ textMessage: 'УПС..., возникла не предвиденная ошибка, сообщите о ней Вашему менеджеру' })
                    const copyDataImages = res?.result?.results.images.slice();
                    setListAplication(c => (
                        {
                            ...c,
                            results: [
                                {
                                    ...c.results[0],
                                    images: copyDataImages
                                },
                            ]
                        }))
                },
            }
            dispatch('deleteApplicationId', params)
            return true
        } catch (err) {
            console.log('delete application ERROR', err)
        }
    }

    const handlerVirtualClick = (values, setFieldValue) => {
        return () => handlerSubmitChange(values, setFieldValue)
    }

    return (
        <React.Fragment>
            {
                listAplication.results.length && listAplication.results[0]?.id ?
                    <React.Fragment>
                        <Message
                            message={messageInForm.textMessage}
                            colorMessage={messageInForm.colorMessage}
                        />

                        <Formik
                            initialValues={{
                                text: listAplication?.results[0]?.text,
                                uploadFiles: [],
                                page: 1,
                                page_size: 30,
                                parsing_id: state.application
                            }}
                            onSubmit={handlerSubmitChange}
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
                                                    placeholder={'Введите данные для запроса'}
                                                    height={110}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        setFieldValue('text', value);
                                                        activeButtonBootomForConfirm(tg, { ...values, text: value }, 'text', 'Подтвердить изменения');
                                                    }}
                                                />

                                                <PreviewImages
                                                    list={listAplication.results[0].images}
                                                    // editImage={editImage}
                                                    deleteImage={deleteImage}
                                                />

                                                <FormUploadImage
                                                    values={values}
                                                    setFieldValue={setFieldValue}
                                                    label={'добавить изображения'}
                                                    callback={
                                                        files => activeButtonBootomForConfirm(tg, { ...values, uploadFiles: files }, 'text', 'Подтвердить изменения')
                                                    }
                                                />
                                                <button
                                                    className='btn-click'
                                                    onClick={() => handlerVirtualClick(values, setFieldValue)}
                                                ></button>
                                                {
                                                    !!!tg.initDataUnsafe?.query_id ?
                                                        <Offset
                                                            mb={20}
                                                        >
                                                            <Button
                                                                disabled={!!!(values.text)}
                                                                type={'submit'}
                                                                addClass={'form-submit__btn'}
                                                                active={!!values.text}
                                                            >
                                                                <span>
                                                                    <span>Подтвердить изменения</span>
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
        </React.Fragment>
    )
}
export default CreateEditParserForm;