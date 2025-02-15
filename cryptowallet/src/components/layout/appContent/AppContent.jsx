import {Layout, Typography} from "antd";
import {useCrypto} from "../../../context/CryptoContext.jsx";
import {useMemo} from "react";
import PortfolioCanvas from "../../canvas/PortfolioCanvas.jsx";
import AssetsTable from "../../canvas/AssetsTable.jsx";

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#001529',
};

export default function AppContent() {

    const {crypto, assets} = useCrypto()

    const totalPortfolioValue = useMemo(() => {
        return assets.reduce((acc, asset) => {
            const coin = crypto.find((c) => c.id === asset.id);
            return acc + (coin ? asset.amount * coin.price : 0);
        }, 0);
    }, [crypto, assets]);

    return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level={3} style={{
                textAlign: 'left',
                color: '#fff',
                marginLeft: '20px',
                marginTop: '15px'
            }}>

                Protfolio:{' '}
                {totalPortfolioValue.toFixed(3)}$
            </Typography.Title>
            <PortfolioCanvas/>
            <AssetsTable/>
        </Layout.Content>
    )
}
