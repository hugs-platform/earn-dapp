import {contract, web3} from "./core";

export const saveContributionToContract = async (contribution: any) => {
    const account: any = await web3.eth.accounts.privateKeyToAccount('0xb36a29c85f4e6d42e8cd3f3bcad061f287e96df807d47b61c996bf29424eb10d');

    const tx = await contract.methods.addContribution(contribution.id, contribution.contributor, contribution.market_coin, contribution.apy, contribution.locked, )
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
