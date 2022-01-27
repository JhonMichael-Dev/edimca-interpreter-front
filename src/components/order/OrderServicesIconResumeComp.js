import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";

// Prime components
import { Badge } from "primereact/badge";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { OrderServicesIconComp } from "./OrderServicesIconComp";

// Images
//import iconLostSale from "../../images/ruteadoIcon.png";

// Services
//import OrderDataService from "../service/OrderDataService";

export const OrderServicesIconResumeComp = observer((props) => {
    /*
  Variables
  */
    const [visible, setVisible] = useState(false);
    const [lstOrders, setLstOrders] = useState([]);
    const [mapServices, setMapServices] = useState(new Map());

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
        handleResumeServices(props.selOrder);
    };

    const handleProcess = (ev) => {};

    const handleResumeServices = (selOrder) => {
        setLstOrders(props.selOrder);
        if (selOrder && selOrder.lstOrderDetail && selOrder.lstOrderDetail.length > 0) {
            //console.log("mapServices.size0: ", mapServices.size);
            let mapServicesAux = new Map();

            let lstDetailSortedByServiceType = selOrder.lstOrderDetail.sort((a, b) => a.product.serviceType > b.product.serviceType);

            //selOrder.lstOrderDetail.map((detX) => {
            lstDetailSortedByServiceType.map((detX) => {
                let keyX = detX.product.serviceType;
                let isPending = detX.status !== "COMPLETADO";
                let objectX = mapServicesAux.get(keyX);
                let countX = objectX ? objectX : 0;
                mapServicesAux.set(keyX, isPending ? countX + 1 : countX);
            });

            setMapServices(mapServicesAux);
        }
    };

    /*
  Inner Components
  */
    let resumeIconComp =
        mapServices && mapServices.size > 0
            ? [...mapServices.keys()].map((keyX) => {
                  //console.log("keyX", keyX);
                  //console.log(lstOrders.lstOrderDetail.map((key) => key.product.serviceType === keyX));
                  let valueX = mapServices.get(keyX);
                  return (
                      <div key={keyX}>
                          <OrderServicesIconComp serviceType={keyX} badgeNumber={valueX ? valueX : 0} statusService={lstOrders.lstOrderDetail.map((key) => (key.product.serviceType === keyX && key.statusService !== undefined ? key.statusService + " - " : ""))} />
                      </div>
                  );
              })
            : "";

    /*
  Return
  */
    return <>{resumeIconComp}</>;
});
