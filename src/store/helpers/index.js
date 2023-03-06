export const helpers = store => {

    store.on('@init', ()=>({activeBackMenu: false}));
    store.on('setActiveHeaderText', ({activeBackMenu}, obj)=>({activeBackMenu: obj}));
    
    store.on('@init', ()=>({textHeader: ''}));
    store.on('setTextHeader', ( { textHeader }, obj ) => ({ textHeader: obj } ));
    
    store.on('@init', ()=>({tg: window.Telegram.WebApp}));
  
    store.on('@init', ()=>({selectItemMenu: 999}))
    store.on('setItemMenu', ({selectItemMenu}, obj, {dispatch}) => ({selectItemMenu: obj}));
  
    store.on('@init', ()=>({messagePopup: null}))
    store.on('setMessagePopup', ({messagePopup}, obj, {dispatch}) => ({messagePopup: obj}));

}