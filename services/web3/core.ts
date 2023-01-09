import {contributionWeb3ContractAddress, contributionWeb3ContractAbi} from "./constants";
import Web3 from "web3";

export const web3 = new Web3('https://rpc-mumbai.maticvigil.com');
export const contract = new web3.eth.Contract(<any>contributionWeb3ContractAbi,  contributionWeb3ContractAddress)