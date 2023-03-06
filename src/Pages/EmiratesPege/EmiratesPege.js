import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const EmiratesPege = ({

}) => {
    const { state } = useLocation();

    useEffect( ()=>{
        state?.url_redirect?
            window.open(state.url_redirect)
            : console.log('hi')
    },[state?.url_redirect])

return(
<React.Fragment>
    
</React.Fragment>
)
}
export default EmiratesPege;