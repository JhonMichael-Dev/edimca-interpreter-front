import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
//import { computed } from "mobx";

// Prime components
import { Button } from "primereact/button";

// Services
import ProductDataService from "../../service/ProductDataService";

export const ProductInfoComp = observer((props) => {
    /*
  Variables
  */
    const [product, setProduct] = useState(null);

    /*
  Init
  */
    useEffect(() => {
        handleQueryProductByJdeCode();
    }, []);

    /*
  Context  
  */

    /*
  Formats
  */

    /*
  Methods
  */
    const handleQueryProductByJdeCode = () => {
        if (props.jdeProductCode)
            ProductDataService.queryProductByCode(props.jdeProductCode).then((valid) => {
                //console.log("handleQueryProductByJdeCode", valid);
                if (valid && valid.data.success) {
                    setProduct(valid.data.obj);
                    return valid.data.obj;
                }
            });
    };

    /*
  Inner Components
  */

    /*
  Return
  */
    return (
        <>
            {product ? (
                <div className="grid col-12 ">
                    {props.code ? (
                        <div className="grid col-12 bold" style={{ fontWeight: "bold" }}>
                            {product.code}
                        </div>
                    ) : (
                        ""
                    )}
                    {props.description1 ? <div className="grid col-12">{product.description1}</div> : ""}
                </div>
            ) : (
                ""
            )}
        </>
    );
});
