import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
//import { computed } from "mobx";

// Prime components
import { Toast } from "primereact/toast";
import moment from "moment";
import { SelectButton } from "primereact/selectbutton";

// Own components
import { StoreSelectionComp } from "../StoreSelectionComp";

// Services
import OrderDataService from "../../service/OrderDataService";
import { LoginPrincipalComp } from "../login/LoginPrincipalComp";
import { useDataStore } from "../../data/DataStoreContext";
import { TransfersLstComp } from "./TransfersLstComp";
import { TransfersLstIncomingComp } from "./TransfersLstIncomingComp";

export const TransfersComp = observer((props) => {
    /*
    Variables
    */
    const [selTransferUser, setSelTransferUser] = useState(null);
    const [lstStoppedOrders, setLstStoppedOrders] = useState([]);
    const [lstIncomingOrders, setLstIncomingOrders] = useState([]);
    const toast = useRef(null);
    //const dt = useRef(null);
    const [selOption, setSelOption] = useState(null);
    const options = ["Ordenes de trabajo paradas", "Órdenes de trabajo recibidas"];

    /*
    Store
    */
    const dataStore = useDataStore();

    /*
    Init
    */
    useEffect(() => {
        loadAvailables();
        loadSelectedOption();
    }, []);

    /*
    Formats
    */

    /*
    Methods
    */
    const loadAvailables = () => {
        queryStoppedOrders();
        queryIncomingOrders();
    };

    const loadSelectedOption = () => {
        setSelOption(selOption ? selOption : null);
    };

    const queryStoppedOrders = () => {
        OrderDataService.queryStoppedOrdersByStore().then((valid) => {
            if (valid.data && valid.data.success) {
                setLstStoppedOrders(valid.data.obj);
            }
        });
    };

    const queryIncomingOrders = () => {
        OrderDataService.queryIncomingOrdersByStore().then((valid) => {
            if (valid.data && valid.data.success) {
                setLstIncomingOrders(valid.data.obj);
            }
        });
    };

    const handleSelectUser = (ev) => {
        dataStore.setAuthPrincipalUser(ev);
        setSelTransferUser(ev);
    };

    const showMessage = (ev) => {
        toast.current.show({
            severity: ev.severity,
            summary: ev.summary,
            detail: ev.message,
            life: (ev.message.length / 10) * 1000,
        });
    };

    const setLoader = async (ev) => {
        if (!ev) await timeout(400);

        dataStore.setLoading(ev);
    };

    function timeout(delay) {
        return new Promise((res) => setTimeout(res, delay));
    }

    const isOption1 = () => {
        return selOption === options[0];
    };

    /*
  Inner components
  */
    let loginPrincipalComp = !dataStore.authPrincipalUser || !selTransferUser ? <LoginPrincipalComp setSelPrincipalUser={(ev) => handleSelectUser(ev)} username={dataStore.authPrincipalUser ? dataStore.authPrincipalUser.userpos.username : null} /> : "";

    let lstOrderComp =
        lstStoppedOrders && lstStoppedOrders.length > 0 && dataStore.authPrincipalUser ? (
            <TransfersLstComp lstOrders={lstStoppedOrders} selStore={dataStore.authPrincipalUser.store} header="Lista de órdenes de trabajo paradas" showMessage={(ev) => showMessage(ev)} setLoading={(ev) => setLoader(ev)} />
        ) : (
            ""
        );
    let lstIncommingOrderComp =
        lstIncomingOrders && lstIncomingOrders.length > 0 && dataStore.authPrincipalUser ? (
            <TransfersLstIncomingComp lstOrders={lstIncomingOrders} selStore={dataStore.authPrincipalUser.store} header="Lista de órdenes de trabajo recibidas o transferidas" showMessage={(ev) => showMessage(ev)} setLoading={(ev) => setLoader(ev)} />
        ) : (
            ""
        );

    /*
  Return
  */
    return (
        <div className="p-fluid p-grid">
            <Toast ref={toast} style={{ alignItems: "left", alignContent: "left", top: "60px" }} />
            <SelectButton value={selOption} options={options} onChange={(e) => setSelOption(e.value)} />
            {loginPrincipalComp}
            <StoreSelectionComp DataStore={props.DataStore} rendered={false} showMessage={(ev) => showMessage(ev)} handleSelectStore={(ev) => handleSelectUser(ev)} />
            {isOption1() ? lstOrderComp : lstIncommingOrderComp}
        </div>
    );
});
