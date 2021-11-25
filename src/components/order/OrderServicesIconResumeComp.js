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
        if (selOrder && selOrder.lstOrderDetail && selOrder.lstOrderDetail.length > 0) {
            //console.log("mapServices.size0: ", mapServices.size);
            let mapServicesAux = new Map();
            selOrder.lstOrderDetail.map((detX) => {
                let keyX = detX.product.serviceType;
                //console.log("keyX", keyX);
                let isPending = detX.status !== "COMPLETADO";
                //console.log("isPending", isPending);
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
                  return (
                      <div key={keyX} className="grid">
                          <OrderServicesIconComp serviceType={keyX} badgeNumber={mapServices.get(keyX)} />
                      </div>
                  );
              })
            : "";

    /*
  Return
  */
    return <>{resumeIconComp}</>;
});
