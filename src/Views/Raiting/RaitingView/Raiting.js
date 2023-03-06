import React from 'react';

import style from './styles/raiting.module.scss';
import classNames from 'classnames';
import { ratingStar } from '../../../images';
import Icon from '../../Icon/Icon';

/**
   * values Raiting
   * @param {
   * onChange - при клике по звёздам меняит их состояние
 *  ActiveStar: Number = {4} количество активных звёзд
 *  max=5: Number = {5} - общее количество звёзд в рейтинге
 *  label: String = 'какойто текст после иконки' - добавляем блок с текстом
 *  countRaiting: Number - количество отзывав
 * }
 * 
 * @return
 * 
 */

const Raiting = ({
    max = 5, 
    ActiveStar, 
    label, 
    countRaiting, 
    className, 
    onChange, 
    sizeStarWidth = 20,
    sizeStarHeight = 20,
    ...props})=>{
    const stars = Array.from({length: max}).map((_,i)=>i+1);
    const styles = classNames({
        [className]: !!className,
        [style['raiting-star__container']]: true,
    })
    return(
        <div
            className={styles}
        >
                {
                    stars.map((el,i)=>{
                        return (
                            <div 
                                key={`raiting-${i}`}
                                value={i}
                                onClick={onChange}
                                className={style['raiting-star__star']} 
                            >
                                <Icon 
                                    value={i+1}
                                    image={ratingStar} 
                                    invert={ i < ActiveStar? '0%' : '45%' } 
                                    opacity={ i < ActiveStar? '100%' : '20%' } 
                                    brightness={ i < ActiveStar? '100%' : '150%' } 
                                    width = {sizeStarWidth} 
                                    height={sizeStarHeight} 
                                />
                            </div>
                        )
                    })
                }
                {
                    !!label?
                        <div 
                            className={style['raiting-star__label']}
                        >
                            ({ !!countRaiting? countRaiting : 0 }) {' '} { label } 
                        </div>
                            : null
                    }
        </div>
    )
}

export default Raiting;