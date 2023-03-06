import { Form, Formik } from 'formik';
import React, { useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import { activeButtonBootomForConfirm } from '../../../../helpers';
import Button from '../../../../Views/Button/Button';
import Input from '../../../../Views/Input/Input';
import Offset from '../../../../Views/Offset';
import RaitingContainer from '../../../../Views/Raiting/RaitingContainer';
import TextArea from '../../../../Views/TextArea/TextArea';

const CreateReview = (

) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { dispatch, tg } = useStoreon('tg');

    useEffect(() => {
        dispatch('setTextHeader', state?.name_button);
        dispatch('setActiveHeaderText', true);
        tg.BackButton.show() // меняет в хэдере крестик на стрелку
        tg.BackButton.onClick(() => navigate('/button_rating', {
            state: {
                name_button: state?.old_name_button ?? ''
            }
        })) // метод при нажатии на кнопку действия
    }, [dispatch, tg.BackButton, navigate,state?.name_button, state?.old_name_button])


    const handlerSubmitChooseAggrigate = (data, { setFieldValue }) => {

        const params = {
            ...data,
            url: '/api_create_rating/',
            setFieldValue: setFieldValue,
            dataRequst: () => { },
            redirectTo: (res) => {
                const timer = setTimeout(() => {
                    navigate('/button_rating', {
                        state: {
                            ...state,
                            textMessage: res?.textMessage,
                            colorMessage: res?.colorMessage ?? '#000'
                        }
                    });
                    return () => clearTimeout(timer);
                }, 100);
            }
        }
        dispatch('addReview', params);
        return false;
    }

    const handlerVirtualClick = (values, setFieldValue) => {
        return () => handlerSubmitChooseAggrigate(values, setFieldValue)
    }

    return (
        <React.Fragment>

            <Formik
                initialValues={{
                    text: '',
                    rating: 0,
                    page: 1,
                    username: '',
                    page_size: 30,
                }}
                onSubmit={handlerSubmitChooseAggrigate}
            >
                {
                    ({ values, setFieldValue }) => {

                        const handlerChangeReviewStar = (data) => {
                            setFieldValue('rating', data.target.getAttribute('value'))
                        }

                        return (
                            <React.Fragment>
                                <Form
                                    style={{
                                                    width: '100%',
                                                    //height: 'calc(100% + 70px)',
                                                    padding: '0 15px',
                                                    position: 'relative',
                                                }} 
                                >
                                    {/* Поле для ввода юзернейма */}

                                    <Input
                                        value={values.username}
                                        placeholder={'введите имя пользователя'}
                                        name={'username'}
                                        id={1}
                                        label={'введите имя пользователя'}
                                        onChange={e => {
                                            const value = e.target.value;
                                            setFieldValue('username', value)
                                            if (value.length > 3)
                                                activeButtonBootomForConfirm(tg, { ...values, username: value }, 'review', 'создать');
                                        }
                                        }
                                    />

                                    {/* Ниже 5 звездочек,которые пользователь выбирает */}
                                    <Offset
                                        mt={50}
                                        mb={20}
                                    >

                                        <RaitingContainer
                                            max={5}
                                            value={values.rating}
                                            onChange={handlerChangeReviewStar}
                                            sizeStarHeight={30}
                                            sizeStarWidth={30}
                                        />

                                    </Offset>
                                    {/* Ниже текстовое поле,для самого отзывы */}
                                    <TextArea
                                        className={'textarea-application'}
                                        label={'Оставте отзыв'}
                                        value={values.text}
                                        name={'text'}
                                        placeholder={'напишите о сервисе'}
                                        height={110}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setFieldValue('text', value);
                                            activeButtonBootomForConfirm(tg, { ...values, text: value }, 'review', 'Добавить')
                                        }}
                                    />
                                    <button
                                        className='btn-click'
                                        onClick={() => handlerVirtualClick(values, setFieldValue)}
                                    ></button>

                                    {
                                        !!!tg.initDataUnsafe?.query_id ?
                                            <Offset
                                                mt={40}
                                            >
                                                <Button
                                                    disabled={!(values.username && values.text && values.rating)}
                                                    type={'submit'}
                                                    addClass={'form-submit__btn'}
                                                    active={values.username && values.text && values.rating}
                                                >
                                                    <span>
                                                        <span>Добавить</span>
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
    )
}
export default CreateReview;