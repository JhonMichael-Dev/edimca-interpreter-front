import React, { Component } from "react";
import { OrderLstOther } from "../components/order/OrderLstOther.js";
class OtherOrdersPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="p-grid p-fluid">
                <OrderLstOther></OrderLstOther>
            </div>
        );
    }
}

export default OtherOrdersPage;
