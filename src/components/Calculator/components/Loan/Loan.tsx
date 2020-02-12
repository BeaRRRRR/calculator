import * as React from 'react';
import { useState, useEffect } from 'react';
import { calculateLoanPayment } from '../../../../util/calculate-payment';
import { validateDownPayment, validateTradeIn, validateApr } from '../../../../util/validate';
import './Loan.scss';

export interface LoanProps {
    msrp: number,
    setLoanPrice: Function,
    setPostCode: Function
    term: number,
    setTerm: Function,
    creditScore: number,
    setCreditScore: Function,
    downPayment: number,
    setDownPayment: Function
    tradeIn: number,
    setTradeIn: Function,
    apr: number,
    setApr: Function,
    postCode: string
}

function Loan({
    msrp,
    setLoanPrice,
    setPostCode,
    term,
    setTerm,
    creditScore,
    setCreditScore,
    downPayment,
    setDownPayment,
    tradeIn,
    setTradeIn,
    apr,
    setApr,
    postCode
}: LoanProps) {
    const [isDownPaymentValid, setDownPaymentValid]: [boolean, Function] = useState(true);
    const [isTradeInValid, setTradeInValid]: [boolean, Function] = useState(true);
    const [isAprValid, setAprValid]: [boolean, Function] = useState(true);

    useEffect(() => {
        if (msrp) setPrice();
    }, [msrp])

    async function setPrice() {
        const price = await calculateLoanPayment(creditScore, msrp, tradeIn, downPayment, term, apr);
        setLoanPrice(price);
    }

    return (
        <div className="Loan">
            <div className="inputs-row">
                <div className="input-group">
                    <label>
                        <p>Down Payment</p>
                        <span>$</span>
                        <input type="text"
                            defaultValue={downPayment}
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                const value = parseInt(target.value) || 0;
                                setDownPayment(value)
                                if (validateDownPayment(value, msrp)) {
                                    setPrice();
                                    setDownPaymentValid(true);
                                }
                                else setDownPaymentValid(false);
                            }
                            }
                        />
                    </label>
                    <p
                        className="validation"
                        style={{ display: isDownPaymentValid ? 'none' : 'block' }}
                    >Down Payment is invalid</p>
                </div>
                <div className="input-group">
                    <label>
                        <p>Trade in</p>
                        <span>$</span>
                        <input type="text"
                            defaultValue={tradeIn}
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                const value = parseInt(target.value) || 0;
                                setTradeIn(value);
                                if (validateTradeIn(value, msrp)) {
                                    setPrice();
                                    setTradeInValid(true);
                                }
                                else setTradeInValid(false);
                            }
                            }
                        />
                    </label>
                    <p
                        className="validation"
                        style={{ display: isTradeInValid ? 'none' : 'block' }}
                    >Trade in is invalid</p>
                </div>
                <div className="input-group">
                    <label>
                        <p>APR</p>
                        <input type="text"
                            defaultValue={apr}
                            min={0}
                            max={100}
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                const value = parseInt(target.value)
                                setApr(value);
                                if (validateApr(value)) {
                                    setPrice();
                                    setAprValid(true);
                                }
                                else setAprValid(false);
                            }
                            }
                        />
                        <span>%</span>
                    </label>
                    <p
                        className="validation"
                        style={{ display: isAprValid ? 'none' : 'block' }}
                    >APR is invalid</p>
                </div>
                <div className="input-group">
                    <label>
                        <p>Post Code</p>
                        <input
                            type="text"
                            placeholder="230009"
                            defaultValue={postCode}
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                setPostCode(target.value)
                            }
                            }
                        />
                    </label>
                </div>
                <div className="input-group">
                    <div className="terms">
                        <p>Terms</p>
                        <div
                            className="button-row"
                            onClick={(e) => {
                                const target = e.target as HTMLInputElement;
                                setTerm(parseInt(target.innerHTML));
                            }}
                        >
                            <button className={`button ${term === 12 ? 'active' : ''}`}>12</button>
                            <button className={`button ${term === 24 ? 'active' : ''}`}>24</button>
                            <button className={`button ${term === 36 ? 'active' : ''}`}>36</button>
                            <button className={`button ${term === 48 ? 'active' : ''}`}>48</button>
                        </div>
                    </div>
                </div>
                <div className="input-group">
                    <div className="credit-score">
                        <p>Credit Score</p>
                        <div className="button-row"
                            onClick={(e) => {
                                const target = e.target as HTMLInputElement;
                                setCreditScore(parseInt(target.innerHTML));
                                setPrice();
                            }
                            }>
                            <button className={`button ${creditScore === 600 ? 'active' : ''}`}>600</button>
                            <button className={`button ${creditScore === 650 ? 'active' : ''}`}>650</button>
                            <button className={`button ${creditScore === 700 ? 'active' : ''}`}>700</button>
                            <button className={`button ${creditScore === 750 ? 'active' : ''}`}>750</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Loan;

