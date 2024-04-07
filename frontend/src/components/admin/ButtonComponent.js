import React from 'react';
import '../../App.css'; // Import your CSS file


const ButtonComponent = ({ handleClick }) => {
   return (
       <button className="openButton" onClick={handleClick}>
           <i className="fa fa-message"></i>
       </button>
   );
}

export default ButtonComponent;
