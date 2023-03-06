import React from "react";
import { info } from "../../../images";
import Icon from "../../Icon/Icon";
import MessageBlock from '../BlockMessage/MassageContainer';

const Message = ({
    message,
    colorMessage,
    noicon,
}) => {

    return (
        <React.Fragment>
            {
                            message?
                                <MessageBlock>
                                    {
                                        !noicon? 
                                            <Icon image={info} width={15} height={15} mr={5} /> 
                                            : null
                                    }
                                    <p
                                        style={{
                                            color: colorMessage ? colorMessage : '#000'
                                        }}
                                    >

                                        {message}                       
                                    </p>
                                </MessageBlock>
                                : null
                                
                            }
        </React.Fragment>
    )
}

export default Message;