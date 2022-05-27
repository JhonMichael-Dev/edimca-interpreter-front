import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import classNames from "classnames";
import { observer } from "mobx-react";
import { useDataStore } from "./data/DataStoreContext";
// Prime components
import { MachineryNotificationsComp } from "./components/machinery/MachineryNotificationsComp";
// Services
import NotificationDataService from "./service/NotificationDataService";
import MachineryDataService from "./service/MachineryDataService";

export const AppTopbar = observer((props) => {
    /*
    Variables
    */
    const dataStore = useDataStore();
    const [lstNextMaintenance, setLstNextMaintenance] = useState([]);
    const [lstNextMaintenanceFiltered, setLstNextMaintenanceFiltered] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [machineryTypes, setMachineryType] = useState([]);

    /*
    Init
    */
    useEffect(() => {
        //console.log("AppTopbar", dataStore.authPrincipalUser ? dataStore.authPrincipalUser : null);
        loadAvailables();
    }, [dataStore.authPrincipalUser]);

    const loadAvailables = () => {
        MachineryDataService.getServiceType().then((valid) => {
            //console.log("MachineryDataService: " + valid.data);
            setMachineryType(valid.data);
        });

        let searchDto = {
            //mcu: this.props.PosStore.user.store.mcu
            mcu: "2CM015",
        };

        NotificationDataService.queryNextMaintenance(searchDto).then((valid) => {
            if (valid.data) {
                setLstNextMaintenance(valid.data.obj);
            }
        });
    };

    /*
    Methods
    */
    const onClickNotification = (service) => {
        console.log(lstNextMaintenance.filter((x) => x.serviceType === service.skill));
        setLstNextMaintenanceFiltered(lstNextMaintenance.filter((x) => x.serviceType === service.skill));
        setDialogVisible(true);
    };

    const onHide = () => {
        setDialogVisible(false);
        setLstNextMaintenanceFiltered(lstNextMaintenance);
    };

    /*
    Inner Components
    */
    let serviceIcon = (rowData) => {
        return (
            <React.Fragment>
                <img src={"/assets/images/serviceType_" + rowData.serviceType + ".png"} className="pos-edimca-button-noLabel" style={{ width: "20px", height: "20px" }} />
                <div style={{ fontSize: 8 }}> {rowData.serviceType}</div>
            </React.Fragment>
        );
    };

    let storeNameComp = dataStore.authPrincipalUser ? <i>{dataStore.authPrincipalUser ? dataStore.authPrincipalUser.store.name : ""}</i> : "";

    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src={props.layoutColorMode === "light" ? "assets/demo/images/logoEdimca/logo-edimca-color.png" : "assets/demo/images/logoEdimca/log-edimca-blanco.png"} alt="logo" />
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>

            {storeNameComp}

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <Dialog visible={dialogVisible} style={{ width: "60%" }} header="Próximos mantenimientos" modal className="p-fluid" onHide={onHide}>
                <DataTable
                    //header="Registro de actividades"
                    value={lstNextMaintenanceFiltered}
                    showGridlines
                    stripedRows
                    size="small"
                    style={{ width: "100%" }}
                    scrollable
                    scrollHeight="220px"
                    scrollDirection="both"
                    responsiveLayout="stack"
                    emptyMessage={"No hay registros"}
                >
                    <Column
                        header="Tipo Servicio"
                        body={serviceIcon}
                        style={{
                            textAlign: "center",
                            width: "9%",
                            fontSize: "12px",
                        }}
                        sortable={true}
                    />
                    <Column
                        header="Máquina"
                        field="machine"
                        style={{
                            textAlign: "center",
                            width: "9%",
                            fontSize: "12px",
                        }}
                        sortable={true}
                    />
                    <Column
                        header="Número Activo"
                        field="assetNumber"
                        style={{
                            textAlign: "center",
                            width: "9%",
                            fontSize: "12px",
                        }}
                        sortable={true}
                    />
                    <Column
                        header="Dias Restantes"
                        field="daysToMaintenance"
                        style={{
                            textAlign: "center",
                            width: "9%",
                            fontSize: "12px",
                        }}
                        sortable={true}
                    />
                    <Column
                        header="Tipo Mantenimiento"
                        field="maintenanceType"
                        style={{
                            textAlign: "center",
                            width: "9%",
                            fontSize: "12px",
                        }}
                        sortable={true}
                    />
                </DataTable>
            </Dialog>

            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
                <li>
                    <div className="grid">
                        {machineryTypes.map((service) => {
                            return (
                                <div className="col-3" style={{ textAlign: "center" }}>
                                    <button type="button" className="p-link" style={{ boxShadow: "none" }} onClick={() => onClickNotification(service)}>
                                        <MachineryNotificationsComp serviceType={service.skill} badgeNumber={0} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <i className="pi pi-calendar" />
                        <span>Events</span>
                    </button>
                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <i className="pi pi-cog" />
                        <span>Settings</span>
                    </button>
                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <i className="pi pi-user" />
                        <span>Profile</span>
                    </button>
                </li>
            </ul>
        </div>
    );
});
