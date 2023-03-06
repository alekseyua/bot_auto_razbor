import React, { useEffect, useState } from "react";
import style from './pagination.module.scss';
/**
 * 
 * @param {
 *  @allCount - всего элементов
 *  @searchCount - количество совподений при поиске
 *  @count - max количество которое показывается или приходит по запросу
 *  @location - ореинтация на странице 'left', 'right', 'center'
 *  @handlerChangePaginations - функция запроса куда бегаем за данными
 *  @currentPage - номер текущей траницы
 * } = props
 * @returns 
 */
const Pagination = ({
    data,
    handlerChangePaginations,
    searchCount = 0,
    currentPage = 1,
    allCount = 0,
    count = 0,
    ...props
}) => {

    const [activeStyle, setActiveStyle] = useState('pagination__item-active');
    const [dinamicLocation, setDinamicLocation] = useState('center');
    const [elItems, setElItems] = useState(currentPage)
    const { } = props;
    let pages = Math.ceil((!!searchCount ? searchCount : allCount) / count);
    const listNumber = new Array(pages).fill('').map((_, i) => i + 1);

    useEffect(() => {
        setElItems(currentPage);
        switch (props.location) {
            case 'left':
                setDinamicLocation('start');
                break;
            case 'right':
                setDinamicLocation('end')
                break;
            default:
                setDinamicLocation('center')
        }
    }, [currentPage])

    useEffect(() => {
        if (searchCount > 0)
            pages = Math.ceil(searchCount / count);
    }, [searchCount])

    const handlerClickItem = (e) => {
        const dataId = +e.target.id;
        setElItems(dataId);
        setActiveStyle('pagination__item-active');
        handlerChangePaginations({
            page: Number(dataId),
            ...data
        })
        const timerSetTimeout = setTimeout(() => {
            document.querySelector('.goto').scrollIntoView({block:'center', behavior: 'smooth'});
            return () => clearTimeout(timerSetTimeout)
        }, 900)
    }

    return (
        <div
            className={style['pagination__container']}
            style={{ justifyContent: dinamicLocation }}
        >
            <div
                className={style['pagination__inner-container']}

            >
                {
                    listNumber.map(el => {
                        return (
                            pages > 1 ?
                                <div
                                    key={el}
                                    id={el}
                                    className={
                                        elItems === el ?
                                            style[activeStyle]
                                            : style['pagination__item']
                                    }
                                    onClick={handlerClickItem}
                                    style={{
                                        display: elItems - 1 === el || elItems - 2 === el || elItems === el || elItems + 1 === el || elItems + 2 === el ? `flex` : `none`
                                    }}
                                >
                                    {el}
                                </div>
                                : null
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Pagination;