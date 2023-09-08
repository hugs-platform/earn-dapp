import React, { FC, useState, useRef } from "react";
import { HugsApi } from "../../../../services/hugsApi";

// styles
import styles from "../marketsLink/marketsLinkList.module.css";

import { MarketTypes } from "../../../../core/types/types";

// types
export interface MarketProps {
    market: MarketTypes;
}


const OneMarkerLink: FC<MarketProps> = (props: MarketProps) => {
    const API = new HugsApi();
    const { market } = props;
    const [ edit, setEdit ] = useState(false);
    const newLink = useRef("");
    const openEdit = () => setEdit(true);
    const closeEdit = () => setEdit(false);

    const inputHandler = (selectedObject: any) => {
        newLink.current = selectedObject.target.value;
    };

    const changeLink = (selectedObject: any) => {
    API.changeMarketRedirectLink(market.id, newLink.current).then(response => {
        if (response.status === 200) {
        market.redirect_link = newLink.current;
        closeEdit();
        }
    }).catch(error => {
        switch (error.response.status) {
            case 400:
                alert("Invalid URL");
                break;
            case 403:
                alert("You don't have permission to edit this link");
                break;
            case 404:
                alert("Market not found");
                break;
            default:
                alert("Something went wrong");
                break;
        }
    })
    }

    return (
    <div className={styles.marketsItemList}>
        <p><img src={market.logo} height={16} width={16}/>{market.platform}</p>
        <div>
            <a target="_blank" rel="noreferrer" href={market.link}>{market.link}</a>
        </div>
        {edit === false ? 
            <div>
                <a target="_blank" rel="noreferrer" href={market.redirect_link}>{market.redirect_link}</a>
                <img onClick={openEdit} src="static/src/edit.png"/>
            </div>
        
        :
            <div>
                <input className={styles.editText} type="text" defaultValue={market.redirect_link} onChange={inputHandler}/>
                <img onClick={changeLink} src="static/src/accept.png"/>
                <img onClick={closeEdit} src="static/src/cancel.png"/>
            </div>
        }
    </div>
);
};

export default OneMarkerLink;
