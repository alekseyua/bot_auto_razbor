import React, { useEffect, useState } from "react";
import { spinner } from "../../images";
import Icon from "../Icon/Icon";

import style from './styles/spinner.module.scss';


const Spinner = ({
    text = ''
}) => {
    const [newText, setNewText] = useState('');
    let timer = null;
        useEffect(() => {
            // !!text?
                timer = setTimeout(() => {
                    setNewText(text);
                    // return ()=>clearTimeout(timer);
                }, 3000)
            // : null;
        }, [text])

    return (
        <React.Fragment>
            {
                newText ?
                    <div
                        style={{
                            fontSize: '18px'
                        }}
                    >
                        {newText}
                    </div>
                    :
                    <div
                        className={style['spinner__container']}
                    >
                        <Icon
                            width={50}
                            height={50}
                            image={spinner}
                        />
                    </div>
            }
        </React.Fragment>
    )
}

export default Spinner;