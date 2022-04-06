import React, { Component } from "react";
import { OrderLstVLComp } from "../components/order/OrderLstVLComp";
class VlPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="p-grid p-fluid">
                <OrderLstVLComp></OrderLstVLComp>
            </div>
        );
    }
}

export default VlPage;
