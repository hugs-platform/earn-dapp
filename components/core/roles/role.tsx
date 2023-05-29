import React, { FC, useState } from "react";
import { HugsApi } from "../../../services/hugsApi";
import Select from 'react-select';

// styles
import styles from "../roles/rolesList.module.css";

import { ProfileTypes } from "../../../core/types/types";

// types
export interface ProfielProps {
  profile: ProfileTypes;
}

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    margin: "1em 0",
  //   background: "#E2F5FA",
    fontFamily: 'Gilroy',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '20px',
    fontColor: '#292D32',
  }),
  menu: (base: any) => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0,
    fontFamily: 'Gilroy',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '20px',
    fontColor: '#292D32',
  }),
  menuList: (base: any) => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
    fontFamily: 'Gilroy',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '20px',
    fontColor: '#292D32',
  })
};

const OneRole: FC<ProfielProps> = (props: ProfielProps) => {
  const API = new HugsApi();
  const { profile } = props;
  const roleTypes = [
    { value: "Owner", label: "Owner", isDisabled: true }, 
    { value: "User", label: "User" },
    { value: "Moderator", label: "Moderator" },
    { value: "Admin", label: "Admin" }
  ];
  const [ userRole, setUserRole ] = useState(profile.role);
  const searchIndex = roleTypes.findIndex((role) => role.label==userRole);

  const changeRole = (selectedObject: any) => {
    API.changeProfileRole(profile.application_id, profile.id, selectedObject.value).then(response => {
      if (response.status === 200) {
        setUserRole(selectedObject.value);
      }
  })
  }


  return (
    <div className={styles.rolesItemList}>
        <p>{profile.user.wallet}</p>
        <p>{profile.email}</p>
        <Select styles={customStyles} value={roleTypes[searchIndex]} options={roleTypes} onChange={changeRole} />
    </div>
  );
};

export default OneRole;
