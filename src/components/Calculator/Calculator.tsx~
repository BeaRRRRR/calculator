import * as React from 'react';
import { useState, useEffect } from 'react'
import Loan from './components/Loan/Loan';
import Lease from './components/Lease/Lease';
import './Calculator.scss';

export interface CalculatorProps {
    msrp: number,
    setMontlyPayment: Function,
    postCode: string,
    setPostCode: Function
}

function Calculator({ msrp, setMontlyPayment, postCode, setPostCode }: CalculatorProps) {
    const [tab, setTab]: [string, Function] = useState('Loan');

    const [loanPrice, setLoanPrice]: [number, Function] = useState(0);
    const [leasePrice, setLeasePrice]: [number, Function] = useState(0);

    const [term, setTerm]: [number, Function] = useState(12)
    const [creditScore, setCreditScore]: [number, Function] = useState(750);
    const [downPayment, setDownPayment]: [number, Function] = useState(0);
    const [tradeIn, setTradeIn]: [number, Function] = useState(0);
    const [apr, setApr]: [number, Function] = useState(0);
    const [mileage, setMileage]: [number, Function] = useState(12000);


    function changeTab(newTab: string) {
        setTab(newTab);
        if (newTab === 'Loan') setMontlyPayment(loanPrice);
        else setMontlyPayment(leasePrice);
    }

    useEffect(() => {
        setMontlyPayment(leasePrice);
    }, [leasePrice]);


    useEffect(() => {
        setMontlyPayment(loanPrice);
    }, [loanPrice]);


    return (
        <div className="Calculator">
            <div className="tabs">
                <button className={`tab ${tab === 'Loan' ? 'active' : ''}`} onClick={changeTab.bind(null, 'Loan')}>Loan</button>
                <button className={`tab ${tab === 'Lease' ? 'active' : ''}`} onClick={changeTab.bind(null, 'Lease')}>Lease</button>
            </div>
            <div className="payment">
                <div className="estimated">
                    <p>Loan Payment</p>
                    <strong>${loanPrice.toFixed(2)}</strong>
                    /mo
                </div>
                <div className="car-price">
                    <p>Lease Price</p>
                    <strong>${leasePrice.toFixed(2)}</strong>
                    /mo
                </div>
            </div>
            <div className="form">
                {tab === 'Loan'
                    ? <Loan
                        msrp={msrp}
                        setLoanPrice={setLoanPrice}
                        postCode={postCode}
                        setPostCode={setPostCode}
                        term={term}
                        setTerm={setTerm}
                        creditScore={creditScore}
                        setCreditScore={setCreditScore}
                        downPayment={downPayment}
                        setDownPayment={setDownPayment}
                        tradeIn={tradeIn}
                        setTradeIn={setTradeIn}
                        apr={apr}
                        setApr={setApr}
                    />
                    : <Lease
                        msrp={msrp}
                        setLeasePrice={setLeasePrice}
                        postCode={postCode}
                        setPostCode={setPostCode}
                        term={term}
                        setTerm={setTerm}
                        creditScore={creditScore}
                        setCreditScore={setCreditScore}
                        downPayment={downPayment}
                        setDownPayment={setDownPayment}
                        tradeIn={tradeIn}
                        setTradeIn={setTradeIn}
                        mileage={mileage}
                        setMileage={setMileage}
                    />
                }
            </div>
        </div>
    );
}


export default Calculator;
