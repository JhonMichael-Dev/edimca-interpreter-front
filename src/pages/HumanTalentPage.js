import React, { Component } from "react";
import { HumanTalentListComp } from "../components/managementOperator/HumanTalentListComp";
class HumanTalentPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="p-grid p-fluid">
                <HumanTalentListComp></HumanTalentListComp>
            </div>
        );
    }
}

export default HumanTalentPage;
