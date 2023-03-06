import React from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import Block from "./DetaliBlock";

import style from './styles/listmainbutton.module.scss';

const ListMainButton = ({
    old_name_button,
    localPath,
    dispatch,
    list,
}) => {

    return (
        <React.Fragment>
            <Block.BlockContainerList>
                {

                    list.map( ( el, i ) => {
                        return (                            
                            <Block.ItemList
                                key = { i }
                                el = {el}
                            >
                                <Link
                                    to={`${localPath}${el?.send_type? el.send_type : el.slug}`}
                                    state={{
                                        action_page_id: el.action_page_id,
                                        url: window.location.href.split('/').pop(),
                                        type: el.additional_info,
                                        name_button: el?.value? el.value : el.text, 
                                        url_redirect: el.url,
                                        old_name_button: old_name_button,
                                        dataFilters: el?.children,
                                        type: el?.send_type
                                    }}
                                    onClick={() => el.id === 30?
                                                        window.open(el.url)
                                                        : el.slug ? dispatch('setActiveHeaderText', true) : dispatch('setActiveHeaderText', false)
                                    }
                                >
                                    <Icon
                                        image={el.image}
                                        width={50}
                                        height={50}
                                        className={style['menu__items-image']}

                                    />
                                    
                                    <Block.ItemName 
                                        name={el?.value? el.value : el.text}
                                    />                                   

                                </Link>
                               
                            </Block.ItemList>
                        )
                    })
                }
            </Block.BlockContainerList>
        </React.Fragment>
    )
}

export default ListMainButton;