import React, { Component } from "react";
import { ProductionControlComp } from "../components/ProductionControlComp";

export class ProductionControlPage extends Component {
    constructor(props) {
        super(props);
    }

    /*
  Methods
  */
    render() {
        return (
            <div className="p-grid p-fluid">
                <ProductionControlComp />
            </div>
        );
    }
}

/*
ProductionControlPage = observer(ProductionControlPage, {
    loading: computed,
});


export default inject("DataStore")(ProductionControlPage);
*/
//export default ProductionControlPage;
