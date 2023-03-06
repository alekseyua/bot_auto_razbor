import React, { useEffect } from 'react';
import Iframe from 'react-iframe';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import { setDataButtonBotton } from '../../helpers';

const FiltersIfrem = ({

}) => {
    const { state } = useLocation();
    const navigate = useNavigate();
console.log({state})
    const { dispatch, getContext, tg } = useStoreon('getContext', 'tg');
    const { message, buttons } = getContext;
    let chatId = tg.initDataUnsafe;
    const userId = chatId?.user?.id ?? 1797304609;
    const user = chatId?.user;
    const first_name = user?.first_name;
    const last_name = user?.last_name;
    const username = user?.username;

    useEffect(() => {
        dispatch('setTextHeader', state?.name_button);
        dispatch('setActiveHeaderText', true);
            tg.BackButton.show() // меняет в хэдере крестик на стрелку
            tg.BackButton.onClick(() => navigate('/')) // метод при нажатии на кнопку действия
            tg.MainButton.setText = '';
            // Params({
            //     text: '',
            // }) 
            setDataButtonBotton(false, tg)
    },[tg, dispatch]);

    useEffect( ()=>{
        // const params = {
        //     url: '/api_get_page/',
        //     //page_id: state.action_page_id ?? 2,
        //     dataRequst:()=>{}
        // };
        // dispatch('setGetContext',params);

    },[dispatch, state?.action_page_id])
    useEffect(()=>{
        document.querySelector('.goto').scrollIntoView({block:'center', behavior: 'smooth'});

        setTimeout(() => document.querySelector('.filter-menu__container')?
            document.querySelector('.filter-menu__container').style='position: absolute'
            : console.log('loading frame')
        , 1500)
    },[])

return(
<React.Fragment>
    <Iframe 
        // url={'https://i.ua'}
        url={`https://botrazbor.ru/telegram/webapp_bot/?telegram_id=${userId}&first_name=${first_name}&last_name=${last_name}&username=${username}`}
        width="100%"
        className='iframe-test'
        display="block"
        position="relative"
        sandbox={["allow-scripts", "allow-same-origin", "allow-forms", "allow-pointer-lock", "allow-top-navigation"]}
    />
    </React.Fragment>
)
}
export default FiltersIfrem;