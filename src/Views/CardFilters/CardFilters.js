import React from "react";
import { Link } from "react-router-dom";
import CheckBox from "../CheckBox/CheckBox";
import Icon from "../Icon/Icon";
import Spinner from "../Spinner";

import style from './styles/cartfilter.module.scss';

const CardFilters = ({
    list,   
    handlerChangeData,
    localPath,
    old_state,
    selectProduct,
}) =>{

    return (
        <React.Fragment>
            <ul
                className={style['card-filter__container']}
            >
                {
                    list.length?
                        list.map( (el, i )=> {

                            return (
                                <li
                                    className={style['card-filter__item']}
                                >
                                    <CheckBox
                                        checked={selectProduct.includes(el.value)}
                                        onChange={ res => handlerChangeData(res)}
                                        name={old_state.dataFilters.page}
                                        value={el.value}
                                        id={`check-${el.value}`}
                                    />

                                    <Link
                                        to={`${localPath}${el.value}`}
                                        state = {{
                                            old_name_button: old_state?.old_name_button,
                                            old_state: old_state,
                                            dataFilters: old_state.children
                                        }}
                                        className={style['card-filter__wrap-title']}
                                        style={{
                                            pointerEvents: selectProduct.includes(el.value)? 'none' : 'all',
                                            color: selectProduct.includes(el.value)? '#c3c3c3' : '#000'
                                        }}
                                    >
                                        <Icon 
                                            image={el.image} 
                                            className={style['card-filter__icon-list']}    
                                        />
                                        <span
                                            className={style['card-filter__name']}
                                        >
                                            {el.title}
                                        </span>
                                    </Link>
                                    
                                </li>
                            )
                        })
                        : <Spinner />
                }
            </ul>
        </React.Fragment>
    )
}

export default CardFilters;