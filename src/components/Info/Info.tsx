import * as React from "react";
import { InfoInterface } from '../../util/info-mock';
import './Info.scss';

export interface InfoProps {
    info: InfoInterface,
    monthlyPayment: number
    postCode: string
}

function Info({ info, monthlyPayment, postCode }: InfoProps) {
    const taxes = postCode.split('').map(num => parseInt(num) * 11);

    return (
        <div className="Info">
            <p className="vehicle-name">Vehicle Name: {info.vehicleName}</p>
            <p className="msrp">MSRP: {info.msrp}</p>
            <p>Est. montly payment: {monthlyPayment.toFixed(2)}</p>
            <p>Taxes: {taxes.join(', ')}</p>
            <p className="dealer-name">Dealer Name: {info.dealerName}</p>
            <p className="dealer-phone-numer">Dealer Phone Number: {info.dealerPhoneNumber}</p>
            <p>Dealer Rating: {info.dealerRating}</p>
        </div>
    );
}


export default Info;
