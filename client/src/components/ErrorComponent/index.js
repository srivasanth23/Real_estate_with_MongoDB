import React from "react";
import { MdError } from "react-icons/md";

const ErrorComponent = () => {
    return(
        <div className="innerWidth flexColCenter paddings wrapper" style={{height:"80vh"}}>
            <MdError size={100} style={{margin:"30px"}}/>
            <span className="primaryText">Error while fetching data</span>
        </div>
    )
};

export default ErrorComponent;