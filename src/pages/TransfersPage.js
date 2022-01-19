import React, { Component } from "react";

import { TransfersComp } from "../components/transfer/TransfersComp";

export class TransfersPage extends Component {
    constructor(props) {
        super(props);
    }

    /*
  Methods
  */
    render() {
        return (
            <div className="p-grid p-fluid">
                <TransfersComp />
            </div>
        );
    }
}
