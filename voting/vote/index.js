web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545"));
abi = JSON.parse('[{"inputs":[{"internalType":"string[]","name":"candidateNames","type":"string[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidateList","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"candidate","type":"string"}],"name":"totalVotesFor","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"candidate","type":"string"}],"name":"validCandidate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"candidate","type":"string"}],"name":"voteForCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"}]')

VotingContract = web3.eth.contract(abi);

contractInstance = VotingContract.at('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512');

candidates = {"Alice": "candidate-1","Bob": "candidate-2","Cary":"candidate-3"}

function voteForCandidate() {
    //console.log(candidate);
    candidateName = $("#candidate").val();
    //console.log(candidateName);
    contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
        let div_id = candidates[candidateName];
        console.log(contractInstance.totalVotesFor.call(candidateName).toString());
        $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
    });
    console.log(contractInstance.totalVotesFor.call(candidateName).toString());
}

$(document).ready(function() {
    candidateNames = Object.keys(candidates);
    for (var i = 0; i < candidateNames.length; i++) {
        let name = candidateNames[i];
        let val = contractInstance.totalVotesFor.call(name).toString()
        $("#" + candidates[name]).html(val);
    }
});
