import * as React from 'react';
import { useEffect, useState } from 'react';
import { calculateLeasePayment } from '../../../../util/calculate-payment';
import { validateDownPayment, validateTradeIn } from '../../../../util/validate';
import './Lease.scss';

export interface LeaseProps {
    msrp: number,
    setLeasePrice: Function,
    postCode: string,
    setPostCode: Function,
    term: number,
    setTerm: Function,
    creditScore: number,
    setCreditScore: Function,
    downPayment: number,
    setDownPayment: Function
    tradeIn: number,
    setTradeIn: Function,
    mileage: number
    setMileage: Function,
}

function Lease({
    msrp,
    setLeasePrice,
    postCode,
    setPostCode,
    term,
    setTerm,
    creditScore,
    setCreditScore,
    downPayment,
    setDownPayment,
    tradeIn,
    setTradeIn,
    mileage,
    setMileage
}: LeaseProps) {
    const [isDownPaymentValid, setDownPaymentValid]: [boolean, Function] = useState(true);
    const [isTradeInValid, setTradeInValid]: [boolean, Function] = useState(true);

    async function setPrice() {
        const price = await calculateLeasePayment(creditScore, msrp, tradeIn, downPayment, mileage, term);
        setLeasePrice(price);
    }

    useEffect(() => {
        if (msrp) setPrice();
    }, [msrp])

    return (
        <div className="Lease">
            <div className="inputs-grid">
                <div className="input-group">
                    <label>
                        <p>Down Payment</p>
                        <span>$</span>
                        <input type="text"
                            defaultValue={0}
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                const value = parseInt(target.value);
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
                            defaultValue={0}
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                const value = parseInt(target.value);
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
                        <select
                            className="selectrow"
                            onClick={(e) => {
                                const target = e.target as HTMLInputElement;
                                if (isNaN(parseInt(target.innerHTML))) {
                                    setTerm(parseInt(target.innerHTML));
                                }
                            }}
                        >
                            <option className={`option ${term === 24 ? 'active' : ''}`} value={24}>24</option>
                            <option className={`option ${term === 36 ? 'active' : ''}`} value={36} >36</option>
                            <option className={`option ${term === 48 ? 'active' : ''}`} value={48} >48</option>
                        </select>
                    </div>
                </div>
                <div className="input-group">
                    <div className="credit-score">
                        <p>Credit Score</p>
                        <select className="button-row"
                            onClick={(e) => {
                                const target = e.target as HTMLInputElement;
                                if (isNaN(parseInt(target.innerHTML))) {
                                    setCreditScore(parseInt(target.innerHTML));
                                }
                            }
                            }>
                            <option className={`option ${creditScore === 600 ? 'active' : ''}`}>600</option>
                            <option className={`option ${creditScore === 650 ? 'active' : ''}`}>650</option>
                            <option className={`option ${creditScore === 700 ? 'active' : ''}`}>700</option>
                            <option className={`option ${creditScore === 750 ? 'active' : ''}`}>750</option>
                        </select>
                    </div>
                </div>
                <div className="input-group">
                    <div className="credit-score">
                        <p>Mileages</p>
                        <select
                            className="select"
                            onClick={(e) => {
                                const target = e.target as HTMLInputElement;
                                if (!isNaN(parseInt(target.innerHTML))) {
                                    setMileage(parseInt(target.innerHTML));
                                }
                            }}
                        >
                            <option className={`option ${mileage === 10000 ? 'active' : ''}`} value={10000}>10000</option>
                            <option className={`option ${mileage === 12000 ? 'active' : ''}`} value={12000} >12000</option>
                            <option className={`option ${mileage === 15000 ? 'active' : ''}`} value={15000} >15000</option>
                        </select>
                    </div>
                </div>


            </div>
            <button className="setPrice" onClick={setPrice}>Calculate</button>
        </div>
    );
}


export default Lease;

