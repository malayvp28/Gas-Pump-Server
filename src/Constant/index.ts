import React from "react";
import { useHistory } from "react-router-dom";

const baseURL = "http://103.204.189.66:8080/";

export const newCustomerPath = "/admin/newCustomer";
export const statisticPath = "/admin/statistic";
export const allCustomerPath = "/admin/allCustomer";
export const customerInfo = "/admin/customer";
export const loginPath = "/";
export const dealerPath = "/admin/dealer";
export const employeesPath = "/admin/employee";
export const franchisePath = "/admin/franchise";
export const customerPath = "/admin/customer";
export const queryPath = "/admin/query";
export const publicQueryPath = "/query";

export const APP_NAME = "Perfect Services";

export class URLS {
    Adminlogin = `${baseURL}admin/login`;

    customerData = `${baseURL}customer/all`;

    newCustomer = `${baseURL}customer/add`;

    employeeData = `${baseURL}employee/all`;

    saveEmployee = `${baseURL}employee/save`;

    deleteEmployee = `${baseURL}employee/delete`;

    getQuery = `${baseURL}query/get`;

    updateQuery = `${baseURL}query/update/`;

    updateService = `${baseURL}admin/add/service`;
}
export class Message {
    loginSuccessful = "You are Login Successfully";

    customerSaveSuccessful = "Customer added successfully.";

    serviceAdd = "Your Service Updated Successfully !!";
}
export class UserInfo {
    name = "name";

    username = "username";

    phoneNumber = "phone_number";

    id = "admin_id";
}
