import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useStoreon } from "storeon/react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { arrow_up, arrowTopNoFill, homePng } from "../../images";
import Icon from "../../Views/Icon/Icon";

import 'swiper/css';
import style from './styles/header.module.scss';
import { setDataButtonBotton } from "../../helpers";
import cogoToast from 'cogo-toast';

const Header = (

) => {
    const { activeBackMenu, textHeader, tg, selectItemMenu, messagePopup } = useStoreon('activeBackMenu', 'textHeader', 'tg', 'selectItemMenu', 'messagePopup');
    const navigate = useNavigate();
    const { menu, dispatch } = useStoreon('menu');
    useEffect(() => {

        if (!!messagePopup) {
            const { hide } = cogoToast.success(
                <div
                            className={style['detali-info__container']}
                        dangerouslySetInnerHTML={{ __html: messagePopup.split(' ').map( (el, i) => el.includes('https://')? `<a href=${el}>${el}</a>` : el).join(' ') }}>
                        </div> 
                , {
                position: 'top-center',
                heading: `Уведомление `,
                style: `marginTop: 150px; width: 90%`,
                hideAfter: 90,
                onClick: (e) => {
                    // messagePopup.match(/https:\/\/[^\s\Z]+/i)?.length ? window.open(messagePopup.match(/https:\/\/[^\s\Z]+/i)[0]) : console.log('fack url');
                    dispatch('setMessagePopup', '')
                    return hide()
                }
            }
            )
        }
    }, [messagePopup])

    useEffect(() => {
        setDataButtonBotton(false, tg);
        tg.onEvent('viewportChanged', (event) => {
            if (!event.isStateStable) {
                tg.expand()
            }
        });
    }, [])

    useEffect(() => {
        dispatch('setMenu')
    }, [dispatch])

    if (!!!menu?.content) return
    let { buttons = [] } = menu.content;
    buttons = [
        {
            action_page_id: null,
            additional_info: "",
            id: 998,
            image: `${arrow_up}`,
            name: "",
            parent_page_id: 1,
            slug: '',
            text: "goto",
            class: '',
            can_click: {
                message: "test",
                redirect_payment: true,
                status: true,
            },
        },
        {
            action_page_id: null,
            additional_info: "unit",
            id: 999,
            image: `${homePng}`,
            name: "",
            parent_page_id: 1,
            slug: '',
            text: "Главная",
            class: '',
            can_click: {
                message: "test",
                redirect_payment: true,
                status: true,
            },
        },
        ...buttons
    ]

    const goTo = () => {
        document.querySelector('.goto').scrollIntoView({ block: 'center', behavior: 'smooth' })
    }

    return (
        <React.Fragment>
            <div
                className={classNames({
                    [style['header__menu-wrap--top']]: true,
                    [style['active']]: activeBackMenu
                })
                }
            >
                <div
                    className={classNames({
                        [style['header__wrap-discription']]: true,
                        [style['active']]: activeBackMenu
                    })}
                >{textHeader}</div>
            </div>
            <div
                className={style['header__menu-wrap--bottom']}
            >

                {
                    menu?.content && ('buttons' in menu?.content) ?

                        <Swiper
                            spaceBetween={5}
                            slidesPerView={buttons.length}
                            autoplay
                            style={{ height: '100%' }}
                        // onSlideChange={() => console.log('slide change')}
                        // onSwiper={(swiper) => console.log(swiper)}
                        >
                            {
                                buttons.map((el, i) => {
                                    return (
                                        <SwiperSlide
                                            key={el.id}
                                        >
                                            {
                                                el.id === 998 ?
                                                    <Icon
                                                        width={30}
                                                        height={30}
                                                        image={el.image}
                                                        onClick={goTo}
                                                        className={classNames({
                                                            [style['header__list-items']]: true,
                                                            [style['header__select-item']]: selectItemMenu === el.id,
                                                        })}
                                                    />
                                                    :
                                                            el.can_click?.status ?
                                                                <Link
                                                                    to={`/${el.slug}`}
                                                                    state={{
                                                                        action_page_id: el.action_page_id ?? 1,
                                                                        url: window.location.href.split('/').pop(),
                                                                        type: el.additional_info,
                                                                        name_button: el.text,
                                                                        url_redirect: el.url
                                                                    }}
                                                                    onClick={() => {
                                                                        dispatch('setItemMenu', el.id);
                                                                        dispatch('context', {})

                                                                        return el.id === 30 ?(
                                                                            dispatch('setItemMenu', null),
                                                                            window.open(el.url, '_blank')
                                                                            ): el.id === 6 ?(
                                                                                dispatch('setItemMenu', null),
                                                                                window.open(el.url, '_blank')
                                                                                ): el.slug ? dispatch('setActiveHeaderText', true) : dispatch('setActiveHeaderText', false)
                                                                    }}
                                                                >
                                                                    <Icon
                                                                        width={30}
                                                                        height={30}
                                                                        image={el.image}
                                                                        className={classNames({
                                                                            [style['header__list-items']]: true,
                                                                            [style['header__select-item']]: selectItemMenu === el.id,
                                                                        })}
                                                                    />
                                                                </Link>
                                                                : <div
                                                                    onClick={() => {
                                                                        dispatch('setMessagePopup', el.can_click?.message ? el.can_click?.message : '');
                                                                        // dispatch('setActiveHeaderText', false)
                                                                        dispatch('setItemMenu', 31);
                                                                        if(el.can_click.redirect_payment){
                                                                            return navigate('/button_my_profile', {state: {
                                                                                name_button: 'мой профиль'
                                                                            }});
                                                                        }
                                                                        return true;
                                                                    }}
                                                                > 
                                                                    <Icon
                                                                        width={30}
                                                                        height={30}
                                                                        image={el.image}
                                                                        className={classNames({
                                                                            [style['header__list-items']]: true,
                                                                            [style['header__select-item']]: selectItemMenu === el.id,
                                                                        })}
                                                                    />
                                                                </div>                                                    
                                            }
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>

                        : null
                }


            </div>
            <div className={style['header__menu-background-container']}>
                {/* <div className={style['header__menu-dicoration-1']}></div>
                <div className={style['header__menu-dicoration-2']}></div>
                <div className={style['header__menu-dicoration-3']}></div>
                <div className={style['header__menu-dicoration-4']}></div>
                <div className={style['header__menu-dicoration-5']}></div>
                <div className={style['header__menu-dicoration-6']}></div>
                <div className={style['header__menu-dicoration-7']}></div>
                <div className={style['header__menu-dicoration-8']}></div>

                <div className={style['header__menu-dicoration-9']}></div>
                <div className={style['header__menu-dicoration-10']}></div>
                <div className={style['header__menu-dicoration-11']}></div>
                <div className={style['header__menu-dicoration-12']}></div>
                <div className={style['header__menu-dicoration-13']}></div>
                <div className={style['header__menu-dicoration-14']}></div>
                <div className={style['header__menu-dicoration-15']}></div>
                <div className={style['header__menu-dicoration-16']}></div> */}
            </div>
        </React.Fragment>
    )
}

export default Header;

