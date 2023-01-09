import {contract, web3} from "./core";

export const saveContributionToContract = async (contribution: any) => {
    const account: any = await web3.eth.accounts.privateKeyToAccount(process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY || '');

    const tx = await contract.methods.addContribution(contribution.id, contribution.contributor, contribution.market_coin, contribution.apy.toString(), contribution.locked, )
    const gas = await tx.estimateGas({from: account.address})
        const options = {
            to      : tx._parent._address,
            data    : tx.encodeABI(),
            gas,
        };
    const signed = await web3.eth.accounts.signTransaction(options, account.privateKey);
    if (signed.rawTransaction != null) {
        const receipt: any = await web3.eth.sendSignedTransaction(signed.rawTransaction);
        return receipt
    }
}
