import React from 'react';
import Icon from '../Icon/Icon';
import ImageUpload from './ImageUpload/ImageUpload'

import style from './styles/uploadimage.module.scss';
/**
 * uploadFiles - setFieldValue('uploadFiles', files);
 *  
 * @param {
 *  uploadFiles
 *  label
 *  values
 * 
 * *} param0 
 * @returns 
 */
const FormUploadImage = ({ 
  multiple,
  values, 
  setFieldValue,
  styleIcon,
  label,
  onClick,
  callback = () =>{},
  image,
}) => {
  const fileInputRef = React.useRef(null);

  return (
    <div className={style['upload-image__form-upload']}>
      <p className={style['upload-image__form-upload-desc']}>
        {/* <Text text={'photo.or.video'} />: */}
        {label}
      </p>
      <ImageUpload
        setFieldValue={(e)=>console.log({e})}//?! необходимо допилить сброс изображения
      >
        {({ preview, onSelectFile, selectedFile, onSelectFiles, isDragActive, getRootProps }) => {
          if (!Array.isArray(preview)) {            
            preview = [preview];
          }

          return (
            <>
              <ul className={style['upload-image__form-upload-list']}>
                {
                  preview.map((el, i) => {
                    return (
                      <li key={i} className={style['upload-image__form-upload-item']}>
                        <img
                          crossOrigin="anonymous"
                          className={style['upload-image__form-upload-image']}
                          src={el}
                        />
                      </li>
                    );
                  })
                }
              </ul>
              <div 
                // {...getRootProps()} 
                className={style['upload-image__form-addprod-image']}
              >
                <div className={style['upload-image__form-addprod-image-wrap']}>
                  <div 
                    className={style['upload-image__form-upload-button']}
                  >
                      {
                        image?
                        <Icon
                                            image={image}
                                            width={15}
                                            height={15}
                                            // className={styleIcon}
                                            className={style['upload-image__form-icon']}
                                        />
                        :<label
                        className={style['upload-image__form-label']}
                        >📎 выбрать</label>
                      }

                    <input
                      multiple={ !!multiple }
                      ref={fileInputRef}
                      style={{opacity: 0}}
                      id="image"
                      type="file"
                      accept=".png, .jpg, .jpeg, .mp4"
                      name={'image'}
                      onClick={onClick}
                      onChange={(e) => {
                        const files = e.currentTarget.files;
                        onSelectFiles(files);
                        setFieldValue('uploadFiles', files);
                        if(files.length) callback(files);
                      }}
                    />
                    </div>
                </div>
              </div>
            </>
          );
        }}
      </ImageUpload>
    </div>
  );
};

export default React.memo(FormUploadImage);
