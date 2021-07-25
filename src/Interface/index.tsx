import React from "react";

export default interface ICustomerData {
    customer_id: string;
    name: string;
    car_number: string;
    area: string;
    expiry_date: string;
    puc_status: boolean;
    phone_number: string;
    dealer: number;
    employee: number;
    franchise: number;
    vehical_front_photo: string;
    vehical_back_photo: string;
    status: string;
}

export interface IQuery {
    id: string;
    name: string;
    phone_number: string;
    date: string;
    query_status: string;
    query: string;
}
