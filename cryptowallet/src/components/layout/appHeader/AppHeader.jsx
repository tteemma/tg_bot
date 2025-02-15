import {Button, Drawer, Layout, Modal, Select, Space} from "antd";
import {useCrypto} from "../../../context/CryptoContext.jsx";
import {useEffect, useState} from "react";
import CoinInfoModal from "../../coinInfoModal/CoinInfoModal.jsx";
import CoinInfoDrawer from "../../coinInfoDrawer/CoinInfoDrawer.jsx";

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: "space-between",
    alignItems: 'center',
};


export default function AppHeader() {

    const [select, setSelect] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [coin, setCoin] = useState(null)
    const [drawer, setDrawer] = useState(false)

    const {crypto} = useCrypto()

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleSelect = (value) => {
        console.log(value);
        const selectedCoin = crypto.find((coin) => coin.id === value)
        setCoin(selectedCoin)
        showModal()
    }


    useEffect(() => {
        function keypress(event) {
            if (event.key === '/') {
                setSelect((prev) => !prev)
            }
        }

        document.addEventListener('keypress', keypress)
        return () => document.removeEventListener('keypress', keypress)

    }, []);

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{width: '23.5%'}}
                value={"PRESS '/' TO OPEN"}
                open={select}
                onSelect={handleSelect}
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/>{option.data.label}
                    </Space>
                )}
            />

            <Button type="primary" onClick={() => setDrawer(true)}>
                Add Crypto
            </Button>

            <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
                <CoinInfoModal coin={coin}/>
            </Modal>

            <Drawer
                title="Add Crypto"
                onClose={() => {
                    setDrawer(false)
                }}
                open={drawer}
                width={500}
                destroyOnClose
            >
                <CoinInfoDrawer onClose={() => setDrawer(false)}/>
            </Drawer>
        </Layout.Header>
    )
}
