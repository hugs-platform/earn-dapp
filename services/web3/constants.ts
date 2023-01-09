export const contributionWeb3ContractAddress = "0x5741A7f5F47BA4095F2488e793C873a87563c850"
export const contributionWeb3ContractAbi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "id",
                "type": "string"
            }
        ],
        "name": "ContributionAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "id",
                "type": "string"
            }
        ],
        "name": "ContributionApproved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "hash",
                "type": "string"
            }
        ],
        "name": "ContributionRejected",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "contributionIndex",
                "type": "uint256"
            }
        ],
        "name": "ContributionRemoved",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "id",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "contributor",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "market_coin",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "apy",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "locked",
                "type": "bool"
            }
        ],
        "name": "addContribution",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "contributionIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "status",
                "type": "uint8"
            }
        ],
        "name": "changeContributionStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "contributionLength",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "contributions",
        "outputs": [
            {
                "internalType": "string",
                "name": "id",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "contributor",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "market_coin",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "apy",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "locked",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "timestemp",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "status",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "contributionIndex",
                "type": "uint256"
            }
        ],
        "name": "removeContribution",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]