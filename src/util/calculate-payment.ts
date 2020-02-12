export async function calculateLeasePayment(
    creditScore: number,
    msrp: number,
    tradeIn: number,
    downPayment: number,
    mileage: number,
    term: number
): Promise<number> {
    let creditScoreValue: number;
    if (creditScore >= 750) creditScoreValue = 0.95;
    else if (creditScore >= 700) creditScoreValue = 1;
    else if (creditScore >= 640) creditScoreValue = 1.05;
    else creditScoreValue = 1.2;
    const result = (msrp - tradeIn - downPayment) * mileage / 10000 / term * creditScoreValue;
    return Promise.resolve(result);
}

export async function calculateLoanPayment(
    creditScore: number,
    msrp: number, tradeIn: number,
    downPayment: number,
    term: number,
    apr: number
): Promise<number> {
    let creditScoreValue: number;
    if (creditScore >= 750) creditScoreValue = 0.95;
    else if (creditScore >= 700) creditScoreValue = 1;
    else if (creditScore >= 640) creditScoreValue = 1.05;
    else creditScoreValue = 1.2;
    const result = (msrp - tradeIn - downPayment) / term * (creditScoreValue * (apr !== 0 ? (apr / 100) : 1));
    return Promise.resolve(result);
}



