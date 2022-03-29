import React, { useState, useEffect, useRef } from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useHistory } from "react-router";

//import { ProductService } from "../service/ProductService";
import OrderDataService from "../service/OrderDataService";
import MachineryDataService from "../service/MachineryDataService";

import { LoginPrincipalComp } from "./login/LoginPrincipalComp";
import { MachineryIconComp } from "./machinery/MachineryIconComp";
import { useDataStore } from "../data/DataStoreContext";

const lineData = {
    labels: ["8:00", "9:00", "10:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    datasets: [
        {
            label: "Ordenes Pendientes",
            data: [20, 36, 49, 66, 56, 56, 45, 30, 20],
            fill: false,
            backgroundColor: "#2f4860",
            borderColor: "#2f4860",
            tension: 0.4,
        },
        {
            label: "Ordenes En_Proceso",
            data: [0, 30, 40, 66, 46, 44, 30, 16, 8],
            fill: false,
            backgroundColor: "#00bb7e",
            borderColor: "#00bb7e",
            tension: 0.4,
        },
    ],
};

const chartData = {
    labels: ["ECANGA", "AGUTIERREZ", "MGUAMAN", "GPACHACAMA", "YWANG", "MFLOR", "RPERALTA"],
    datasets: [
        {
            label: "ANTEAYER",
            backgroundColor: "rgba(0, 0, 139,0.2)",
            borderColor: "rgba(0, 0, 139,1)",
            pointBackgroundColor: "rgba(0, 0, 139,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(0, 0, 139,1)",
            data: [75, 69, 50, 71, 59, 65, 65],
        },
        {
            label: "AYER",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [80, 66, 47, 69, 66, 67, 70],
        },
    ],
};

const lightOptions = {
    plugins: {
        legend: {
            labels: {
                color: "#495057",
            },
        },
    },
    scales: {
        r: {
            pointLabels: {
                color: "#495057",
            },
            grid: {
                color: "#d99d00",
            },
            angleLines: {
                color: "#d99d00",
            },
        },
    },
};

