export function validateDownPayment(payment: number, msrp: number): boolean {
    if (payment > (msrp / 4) || payment < 0) return false;
    return true;
}

export function validateTradeIn(tradeIn: number, msrp: number) {
    return validateDownPayment(tradeIn, msrp);
}


export function validateApr(apr: number): boolean {
    if (apr > 0 && apr < 100) return true;
    return false
}





