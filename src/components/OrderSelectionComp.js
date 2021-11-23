import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
//import { computed } from "mobx";

// Prime components
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

// Services
import StoreDataService from "../service/StoreDataService";

export const OrderSelectionComp = observer((props) => {
    /*
  Variables
  */
    const [visible, setVisible] = useState(false);
    const [lstOrders, setLstOrders] = useState([]);

    /*
  Init
  */
    useEffect(() => {
        loadAvailables();
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
    const loadAvailables = () => {
        handleQueryOrders();
    };

    const handleQueryOrders = () => {
        StoreDataService.queryStores().then((valid) => {
            console.log("handleQueryStores:", valid);
            if (valid.data && valid.data.success) {
                setLstOrders(valid.data.obj);
            }
        });
    };

    const handleProcess = (ev) => {};

    /*
  Inner Components
  */
    const showProcessConfirmDialog = () => {
        confirmDialog({
            message: "Seguro desea procesar..",
            header: "Confirmación",
            icon: "pi pi-exclamation-triangle",
            accept: () => handleProcess(null),
            reject: () => setVisible(false),
            acceptLabel: "Procesar",
            acceptIcon: "pi pi-check",
            rejectIcon: "pi pi-times",
        });
    };

    /*
  Return
  */
    return (
        <>
            {!props.rendered ? (
                ""
            ) : (
                <Card title="Lista de órdenes pendientes" style={{ width: "100%", marginBottom: "2em" }}>
                    <p className="p-m-0" style={{ lineHeight: "1.5" }}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                    </p>
                </Card>
            )}
        </>
    );
});
