import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";

import { OrderServicesIconComp } from "../order/OrderServicesIconComp";

export const OperatorServicesIconResumeComp = observer((props) => {
    /*
    Variables
    */
    const [lstServices, setLstServices] = useState([]);
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
        handleResumeServices(props.services);
    };

    const handleResumeServices = (services) => {
        setLstServices(props.services);
        if (services) {
            let mapServicesAux = new Map();
            services.map((servi) => {
                let keyX = servi.jdeServiceType;
                let isPending = servi.status !== "COMPLETADO";
                let objectX = mapServicesAux.get(keyX);
                let countX = objectX ? objectX : 0;
                mapServicesAux.set(keyX, isPending ? countX + 1 : countX);
            });

            setMapServices(mapServicesAux);
        }
    };

    let resumeIconComp =
        mapServices && mapServices.size > 0
            ? [...mapServices.keys()].map((keyX) => {
                  let valueX = mapServices.get(keyX);
                  return (
                      <div key={keyX}>
                          <OrderServicesIconComp serviceType={keyX} badgeNumber={valueX ? valueX : 0} statusService={lstServices.map((key) => (key.jdeServiceType === keyX && key.jdeStatusCode !== undefined ? key.jdeStatusCode + " - " : ""))}></OrderServicesIconComp>
                      </div>
                  );
              })
            : "";

    /*
    Return
    */
    return <>{resumeIconComp}</>;
});
