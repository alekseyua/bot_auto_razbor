import React, { useEffect } from 'react';
import Iframe from 'react-iframe';
import { useLocation } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import Offset from '../../Views/Offset';

import style from './styles/emptyPege.module.scss';

const EmptyPege = ({

}) => {
    const { state } = useLocation();
    const { dispatch, getContext, tg } = useStoreon('getContext', 'tg');
    const { message, buttons } = getContext;

    useEffect( ()=>{
        const params = {
            url: '/api_get_page/',
            //page_id: state.action_page_id ?? 2,
            dataRequst:()=>{}
        };
        dispatch('setGetContext',params)
    },[dispatch, state?.action_page_id])

return(
<React.Fragment>
    <Offset mt={20}/>
    <Offset mt={90}/>
    Сераница находиться в разработке
    увидев эту ошибку напишите нам, и мы в ближайшее время решим эту проблему
    loading ...


    </React.Fragment>
)
}
export default EmptyPege;