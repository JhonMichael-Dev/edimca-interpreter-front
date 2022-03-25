import React, { useEffect } from 'react';
import { observer } from "mobx-react";

// Prime components
import { Button } from "primereact/button";

export const OperatorPauseButtonComp = observer((props) => {
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
  const loadAvailables = () => { };

  /*
  Inner Components
  */

  /*
  Return
  */
  return (
    <React.Fragment>
      <Button
        className={" p-button-" + props.status}
        label={props.label}
        style={{ fontSize: 16, justifyContent: "center", marginBottom: "5%", width: "100%", height: "22%" }}
        onClick = {props.onClick}
      />
      <br />
    </React.Fragment>
  );
});