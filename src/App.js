import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Route, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { AppTopbar } from "./AppTopbar";
import { AppFooter } from "./AppFooter";
import { AppMenu } from "./AppMenu";
import { AppConfig } from "./AppConfig";

//Componet
import PrimeReact from "primereact/api";
import { Dashboard } from "./components/Dashboard";
import { LoginPrincipalComp } from "./components/login/LoginPrincipalComp";
import { ProductionControlPage } from "./pages/ProductionControlPage";
import { ProductionControlComp } from "./components/ProductionControlComp";
import { TransfersPage } from "./pages/TransfersPage";
import { ServiceInProcessPage } from "./pages/ServiceInProcessPage";

// Store
import { Provider } from "mobx-react";
import { create } from "mobx-persist";
import { observer } from "mobx-react";

//CSS
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./layout/flags/flags.css";
import "./layout/layout.scss";
import "./App.scss";
import "./App.css";

/*
Theme
*/
import "primereact/resources/themes/fluent-light/theme.css";
import { useDataStore } from "./data/DataStoreContext";
import { LoadingDialogComp } from "./components/base/LoadingDialogComp";
import MachineListPage from "./pages/MachineListPage";
import VlPage from "./pages/VlPage";
import OtherOrdersPage from "./pages/OtherOrdersPage";
import HumanTalentPage from "./pages/HumanTalentPage";
import OccupationalDoctorPage from "./pages/OccupationalDoctorPage";
import { Badge } from "primereact/badge";

const App = () => {
    //const App = observer((props) => {
    // Variables
    const [selPrincipalUser, setSelPrincipalUser] = useState(null);
    // React variables
    const [layoutMode, setLayoutMode] = useState("static");
    const [layoutColorMode, setLayoutColorMode] = useState("light");
    const [inputStyle, setInputStyle] = useState("outlined");
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const history = useHistory();

    /*
    Store
    */
    const dataStore = useDataStore();

    const hydrate = create({
        storage: localStorage, // or AsyncStorage in react-native.
        // default: localStorage
        jsonify: true, // if you use AsyncStorage, here shoud be true
        // default: true
    });

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        validatePrincipalUserLogedIn();
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive, dataStore]);

    const validatePrincipalUserLogedIn = () => {
        if (!dataStore.authPrincipalUser) {
            history.push({
                //pathname: "/login",
            });
        }
    };

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode);
    };

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode);
    };

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    };

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === "overlay") {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            } else if (layoutMode === "static") {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };
    const isDesktop = () => {
        return window.innerWidth >= 992;
    };

    const menu = [
        {
            label: "Menú",
            items: [
                {
                    label: "Dashboard",
                    icon: "pi pi-fw pi-home",
                    to: "/",
                },
                {
                    label: "Ordenes pendientes",
                    icon: "pi pi-fw pi-shopping-cart",
                    to: "/productionControl",
                },
                {
                    label: "Transferencias",
                    icon: "pi pi-fw pi-sort-alt",
                    to: "/transfers",
                    badge: dataStore.countIncomingTransfers ? <Badge value={dataStore.countIncomingTransfers} /> : "",
                },
                {
                    label: "Ordenes en proceso",
                    icon: "pi pi-fw pi-angle-double-right",
                    to: "/serviceInProcess",
                },
                {
                    label: "Lista de maquinas",
                    icon: "pi pi-fw pi-angle-double-right",
                    to: "/machineList",
                },
                {
                    label: "Registro manual",
                    icon: "pi pi-fw pi-angle-double-right",
                    items: [
                        {
                            label: "VL",
                            icon: "pi pi-fw pi-angle-double-right",
                            to: "/vl",
                        },
                        {
                            label: "Otras Ordenes",
                            icon: "pi pi-fw pi-angle-double-right",
                            to: "/otherOrders",
                        },
                    ],
                },

                {
                    label: "Gestion operarios",
                    icon: "pi pi-fw pi-angle-double-right",
                    items: [
                        {
                            label: "Talento humano",
                            icon: "pi pi-fw pi-angle-double-right",
                            to: "/talentoHumano",
                        },
                        {
                            label: "Médico ocupacional",
                            icon: "pi pi-fw pi-angle-double-right",
                            to: "/medicoOcupacional",
                        },
                    ],
                },
            ],
        },
    ];

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    const wrapperClass = classNames("layout-wrapper", {
        "layout-overlay": layoutMode === "overlay",
        "layout-static": layoutMode === "static",
        "layout-static-sidebar-inactive": staticMenuInactive && layoutMode === "static",
        "layout-overlay-sidebar-active": overlayMenuActive && layoutMode === "overlay",
        "layout-mobile-sidebar-active": mobileMenuActive,
        "p-input-filled": inputStyle === "filled",
        "p-ripple-disabled": ripple === false,
        "layout-theme-light": layoutColorMode === "light",
    });

    //const loginPrincipalComp = <LoginPrincipalComp setSelPrincipalUser={(ev) => setSelPrincipalUser(ev)} />;

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode} mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/productionControl" exact component={ProductionControlPage} />
                    <Route path="/transfers" exact component={TransfersPage} />
                    <Route path="/machineList" exact component={MachineListPage} />
                    <Route path="/serviceInProcess" exact component={ServiceInProcessPage} />
                    <Route path="/vl" exact component={VlPage} />
                    <Route path="/otherOrders" exact component={OtherOrdersPage} />
                    <Route path="/talentoHumano" exact component={HumanTalentPage} />
                    <Route path="/medicoOcupacional" exact component={OccupationalDoctorPage} />
                </div>

                <AppFooter layoutColorMode={layoutColorMode} />
                <LoadingDialogComp />
            </div>

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange} layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>
        </div>
    );
};
//});

export default App;
