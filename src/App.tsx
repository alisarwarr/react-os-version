import { useEffect } from "react";
import { check_OS_Version } from "./utils/helpers";


export default function App(): JSX.Element {

    const display_OS = async () => {
        const os = await check_OS_Version();
        alert(JSON.stringify(os));
    }

    useEffect(() => {
        display_OS();
    }, []);

    return (
        <div className="App">
            Hello World
        </div>
    )
}