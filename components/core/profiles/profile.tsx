import React, { useState, FC } from "react";
import { HugsApi } from "../../../services/hugsApi";

// styles
import styles from "../profiles/profileList.module.css";

import { ProfileTypes } from "../../../core/types/types";

// types
export interface ProfielProps {
  profile: ProfileTypes;
}

const OneProfile: FC<ProfielProps> = (props: ProfielProps) => {
  const API = new HugsApi();
  const { profile } = props;
  const [ profileStatus, setProfileStatus ] = useState(() => {
    switch (profile.is_active){
        case true:
            return "Activated"
        case false:
            return "Blocked"
        default:
            return "Pendings..."
  }});

  const changeProfileStatus = (status: boolean) => {
    API.changeUserStatus(profile.id, status).then(response => {
        switch (status){
            case true:
                setProfileStatus("Activated");
                break;
            case false:
                setProfileStatus("Blocked");
                break;
            default:
                setProfileStatus("Pendings...");
                break;
        }        
    })
    }

  return (
    <div className={styles.profilesItemList}>
        <p>{profile.user.wallet}</p>
        <p>{profile.email}</p>
        {profile.is_admin? <p>Admin</p>: <p></p>}
        <p>{profileStatus}</p>
        
        <button onClick={() => changeProfileStatus(true)} className={styles.accept_btn}>Allow</button>
        <button onClick={() => changeProfileStatus(false)} className={styles.reject_btn}>Block</button>
    </div>
  );
};

export default OneProfile;
