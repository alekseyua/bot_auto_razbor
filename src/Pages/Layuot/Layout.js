import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useStoreon } from "storeon/react";
import Header from "../Header/Header";


const Layout = ({

}) => {
    const { activeBackMenu } = useStoreon('activeBackMenu');
    useEffect(()=>{
        document.querySelector('.goto').scrollIntoView({block:'center', behavior: 'smooth'});
    },[])


    return (
        <div className={'container'}>
            <Header />      
            <main
                className={"main-context"}
                style={{
                    top: activeBackMenu? `0px` : `-50px`
                }}
            >
                <span className="goto"></span>
                <Outlet />
            </main>
            
        </div>
    )
}

export default Layout;