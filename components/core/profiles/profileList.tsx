import { useEffect, useState } from "react";
import { HugsApi } from "../../../services/hugsApi";
import OneProfile from "../profiles/profile";
import Select from 'react-select';

// styles
import styles from "../profiles/profileList.module.css";
import { ProfileTypes } from "../../../core/types/types";


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
/**
 * @class
 * @ignore
 */
function App() {
    const API = new HugsApi();
    const [ profilesList, setProfilesList ] = useState([]);
    const [ errorMsg, setErrorMsg ] = useState("");
    const appIdTypes = [
        { value: "Earn dApp", label: "Earn Market" },
        { value: "Hugbunters", label: "Hugbunters" }
    ];

    const appListHandle = (selectedObject: any) => {
        setProfilesList([]);
        setErrorMsg("");
        API.getProfileList(selectedObject.value).then(response => {
            setProfilesList(response.data.items);
        })
        .catch(error => {
            setErrorMsg("You don't have enough permissions");
        })
      }

    useEffect(() => {
        API.getProfileList(appIdTypes[0].value).then(response => {
            setProfilesList(response.data.items);
        })
        .catch(error => {
            setErrorMsg("You don't have enough permissions");
        })
    }, [])

    return (
    <>
        <div className={styles.profileBody}>
        <h1>Profiles</h1>
        <Select styles={customStyles} defaultValue={appIdTypes[0]} options={appIdTypes} onChange={appListHandle}/>
        <div className={styles.profilesItemList}>
            <p>Wallet</p>
            <p>Email</p>
            <p>Is Staff</p>
            <p>Is activated</p>
            <p></p>
            <p></p>
        </div>
        {profilesList.map((profile: ProfileTypes) => (<OneProfile key={profile.id} profile={profile} />))}
        {errorMsg? <p className={styles.errorMsg}>{errorMsg}</p> : <></>}
        </div>
    </>
    );
}

export default App;