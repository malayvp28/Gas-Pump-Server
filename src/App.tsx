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
import Statistics from "Pages/Statistic";
import Dealer from "Pages/Dealer";
import Franchise from "Pages/Franchise";
import Employees from "Pages/Employees";
import { QueryClient, QueryClientProvider } from "react-query";
import Customer from "Pages/Customer";
import Queries from "Pages/Queries";
import PublicQuery from "Pages/PublicQuery";

const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Route path={loginPath} exact component={HomePage} />
                <Route path={allCustomerPath} exact component={Dashboard} />
                <Route path={newCustomerPath} exact component={NewCustomer} />
                <Route path={statisticPath} exact component={Statistics} />
                <Route path={dealerPath} exact component={Dealer} />
                <Route path={franchisePath} exact component={Franchise} />
                <Route path={employeesPath} exact component={Employees} />
                <Route path={customerPath} exact component={Customer} />
                <Route path={queryPath} exact component={Queries} />
                <Route path={publicQueryPath} exact component={PublicQuery} />
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
