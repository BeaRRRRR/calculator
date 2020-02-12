import * as React from 'react';
import { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import Calculator from '../Calculator/Calculator';
import Info from '../Info/Info';
import getInfo, { InfoInterface } from '../../util/info-mock';
import './App.scss';

function App() {
    const [info, setInfo]: [InfoInterface, Function] = useState({} as InfoInterface);
    const [monthlyPayment, setMonthlyPayment]: [number, Function] = useState(0);
    const [postCode, setPostCode]: [string, Function] = useState(localStorage.getItem('postCode') || '00000');
    const [isLoading, setIsLoading]: [boolean, Function] = useState(true);

    async function fetchInfo() {
        function sleep(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        const newInfo = await getInfo();
        setInfo(newInfo);
        await sleep(1000);
        setIsLoading(false);
    }

    useEffect(() => {
        localStorage.setItem('postCode', postCode);
    }, [postCode])

    useEffect(() => {
        fetchInfo();
    }, [])


    if (isLoading) {
        console.log('loading');
        return (
            <div className="spinner">
                <ClipLoader size={500} />
            </div>
        );
    }

    return (
        <div className="App">
            <h1>Car loan or lease calculator</h1>
            <main>
                <Calculator
                    msrp={info.msrp}
                    setMontlyPayment={setMonthlyPayment}
                    postCode={postCode}
                    setPostCode={setPostCode}
                />
                <Info
                    info={info}
                    monthlyPayment={monthlyPayment}
                    postCode={postCode}
                />
            </main>
        </div>
    );
}


export default App;
