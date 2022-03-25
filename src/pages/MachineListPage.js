import React, { Component } from "react";
import { MachinerySelectionLstMaintenanceComp } from "../components/machinery/MachinerySelectionLstMaintenanceComp";
export class MachineListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="p-grid p-fluid">
                <MachinerySelectionLstMaintenanceComp></MachinerySelectionLstMaintenanceComp>
            </div>
        );
    }
}

export default MachineListPage;
