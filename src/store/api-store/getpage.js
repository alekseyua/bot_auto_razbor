import Api from "../../api";
import { setDataButtonBotton } from "../../helpers";

export const getPage = store => {

    const postDataCreate = async (url, params = {}, tg) => {
        try {
            tg.MainButton.showProgress()
            tg.MainButton.disable()
            let chatId = tg.initDataUnsafe;
            const userId = chatId?.user?.id  ?? 1797304609;
            const user = chatId?.user;
            const first_name = user?.first_name;
            const last_name = user?.last_name;
            const username = user?.username;
            const fdPayments = new FormData();

            if (params?.uploadFiles) {
                for (let i = 0; i < params.uploadFiles.length; i++) {
                    fdPayments.append("image", params.uploadFiles[i]);
                }
            }

            params = {
                ...params,
                telegram_id: userId,
                first_name: first_name,
                last_name: last_name,
                username: username
            }
            delete params['url'];
            delete params['setFieldValue'];
            delete params['uploadFiles'];
            delete params['redirectTo'];
            delete params['optionsCountry'];
            delete params['optionsBrand'];
            delete params['optionsModel'];
            delete params['optionsGeneration'];
            delete params['optionsCities'];
            delete params['confirmShow'];
            delete params['dataRequst'];
            delete params['setIsLoading']

            for (let key in params) {
                fdPayments.set(`${key}`, params[key]);
            }
            const res = await Api.post(url, fdPayments);
            tg.MainButton.hideProgress() // скрыть прогрес бар
            setDataButtonBotton(false, tg);
            return res;

        } catch (err) {
            tg.MainButton.hideProgress() // скрыть прогрес бар
            setDataButtonBotton(false, tg);
            return {
                message: 'ошибка в POST запросе', //'произошла ошибка на сервере',
                colorMesage: '#ff0000'
            }
        }
    }
    const deleteData = async (url, params = {}) => {
        let tg = await window.Telegram.WebApp;
        let chatId = tg.initDataUnsafe;
        const userId = 1797304609;//chatId?.user?.id  //
        const user = chatId?.user;
        const first_name = user?.first_name;
        const last_name = user?.last_name;
        const username = user?.username;
        delete params['setIsLoading']
        params = {
            ...params,
            // userId: userId,
            telegram_id: userId,
            first_name: first_name,
            last_name: last_name,
            username: username
        }
        const res = await Api.delete(url, params)
        return res;
    }

    const addReviewPost = async (url, params = {}, tg) => {

        try {
            tg.MainButton.showProgress()
            tg.MainButton.disable()
            let chatId = tg.initDataUnsafe;
            const userId = chatId?.user?.id ?? 1797304609;//chatId?.user?.id  //
            const fdPayments = new FormData();
            delete params['setIsLoading']

            params = {
                ...params,
                telegram_id: userId,
            }
            for (let key in params) {
                fdPayments.set(`${key}`, params[key]);
            }
            const res = await Api.post(url, fdPayments);
            tg.MainButton.hideProgress() // скрыть прогрес бар
            setDataButtonBotton(false, tg);
            return res;
        } catch (err) {
            console.log(err);
            tg.MainButton.hideProgress() // скрыть прогрес бар
            setDataButtonBotton(false, tg);
            return {
                status: JSON.stringify(params, null, 4), //'произошла ошибка на сервере',
                colorMesage: '#ff0000'
            }
        }
    }
    const getDataSearch = async (url, params = {}) => {
        let tg = await window.Telegram.WebApp;
        await tg.ready() // метод позволяет отследить, когда приложение готово к отображению.
        // let chatId = tg.initDataUnsafe;
        // const userId = chatId?.user?.id ?? 1797304609;//chatId?.user?.id  //
        delete params['setIsLoading']
        params = {
            ...params,
            // telegram_id: userId,
        }
        const res = await Api.get(url, params)
        return res;
    }
    const getDataPage = async (url, params = {}) => {
        let tg = await window.Telegram.WebApp;
        await tg.ready() // метод позволяет отследить, когда приложение готово к отображению.
        let chatId = tg.initDataUnsafe;
        // const colorScheme = tg?.colorScheme;
        // const colorScheme = 'dark';
        // const themeParams = tg?.themeParams;
        // const bg_color = themeParams.bg_color || '#191c21';
        const userId = chatId?.user?.id ?? 1797304609;
        const user = chatId?.user;
        const first_name = user?.first_name;
        const last_name = user?.last_name;
        const username = user?.username;

        window.initDataUnsafe = tg.initDataUnsafe

        delete params['setIsLoading']
        params = {
            ...params,
            // userId: userId,
            telegram_id: userId,
            first_name: first_name,
            last_name: last_name,
            username: username
        }
        const res = await Api.get(url, params)
        return res;
    }

    store.on('@init', () => ({ getContext: {} }));
    store.on('context', (_, data) => ({ getContext: data }))
    store.on('@init', () => ({ menu: {} }))
    store.on('menu', ({ menu }, data) => ({ menu: { ...menu, ...data } }))
    store.on('setMenu', async ({ menu }, data = {}, { dispatch }) => {
        if (typeof data?.setIsLoading === 'function') data?.setIsLoading(true);
        const result = await getDataPage('/api_get_page/', data);
        if (typeof data?.setIsLoading === 'function') data?.setIsLoading(false);
        const paramsMenu = {
            ...menu,
            content: result
        }
        dispatch('menu', paramsMenu)
    });

    store.on('setDataEditRequest', async ({ tg }, data, { dispatch }) => {
        let errMessage = ''
        try {
            // uploadFiles: null,
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(true);;;
            const result = await postDataCreate(data.url, data, tg);
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(false);
            errMessage = result;
            data.redirectTo({
                textMessage: result?.status ?? "Ваши изменения приняты, приятных покупок!",
                colorMessage: result?.colorMesage ?? "#00e837"
            });
        } catch (err) {
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(false);
            console.log(err)
            data.redirectTo({
                textMessage: errMessage?.status ?? 'УПС...! что то пошло не так, в POST запросе, сообщите Вашему менеджеру',
                colorMessage: "#ff0000"
            });
        }
    });

    store.on('setDataCreateRequest', async ({ tg }, data, { dispatch }) => {
        let errMessage = ''
        try {
            if (typeof data?.setFieldValue === 'function') {
                data?.setFieldValue('text', '')
                data?.setFieldValue('brand_id', '')
                data?.setFieldValue('model_id', '')
                data?.setFieldValue('generation_id', '')
            }
            // uploadFiles: null,

            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(true);
            const result = await postDataCreate(data.url, data, tg);
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(false);
            errMessage = result;

            data?.dataRequst({
                result,
                type: data.type
            })
            data.redirectTo({
                textMessage: result?.error ?? result?.message ?? "Ваша заявка принята, приятных покупок!",
                colorMessage: result?.status === false ? '#ff0000' : "#00e837"
            });
        } catch (err) {
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(false);
            console.log(err)
            data.redirectTo({
                textMessage: errMessage?.message ?? 'УПС...! что то пошло не так, в GET запросе, сообщите Вашему менеджеру',
                colorMessage: "#ff0000"
            });
        }
    });

    store.on('setListApplications', async (_, data, { dispatch }) => {
        try {
            let newData = { ...data };
            delete newData['dataRequst'];
            // delete newData['page_id'];
            delete newData['url'];

            if (!data.url) return
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(true);
            const result = await getDataPage(data.url, newData);
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(false);
            data.dataRequst({
                result,
                type: data.type
            });

        } catch (err) {
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(false);
            console.log(err)
        }
    });
    store.on('callbackArrowBack', async ({ tg }, data, { dispatch }) => {
        try {

        } catch (err) {
            console.log(err)
        }
    });

    store.on('deleteApplicationId', async (_, data, { dispatch }) => {
        try {
            let newData = { ...data };
            delete newData['dataRequst'];
            // delete newData['page_id'];
            delete newData['url'];

            if (!data.url) return
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(true);
            const result = await deleteData(data.url, newData);
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(false);
            data.dataRequst({
                result,
                type: data.type
            });

        } catch (err) {
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(false);
            console.log(err)
        }
    });

    store.on('getContextSearch', async (_, data, { dispatch }) => {
        try {
            let newData = { ...data };
            delete newData['dataRequst'];
            delete newData['url'];
            if (!data.url) return
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(true);
            const result = await getDataSearch(data.url, newData);
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(false);
            data.dataRequst({
                result,
            });
        } catch (err) {
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(false);
            console.log(err)
        }
    });
    store.on('addReview', async ({ tg }, data, { dispatch }) => {
        try {
            let newData = { ...data };
            delete newData['dataRequst'];
            delete newData['redirectTo'];
            delete newData['setFieldValue'];
            delete newData['url'];
            if (!data.url) return
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(true);
            const result = await addReviewPost(data.url, newData, tg);
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(false);
            data.redirectTo({
                textMessage: result?.status ?? "Ваш отзыв, приятных покупок!",
                colorMessage: result?.colorMesage ?? "#00e837"
            });
            data.dataRequst({
                result,
            });
        } catch (err) {
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(false);
            console.log(err)
        }
    });
    store.on('setGetContextFilters', async (_, data, { dispatch }) => {
        try {
            let newData = { ...data };
            delete newData['dataRequst'];
            // delete newData['page_id'];
            delete newData['url'];
            if (!data.url) return
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(true);
            const result = await getDataPage(data.url, newData);
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(false);
            data.dataRequst({
                result: result.children,
                type: data.type,
                error: result?.error ?? ''
            });
            dispatch('context', result);
        } catch (err) {
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(false);
            console.log(err)
            data.dataRequst({
                result: [],
                type: data?.type,
                error: err
            });
        }
    });
    store.on('setGetContext', async (_, data, { dispatch }) => {
        try {
            let newData = { ...data };
            delete newData['dataRequst'];
            // delete newData['page_id'];
            delete newData['url'];
            if (!data.url) return
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(true);
            const result = await getDataPage(data.url, newData);
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(false);
            data.dataRequst({
                result,
                type: data.type,
                error: result?.error ?? ''
            });
            dispatch('context', result);
        } catch (err) {
            if (typeof data?.setIsLoading === 'function') data?.setIsLoading(false);
            console.log(err)
            data.dataRequst({
                result: [],
                type: data?.type,
                error: err
            });
        }
    });


}