export const Dashboard = () => {
    //const [products, setProducsetProductsts] = useState(null);
    const menu1 = useRef(null);
    const [numberOrde, selNumberOrde] = useState(0);
    const [numberOrdeProcess, selNumberOrdeProcess] = useState(0);
    const history = useHistory();
    const [lstMachinery, setLstMachinery] = useState([]);

    /*
    Store
    */
    const dataStore = useDataStore();

    useEffect(() => {
        //const productService = new ProductService();
        //productService.getProductsSmall().then((data) => setProducts(data));
        numbrePendingOrde();
        handleQueryMachineryByWh();
    }, []);

    async function numbrePendingOrde() {
        let lstPendingStatus = ["PENDIENTE"];
        let numbreOrdenPending = [];
        await OrderDataService.queryOrdersByStore().then((valid) => {
            if (valid && valid.data && valid.data.success) {
                numbreOrdenPending = valid.data.obj.filter((orderX) => lstPendingStatus.includes(orderX.status));
                selNumberOrde(numbreOrdenPending.length);
            }
        });

        let lstProcessStatus = ["EN_PROCESO"];
        let numbreOrdenProcess = [];
        await OrderDataService.queryOrdersByStore().then((valid) => {
            if (valid && valid.data && valid.data.success) {
                numbreOrdenProcess = valid.data.obj.filter((orderX) => lstProcessStatus.includes(orderX.status));
                selNumberOrdeProcess(numbreOrdenProcess.length);
            }
        });
    }

    const onEnvClickOrder = (e) => {
        history.push({
            pathname: "/productionControl",
        });
    };

    const onEnvClickService = (e) => {
        history.push({
            pathname: "/serviceInProcess",
        });
    };

    const handleQueryMachineryByWh = () => {
        /*
        MachineryDataService.queryMachineryByWhMan(null).then((valid) => {
            if (valid.data && valid.data.success) {
                setLstMachinery(valid.data.obj[0].machineryMaintenaceList);
            }
        });*/
        MachineryDataService.getMachineAll().then((valid) => {
            if (valid.data) {
                let lstMachineryFilteredByMcuMan = valid.data.sort().reverse();
                //console.log(lstMachineryFilteredByMcuMan);
                setLstMachinery(lstMachineryFilteredByMcuMan);
            }
        });
    };

    /*
    Inner components
    */

    let machineryIconComp = (rowData) => {
        return <MachineryIconComp machineryData={rowData} />;
    };

    let loginPrincipalComp = !dataStore.authPrincipalUser ? <LoginPrincipalComp setSelPrincipalUser={(ev) => dataStore.setAuthPrincipalUser(ev)} /> : "";

    return (
        <div className="grid">
            {loginPrincipalComp}
            <div className="col-12 lg:col-6" onClick={(e) => onEnvClickOrder(e)}>
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Ordenes Pendientes</span>
                            <div className="text-900 font-medium text-xl">{numberOrde}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                            <i className="pi pi-shopping-cart text-blue-500 text-xl" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6" onClick={(e) => onEnvClickService(e)}>
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Ordenes en proceso</span>
                            <div className="text-green-500 font-medium text-xl">{numberOrdeProcess}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                            <i className="pi pi-angle-double-right text-orange-500 text-xl" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <h5>Listado de maquinarias</h5>
                    <DataTable value={lstMachinery} dataKey="code" responsiveLayout="scroll" scrollable scrollHeight="380px" virtualScrollerOptions={{ itemSize: 46 }}>
                        <Column header="Maquinaria" body={machineryIconComp} style={{ width: "20%", textAlign: "center" }} sortable sortField="code"></Column>
                        <Column header="Descripción" field="description" style={{ width: "30%", textAlign: "center", alignContent: "center" }} sortable sortField="description"></Column>
                        <Column header="Estado" field="status" style={{ textAlign: "center", width: "20%", fontSize: "12px" }}></Column>
                        <Column header="Est. Mantemiento" field="statusMaintenace" style={{ textAlign: "center", width: "20%", fontSize: "12px" }}></Column>
                        <Column
                            header="View"
                            style={{ width: "10%" }}
                            body={() => (
                                <>
                                    <Button icon="pi pi-search" type="button" className="p-button-text" />
                                </>
                            )}
                        />
                    </DataTable>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card" style={{ textAlign: "center" }}>
                    <h5>Producción Diaria / ?</h5>
                    <Chart type="line" data={lineData} style={{ width: "100%", display: "inline-block" }} />
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card" style={{ textAlign: "center" }}>
                    <h5>Producción Por Operador</h5>
                    <Chart type="radar" data={chartData} options={lightOptions} style={{ width: "50%", display: "inline-block" }} />
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <div className="flex justify-content-between align-items-center mb-5">
                        <h5>TOP Servicios Transformados / Lógica de porcentajes?</h5>
                        <div>
                            <Button type="button" icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-plain" onClick={(event) => menu1.current.toggle(event)} />
                            <Menu
                                ref={menu1}
                                popup
                                model={[
                                    { label: "Add New", icon: "pi pi-fw pi-plus" },
                                    { label: "Remove", icon: "pi pi-fw pi-minus" },
                                ]}
                            />
                        </div>
                    </div>
                    <ul className="list-none p-0 m-0">
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">CORTE</span>
                                <div className="mt-1 text-600">Contadora recta 01</div>
                            </div>
                            <div className="mt-2 md:mt-0 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: "8px" }}>
                                    <div className="bg-orange-500 h-full" style={{ width: "80%" }} />
                                </div>
                                <span className="text-orange-500 ml-3 font-medium">%80</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">CORTE</span>
                                <div className="mt-1 text-600">Contadora recta 02</div>
                            </div>
                            <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: "8px" }}>
                                    <div className="bg-cyan-500 h-full" style={{ width: "16%" }} />
                                </div>
                                <span className="text-cyan-500 ml-3 font-medium">%20</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">ENRUTADO</span>
                                <div className="mt-1 text-600">Enrutadora 01</div>
                            </div>
                            <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: "8px" }}>
                                    <div className="bg-pink-500 h-full" style={{ width: "67%" }} />
                                </div>
                                <span className="text-pink-500 ml-3 font-medium">%67</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">PERFORADO</span>
                                <div className="mt-1 text-600">Perforadora 01</div>
                            </div>
                            <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: "8px" }}>
                                    <div className="bg-green-500 h-full" style={{ width: "25%" }} />
                                </div>
                                <span className="text-green-500 ml-3 font-medium">%25</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">PERFORADO</span>
                                <div className="mt-1 text-600">Perforadora 02</div>
                            </div>
                            <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: "8px" }}>
                                    <div className="bg-purple-500 h-full" style={{ width: "75%" }} />
                                </div>
                                <span className="text-purple-500 ml-3 font-medium">%75</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <div className="flex justify-content-between align-items-center mb-5">
                        <h5>Producción Otras Tiendas</h5>
                        <div>
                            <Button type="button" icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-plain" onClick={(event) => menu1.current.toggle(event)} />
                            <Menu
                                ref={menu1}
                                popup
                                model={[
                                    { label: "Add New", icon: "pi pi-fw pi-plus" },
                                    { label: "Remove", icon: "pi pi-fw pi-minus" },
                                ]}
                            />
                        </div>
                    </div>
                    <ul className="list-none p-0 m-0">
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">BODEGA FISICA MATRIZ QUITO</span>
                            </div>
                            <div className="mt-2 md:mt-0 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: "8px" }}>
                                    <div className="bg-orange-500 h-full" style={{ width: "40%" }} />
                                </div>
                                <span className="text-orange-500 ml-3 font-medium">%40</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">BODEGA FISICA GUAMANI</span>
                            </div>
                            <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: "8px" }}>
                                    <div className="bg-cyan-500 h-full" style={{ width: "17%" }} />
                                </div>
                                <span className="text-cyan-500 ml-3 font-medium">%17</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">BODEGA FISICA MARISCAL SUCRE</span>
                            </div>
                            <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: "8px" }}>
                                    <div className="bg-pink-500 h-full" style={{ width: "29%" }} />
                                </div>
                                <span className="text-pink-500 ml-3 font-medium">%29</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">BODEGA FISICA SAN RAFAEL</span>
                            </div>
                            <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: "8px" }}>
                                    <div className="bg-green-500 h-full" style={{ width: "9%" }} />
                                </div>
                                <span className="text-green-500 ml-3 font-medium">%9</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">BODEGA FISICA SAN BARTOLO</span>
                            </div>
                            <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: "8px" }}>
                                    <div className="bg-purple-500 h-full" style={{ width: "5%" }} />
                                </div>
                                <span className="text-purple-500 ml-3 font-medium">%5</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
