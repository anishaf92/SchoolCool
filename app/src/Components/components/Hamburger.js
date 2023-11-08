import React from "react";
import "../../Css/navbar.css"
const Hamburger = ({isOpen}) =>{
    
    return (
        <div className="hamburger">
            <div className={isOpen? "bar bar1clicked" : "bar bar1"}  />
            <div className={isOpen? "bar bar2clicked" : "bar bar2"} />
            <div className={isOpen? "bar bar3clicked" : "bar bar3"} />
        </div>
      );
}
export default Hamburger;