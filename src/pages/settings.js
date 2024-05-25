import React, {useEffect, useContext, useState} from 'react';
import { TenantContext } from "../App";
import Avatar from "@mui/material/Avatar";

const Setting = () => {
  const tenantContext = useContext(TenantContext);
  const [userPiture, setUserPiture] = useState(null);

  useEffect(() => {
    setUserPiture(tenantContext.userInfo.picture)
    console.log('SETTINGS/123:::' + userPiture);
   });   

    return (
      <>
        <h1>Setting</h1>
        <h3>{userPiture}</h3>
        <Avatar src={userPiture} referrerpolicy="no-referrer" />

      </>
    );
  };
  
  export default Setting;
  