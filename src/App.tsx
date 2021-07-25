import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import {
    allCustomerPath,
    customerPath,
    dealerPath,
    employeesPath,
    franchisePath,
    loginPath,
    newCustomerPath,
    publicQueryPath,
    queryPath,
    statisticPath,
} from "Constant";
import HomePage from "Pages/HomePage";
import Dashboard from "Pages/Dashboard";
import NewCustomer from "Pages/NewCustomer";
import { QueryClient, QueryClientProvider } from "react-query";
import PublicQuery from "Pages/PublicQuery";

const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Route path={loginPath} exact component={HomePage} />
                <Route path={allCustomerPath} exact component={Dashboard} />
                <Route path={newCustomerPath} exact component={NewCustomer} />
                <Route path={publicQueryPath} exact component={PublicQuery} />
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
