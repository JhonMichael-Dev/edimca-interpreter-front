import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useDataStore } from "./data/DataStoreContext";
import { observer } from "mobx-react";

export const AppTopbar = observer((props) => {
    /*
    Store
    */
    const dataStore = useDataStore();

    /*
    Init
    */
    useEffect(() => {
        //console.log("AppTopbar", dataStore.authPrincipalUser ? dataStore.authPrincipalUser : null);
    }, [dataStore.authPrincipalUser]);

    let storeNameComp = dataStore.authPrincipalUser ? <i>{dataStore.authPrincipalUser ? dataStore.authPrincipalUser.store.name.trim() : ""}</i> : "";

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
            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
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
