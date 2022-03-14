import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";

// Prime components

// Services
import OperatorDataService from "../../service/OperatorDataService";

export const OperatorIconComp2 = observer((props) => {
  /*
Variables
*/
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
    console.log(OperatorDataService.getAccountStateFilePath(props.operator.filename));
  };


  let operatorimage = () => {
    let aux;
    OperatorDataService.getAccountStateFilePath(props.operator.filename).then(response => {
      console.log(response.data)
      aux = response.data;
    });
    return (
      { aux }
    );
  };
  /*
Inner Components
*/

  /*
Return
*/
  return (
    <div
      className="p-card"
      style={{ textAlign: "center", backgroundColor: "unset", boxShadow: "none" }}
      title={props.operator.username}>
      <i className="p-overlay-badge">
        <img
          src={OperatorDataService.getAccountStateFilePath(props.operator.filename)}
          alt="new"
          style={{ width: "70px", height: "70px" }}
        />
        <div style={{ fontSize: 10 }}> {props.operator.username}</div>
      </i>
    </div>
  );
});
