import React, { Component } from "react";
import { OcupationalDoctorListComp } from "../components/managementOperator/OcupationalDoctorListComp";
class OccupationalDoctorPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="p-grid p-fluid">
                <OcupationalDoctorListComp></OcupationalDoctorListComp>
            </div>
        );
    }
}

export default OccupationalDoctorPage;
