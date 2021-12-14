export interface Address {
    addressCode: number;
    userCode: number;
    country: string,
    state: string;
    city: string;
    district: string;
    street: string;
    number: number;
    zipCode: string;
    additionalInformation: string;
    createdAt : Date;
    modifiedAt : Date;
}