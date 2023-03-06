import qs from "query-string";

const Api = {
    hostname: 'https://botrazbor.ru/telegram', 
    get : async function(url, params){

        const res = await fetch(`${this.hostname}${url}?${qs.stringify(params)}`,{    
            method: 'GET',    
            withCredentials: true,    
            crossorigin: true,    
            mode: 'cors',       
          });
          return await res.json();
    }, 
    post : async function(url, params){

        const res = await fetch(`${this.hostname}${url}`,{    
            method: 'POST',    
            withCredentials: true,    
            crossorigin: true,
            mode: 'cors',
            body: params
          });

          const result = await res.json();
        return result;
    }, 

    delete : async function(url, params){
      const res = await fetch(`${this.hostname}${url}`,{    
        method: 'DELETE',    
        withCredentials: true,    
        crossorigin: true,
        headers: {
          'Content-Type': `application/json`
        },
        mode: 'cors',
        body: JSON.stringify(params),
        // body: params
      });

        const result = await res.json();
      return result;
  }, 
}

export default Api;