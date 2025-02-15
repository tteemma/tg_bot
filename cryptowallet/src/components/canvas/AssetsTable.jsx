import {Table} from "antd";
import {useCrypto} from "../../context/CryptoContext.jsx";

const columns = [
    {
        title: 'Crypto Coin',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Price, $',
        dataIndex: 'price',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.amount - b.amount,

    },
];

export default function AssetsTable() {
    const {assets} = useCrypto()

    const data = assets.map((asset) => ({
        key: asset.id,
        name: asset.name,
        price: asset.price,
        amount: asset.amount
    }))

    return (
        <div>
            <Table
                columns={columns}
                pagination={{pageSize: 10}}
                dataSource={data}
                scroll={{ y: 500 }} 
            />
        </div>

    )
}