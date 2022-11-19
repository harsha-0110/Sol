let account;
const connectMetamask = async () => {
    if(window.ethereum !== "undefined") {
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        account = accounts[0];
    }
    const ABI = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                }
            ],
            "name": "addCandidate",
            "outputs": [],
            "stateMutability": "nonpayable",
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
            "name": "candidates",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "voteCount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "candidatesCount",
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
            "inputs": [],
            "name": "concludeVoting",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "returnWinner",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "winner",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                }
            ],
            "name": "setVoters",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "n",
                    "type": "uint256"
                }
            ],
            "name": "showName",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "candidateId",
                    "type": "uint256"
                }
            ],
            "name": "vote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "voteTotal",
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
            "inputs": [],
            "name": "winner_id",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    const Address = "0xE9Ddb64E41d8cbE1e002049eaC9992904C8CA21f";
            
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address); 
    document.getElementById("connectWallet").value = "CONNECTED";
    document.getElementById("connectWallet").style.backgroundColor = 'rgb(0, 171, 49)';
}

const setCanditates = async () => {
    const myEntry = document.getElementById("inputArea").value;
    await window.contract.methods.addCandidate(myEntry).send({ from: account });
    document.getElementById("Status").value = "Added Candidate";
}

const setVoters = async () => {
    const myEntry = document.getElementById("inputArea1").value;
    await window.contract.methods.setVoters(myEntry).send({ from: account });
    document.getElementById("Status").value = "Added Voter";
}
        
const totVotes = async () => {
    const data = await window.contract.methods.voteTotal().call();
    document.getElementById("Status").value = data;
}

const concludeVoting = async () => {
    await window.contract.methods.concludeVoting().send({ from: account });
    document.getElementById("Status").value = "Voting Concluded";
}

const showWinner = async () => {
    const data = await window.contract.methods.returnWinner().call();
    document.getElementById("Status").value = data;
}
async function returnName() {
    document.getElementById("Status").value = "Showing Candidates Name";
    var customers = new Array();
    customers.push(["Candidate Id", "Candidate Name"]);
    const data = await window.contract.methods.candidatesCount().call();
    for(var i = 0; i < data; i++) {
        const data = await window.contract.methods.showName(i+1).call();
        customers.push([i+1, data]);
    }
    var table = document.createElement("TABLE");
    table.border = "1";

    var columnCount = customers[0].length;

    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = customers[0][i];
        row.appendChild(headerCell);
    }

    for (var i = 1; i < customers.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = customers[i][j];
        }
    }

    var dvTable = document.getElementById("dvTable");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);
}

const vote = async () => {
    const myEntry = document.getElementById("inputArea").value;
    await window.contract.methods.vote(myEntry).send({ from: account });
    document.getElementById("Status").value = "Vote Casted";
}
