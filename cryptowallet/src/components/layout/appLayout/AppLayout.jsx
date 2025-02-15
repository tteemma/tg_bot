import {Layout, Spin} from "antd";
import AppHeader from "../appHeader/AppHeader.jsx";
import AppSider from "../appSider/AppSider.jsx";
import AppContent from "../appContent/AppContent.jsx";
import {useContext} from "react";
import CryptoContext from "../../../context/CryptoContext.jsx";

export default function AppLayout(){

    const {loading} = useContext(CryptoContext)

    if (loading) {
        return (
            <Spin fullscreen/>
        )
    }

    return(
        <Layout>
            <AppHeader/>
            <Layout>
                <AppSider/>
                <AppContent/>
            </Layout>
        </Layout>
    )
}