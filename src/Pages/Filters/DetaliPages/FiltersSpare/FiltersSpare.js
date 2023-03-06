import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import { getOptions } from '../../../../helpers';
import CardFilters from '../../../../Views/CardFilters';
import Message from '../../../../Views/Messages/Message/Message';


const FiltersSpare = (
    
) => {
    const { state } = useLocation();
    console.log({state})
    const navigate = useNavigate()
    const { message } = state.dataFilters;
    const { dispatch, getContext, tg } = useStoreon('getContext', 'tg');
    const [dataRequstBrand, setDataRequestBrand] = useState([])
    const [ selectProduct, setSelectProduct ] = useState([])
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
            url: '/api_get_cars/',
            page_id: state?.action_page_id ?? 2,
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
    }, [dispatch, state?.action_page_id, navigate, tg.BackButton])


    useEffect(()=> {
        setMessageInForm(c => ({
            ...c,
            textMessage: message
        }))
    },[message])

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

    const handlerChangeData = changeData => {
        console.log({changeData}, changeData.value)
        const item = +changeData.value
        if (selectProduct.includes(item)) {
            setSelectProduct(c=> c.filter( el => el !== item ));
        }else{
            setSelectProduct(c=> [...c, item]);
        }


            // когда проваливаемся /? {
            //     type:spare
            //     list:models
            //     brand_id:82
            // }

        let params = {
            url: '/api_get_filters/',
            // //page_id: state?.action_page_id,
            brand_id: item,
            type: state.type,
            list: 'models',
            dataRequst: changeData.handlerChangeDataRequest
        };
        // if (changeData.brand_id) {
        //     params = {
        //         ...params,
        //         brand_id: changeData.brand_id
        //     }
        // }
        // if (changeData.model_id) {
        //     params = {
        //         ...params,
        //         model_id: changeData.model_id
        //     }
        // }

        dispatch('setGetContext', params)
    }

    const handlerVirtualClick = (values, setFieldValue) => {
        return () => handlerSubmitChooseAggrigate(values, setFieldValue)
    }

    console.log({dataRequstBrand}, selectProduct)
    return (
        <React.Fragment>
               <Message
                    message={messageInForm.textMessage}
                    colorMessage={messageInForm.colorMessage}
                />
                <CardFilters 
                    list={dataRequstBrand}
                    handlerChangeData = {handlerChangeData}
                    localPath={'/button_filters/spare/'}
                    old_state={state}
                    selectProduct={selectProduct}
                />            
        </React.Fragment>
    )
}
export default FiltersSpare;