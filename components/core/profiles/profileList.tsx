import { useEffect, useState } from "react";
import { HugsApi } from "../../../services/hugsApi";
import OneProfile from "../profiles/profile";

// styles
import styles from "../profiles/profileList.module.css";
import { ProfileTypes } from "../../../core/types/types";

/**
 * @class
 * @ignore
 */
function App() {
    const API = new HugsApi();
    const [ profilesList, setProfilesList ] = useState([]);
    const [ errorMsg, setErrorMsg ] = useState("");

    useEffect(() => {
        API.getProfileList().then(response => {
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