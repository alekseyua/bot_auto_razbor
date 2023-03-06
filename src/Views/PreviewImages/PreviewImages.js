import React, { useEffect, useState } from "react";
import { bascket, pencil } from "../../images";
import Icon from "../Icon/Icon";
import FormUploadImage from "../UploadImage/FormUploadImage";

import style from './styles/previewImages.module.scss';

const PreviewImages = ({
    list = [],
    // editImage = () => {},
    deleteImage = () => {},
}) => {
    const [ valueImage, setValueImage ] = useState(null);
    const [ valueId, setValueId ] = useState(null);
//     const hendlerSelectImage = ( key = 'image', value ) => {
//         const obj = {
//             'uploadFiles' : value
//         }
//         setValueImage(obj);
//     }
    
//     useEffect(()=>{
//         if(valueId && valueImage)
//            return editImage( valueId, valueImage);
//         return
//     },[valueId, valueImage])

    return (
        <React.Fragment>
            <div
                className={style['block__preview-contaiver-image']}
            >
                <ul
                    className={style['block__preview-wrap-list-image']}
                >
                    {
                        list.map( image => {

                            return(
                                <li
                                    key={image.id}
                                    className={style['block__preview-wrap-image']}
                                >
                                    <Icon 
                                        image={image.url}
                                        width={130}
                                        height={180}
                                        className={style['block__preview-image']}
                                    />
                                   {/* кнопки удаления и редактирования без действия */}
                                   {/* <div
                                       className={style['block__preview-image--edit']}
                                       onClick={ () => setValueId(image.id) }//editImage(image.id, valueImage)} 
                                   >
                                        <FormUploadImage
                                            
                                            values = {image.id}
                                            setFieldValue = { hendlerSelectImage }
                                            label={''}
                                            image={pencil}
                                            styleIcon={style['block__preview-image']}
                                        />                                        
                                    </div> */}
                                    <div
                                        className={style['block__preview-image--delete']}
                                        onClick={ () => deleteImage(image.id)}
                                    >
                                        <Icon
                                            className={style['block__preview-image']}
                                            image={bascket}
                                            width={15}
                                            height={15}
                                        />
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </React.Fragment>
    )
}

export default PreviewImages;