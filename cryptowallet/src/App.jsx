import {CryptoContextProvider} from "./context/CryptoContext.jsx";
import AppLayout from "./components/layout/appLayout/AppLayout.jsx";

export default function App() {
    return (
        <CryptoContextProvider>
            <AppLayout/>
        </CryptoContextProvider>
    )
}
