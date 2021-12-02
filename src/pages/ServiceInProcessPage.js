import React, { Component } from "react";

import { observer } from "mobx-react";
import { computed } from "mobx";
import { inject } from "mobx-react";

import { ServicesInProcessComp } from "../components/ServicesInProcessComp";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
//import { InputFloatLabel } from "../components/InputFloatLabel";

export class ServiceInProcessPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value1: "",
        };
    }
    /*
  Methods
  */
    render() {
        return (
            <div className="p-grid p-fluid">
                <ServicesInProcessComp DataStore={this.props.DataStore} />
            </div>
        );
    }
}

ServiceInProcessPage = observer(ServiceInProcessPage, {
    loading: computed,
});

export default inject("DataStore")(ServiceInProcessPage);
