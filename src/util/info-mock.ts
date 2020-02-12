export interface InfoInterface {
    msrp: number,
    vehicleName: string,
    dealerName: string,
    dealerPhoneNumber: string,
    dealerRating: number
}

const info: InfoInterface = {
    msrp: 100000,
    vehicleName: 'Tesla Model S',
    dealerName: 'Canoga Park-Topanga Tesla Dealership',
    dealerPhoneNumber: '(818) 703-0271',
    dealerRating: 4.3
}

function getInfo(): Promise<InfoInterface> {
    return Promise.resolve(info);
}


export default getInfo;
