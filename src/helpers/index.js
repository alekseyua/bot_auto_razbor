import { color } from "./const";

export const setDataButtonBotton = (
    status = true,
    tg, 
    text='Ruuum', // текст кнопки
    colorText = color.bgc__red,  // цвет текста кнопки
    colorBackground = color.bgc__black // бекграунд кнопки
) => {
    if(status){
        tg.MainButton.enable() // сделать активной 
    }else{
        tg.MainButton.disable()
    }
    tg.MainButton.setParams({
        textColor: colorText,
        text: text,
        color: colorBackground,
    })  
    tg.MainButton.hide() // скрыть кнопку
    tg.MainButton.show() // показать кнопку
}
/**
 * 
 * @param {link web telegrma} tg 
 * @param {values form} values 
 * @param {switch where check} action 
 * @param {text name button} textButton 
 * @param {callback data from request} callback 
 * @param {set data for form } setFieldValue 
 * @returns 
 */
export const activeButtonBootomForConfirm = (
    tg,
    values, 
    action, 
    textButton = 'подтвердить',
    callback = () =>{}, 
    setFieldValue=()=>{}, 
) => {
    const checkValueCondition = (values, tg, action) => {
        switch (action) {
            case 'country-text':
                return values.city_id && values.country_id && !tg.MainButton?.isActive
            case 'text':
                return values.text && !tg.MainButton?.isActive
            case 'username':
                return values.username && !tg.MainButton?.isActive
            case 'searchReview':
                return values.username && !tg.MainButton?.isActive
            case 'review':
                return values.username && values.text && values.star && !tg.MainButton?.isActive
            case 'deleteApplication':
                return !!values.length && !tg.MainButton?.isActive
            case 'search':
                return values.generation_id && values.brand_id && values.model_id && !tg.MainButton?.isActive
            case 'payment':
                return values.access && values.bank && values.period && !tg.MainButton?.isActive
            default:
                return values.text && values.generation_id && values.brand_id && values.model_id && !tg.MainButton?.isActive
        }
    }

    if(checkValueCondition(values, tg, action)){
        const eventHandler = () => {
            // throttle(document.querySelector('.btn-click').click(),1000);
            document.querySelector('.btn-click').click()
            return tg.MainButton.offClick(eventHandler)
        }
        tg.MainButton.onClick(eventHandler)
        setDataButtonBotton(true, tg, textButton, color.bgc__white, color.bgc__blue);                                                        
        return
    }       
}

export const getOptions = data =>{
    let options = [];
if (Array.isArray(data) && data.length) {
        data.map(el => {
           return options.push({
                title: el.name,
                value: el.id || '',
                image: el?.image || ''
            })
        })
    }
    return options;
}
export const getOptionsPayment = data =>{
    let options = [];
if (Array.isArray(data) && data.length) {
        data.map(el => {
           return options.push({
                title: el.value,
                value: el.value || '',
                image: el?.image || '',
                key_value:el.key_value
            })
        })
    }
    return options;
}