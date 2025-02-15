import {cryptoData, cryptoAssets} from "./data.js";

export function noFetchCrypto(){
    return new Promise(
        (resolve) =>{
            setTimeout(() =>{
                resolve(cryptoData)
            },1)
        }
    )
}
export function noFetchAssets(){
    return new Promise(
        (resolve) =>{
            setTimeout(() =>{
                resolve(cryptoAssets)
            },1)
        }
    )
}

//Делаю так потому что колическтво запросов к сайту, на коттором можно брать актуальные данные ограничено