import React, { useState } from "react";
import "firebase/compat/firestore";
import "bootstrap/dist/css/bootstrap.min.css"
import UserUpdate from '../components/User/UserUpdate';
import UserAdd from '../components/User/UserAdd';

const UserActions = () => {
 

  return (
    <div> 
      <UserAdd />
      <UserUpdate />
    </div>
  );
};

export default UserActions;