import React, { Component } from "react";

import { observer } from "mobx-react";
import { computed } from "mobx";

import { ProductionControlComp } from "../components/ProductionControlComp";

export class ProductionControlPage extends Component {
    constructor(props) {
        super(props);
    }

    /*
  Methods
  */
    render() {
        return <ProductionControlComp DataStore={this.props.DataStore} />;
    }
}

ProductionControlPage = observer(ProductionControlPage, {
    loading: computed,
});

//export default ExamplePage;
