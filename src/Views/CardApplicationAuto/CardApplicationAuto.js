import classNames from "classnames";
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import Icon from "../Icon/Icon";

import style from './styles/cardApplicationAuto.module.scss';
import { Link } from "react-router-dom";

const CardApplicationAuto = ({
    listAplication,
    pathGoTo,
    handlerInCatalogApplication = () => { },
    handlerChangeApplication = () => { },
    handlerDeleteApplication = () => { },


}) => {

    return (
        <React.Fragment>
            <div
                className={style['create-in-parsing__menu-main-container-list']}
            >

                <ul
                    className={style['create-in-parsing__application-container-list']}
                >
                    {
                        listAplication.results.map(el => {
                            return (
                                <li
                                    className={style['create-in-parsing__application-items']}
                                    key={`list-app-${el.id}`}
                                >
                                    <Link
                                        to={`${pathGoTo}`}
                                        state={{ application: el.id }}
                                    >
                                        <div
                                            className={classNames({
                                                [style['create-in-parsing__application-wrap']]: true,
                                            })}
                                        >
                                            <div
                                               className={style['create-in-parsing__menu-items-container']}
                                            >
                                                Юзер: {el.user}
                                            </div>
                                            <div
                                               className={style['create-in-parsing__menu-items-container']}
                                            >
                                                <div
                                                    className={style['create-in-parsing__menu-items-model']}
                                                >
                                                    Модель: {el.model}
                                                </div>
                                                <div
                                                    className={style['create-in-parsing__menu-items-year']}
                                                >
                                                    Год {el.generation}
                                                </div>
                                            </div>

                                            <div
                                                className={style['create-in-parsing__menu-items-container']}
                                                style={{
                                                    width: `100%`
                                                }}
                                            >


                                                <div
                                                    className={style['create-in-parsing__menu-items-text']}
                                                >
                                                    {el.text}
                                                </div>
                                                <Swiper
                                                    modules={[Autoplay]}
                                                    delay={20}
                                                    spaceBetween={50}
                                                    slidesPerView={1}
                                                    // onSlideChange={() => console.log('slide change')}
                                                    // onSwiper={(swiper) => console.log(swiper)}
                                                    className={style['create-in-parsing__slider-image']}
                                                    autoplay={true}
                                                >
                                                    {
                                                        el?.images?.length ?
                                                            el.images.map(item => {
                                                                return <SwiperSlide
                                                                    key={item.id}
                                                                >
                                                                    <Icon
                                                                        image={item.url}
                                                                        width={50}
                                                                        height={70}
                                                                    />
                                                                </SwiperSlide>
                                                            })
                                                            : null
                                                    }

                                                </Swiper>
                                            </div>

                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </React.Fragment>
    )
}

export default CardApplicationAuto;