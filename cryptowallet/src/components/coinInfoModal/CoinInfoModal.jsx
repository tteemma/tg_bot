import {Flex, Typography, Divider, Tag} from "antd";
import CoinInfo from "../coinInfo/CoinInfo.jsx";

export default function CoinInfoModal({coin}) {
    return (
        <>
            <CoinInfo coin={coin} withSymbol={true}/>
            <Divider/>
            <Typography.Paragraph>
                <Typography.Text strong>1 hour:</Typography.Text>
                <Tag style={{marginLeft: 5}}
                     color={(coin.priceChange1h > 0) ? "green" : "red"}>{coin.priceChange1h} %</Tag>
                <Typography.Text strong>1 day:</Typography.Text>
                <Tag style={{marginLeft: 5}}
                     color={(coin.priceChange1d > 0) ? "green" : "red"}>{coin.priceChange1d} %</Tag>
                <Typography.Text strong>1 week:</Typography.Text>
                <Tag style={{marginLeft: 5}}
                     color={(coin.priceChange1w > 0) ? "green" : "red"}>{coin.priceChange1w} %</Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Price: </Typography.Text>
                <Tag style={{marginLeft: 5}} color={(coin.price > 0) ? "green" : "red"}>{coin.price.toFixed(2)}$</Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Price BTC: </Typography.Text>
                <Tag style={{marginLeft: 5}}>{coin.priceBtc.toFixed(2)}B</Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Market Cap: </Typography.Text>
                <Tag style={{marginLeft: 5}}>{coin.marketCap}</Tag>
            </Typography.Paragraph>
            {coin.contractAddress && <Typography.Paragraph>
                <Typography.Text strong>Contract Address: </Typography.Text>
                <Tag>{coin.contractAddress}</Tag>
            </Typography.Paragraph>
            }
        </>
    )
}

