import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import Block from "./DetaliBlock";

import style from './styles/listMainButtonMain.module.scss';

const ListMainButtonMain = ({
    navigate,
    dispatch,
    localPath,
    list,
}) => {

    const openURl = url => {
        return () => window.open(url, '_blank')
    }

    return (
        <React.Fragment>
            <Block.BlockContainerList>
                {

                    list.map( el => {
                        return (
                            
                            <Block.ItemList
                                key={el.id}
                                el = { el }
                            >
                                {
                                    el.can_click?.status?
                                        <Link 
                                            to={ `${localPath}${el.slug}`}
                                            state={{
                                                action_page_id: el.action_page_id,
                                                url: window.location.href.split('/').pop(),
                                                type: el.additional_info,
                                                name_button: el.text, 
                                                url_redirect: el.url
                                            }}
                                            onClick={() => {                                                               
                                                
                                                dispatch('setItemMenu', el.id)
                                                dispatch('context',{})
                                                return el.id === 30 || el.id === 6?
                                                                openURl(el.url)
                                                                        : el.slug ? dispatch('setActiveHeaderText', true) : dispatch('setActiveHeaderText', false)}
                                            }
                                        >
                                            <Icon
                                                image={el.image}
                                                width={50}
                                                height={45}
                                                className={style['menu__items-image']}

                                            />
                                            
                                            <Block.ItemName 
                                                name={el.text}
                                            />                                   

                                        </Link>
                                        : <div                                             
                                            onClick={() => {                                                
                                                dispatch('setMessagePopup', el.can_click?.message? el.can_click?.message : '');
                                                dispatch('setItemMenu', 31  )
                                                if(el?.can_click?.redirect_payment){
                                                    return navigate('/button_my_profile', {state: {
                                                        name_button: 'мой профиль'
                                                    }});
                                                }
                                                return true;
                                                }
                                            }                                            
                                        >
                                            <span
                                                className={classNames({
                                                    [style['menu__items-attent']]: true,
                                                    [style['menu__items-attent--show']]: el?.can_click?.redirect_payment,
                                                })}
                                            >
                                                ❗
                                            </span>
                                            <Icon
                                                image={el.image}
                                                width={50}
                                                height={45}
                                                className={style['menu__items-image']}

                                            />
                                            
                                            <Block.ItemName 
                                                name={el.text}
                                            />                                   

                                        </div>

                                }
                            </Block.ItemList>
                        )
                    })
                }
            </Block.BlockContainerList>
        </React.Fragment>
    )
}

export default ListMainButtonMain;