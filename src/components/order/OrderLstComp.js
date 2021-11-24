import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
//import { computed } from "mobx";

// Prime components
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

// Services
import OrderDataService from "../../service/OrderDataService";
import { OrderShowComp } from "./OrderShowComp";
import { OrderServicesResumeComp } from "./OrderServicesResumeComp";

export const OrderLstComp = observer((props) => {
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
        console.log("props.selStore", props.selStore);
        if (props.selStore) {
            OrderDataService.queryOrdersByStore(props.selStore).then((valid) => {
                console.log("handleQueryOrders:", valid);
                if (valid.data && valid.data.success) {
                    setLstOrders(valid.data.obj);
                }
            });
        }
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

    let orderShowComp =
        lstOrders && lstOrders.length > 0
            ? lstOrders.map((orderX, key) => {
                  return (
                      <div key={orderX.jdeOrderId} className="card">
                          <OrderShowComp selOrder={orderX} />
                          <OrderServicesResumeComp serviceType={"CORTE"} badgeNumber={0} />
                          <OrderServicesResumeComp serviceType={"RUTEADO"} badgeNumber={3} />
                          <OrderServicesResumeComp serviceType={"LAMINADO"} badgeNumber={2} />
                      </div>
                  );
              })
            : "";

    /*
  Return
  */
    return (
        <div className="p-fluid p-grid">
            <Card title="Lista de órdenes pendientes">
                <div>{orderShowComp}</div>
            </Card>
        </div>
    );
});
