// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Voting {

    address private immutable owner;
    constructor() {   
        owner=tx.origin;
    }

    uint public candidatesCount;
    uint public voteTotal;
    uint private conclude=0;
    uint public winner_id=0;
    
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) private voters;
    mapping(address => bool) private rights;

    //Function for setting Voters
    function setVoters(address addr) public{
        require(msg.sender == owner, "Only the contractor creator can set the voters");
        rights[addr] = true;
    }

    //Function for setting Candidates
    function addCandidate(string memory name) public {
        require(msg.sender == owner, "Only the contractor creator can set the candidates");
        require(voteTotal == 0, "Cannot submit candidate after voting started");
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, name, 0);
    }

    //Function for Casting Vote
    function vote(uint candidateId) public {
        require(rights[msg.sender], "Voter doesn't have the rigths to vote");
        require(msg.sender != owner, "The contractor creator cannot participate in the voting");
        require(!voters[msg.sender], "Vote already cast from this address");
        require(candidateId > 0 && candidateId <= candidatesCount, "Invalid Candidate ID");
        require(candidatesCount >= 2, "Must be at least 2 candidates before votes can be cast");
        require(conclude == 0, "Voting concluded");
        voters[msg.sender] = true;
        candidates[candidateId].voteCount++;
        voteTotal++;
    }
    
    //Function for Concluding Voting
    function concludeVoting() public {
        require(msg.sender == owner, "Only the contractor creator can can conclude the voting");
        for(uint i=0; i<candidatesCount; i++) {
            if(candidates[i].voteCount < candidates[i+1].voteCount) {
                winner_id=candidates[i+1].id;
            }
        }
        conclude += 1;
    }

    //Function for Returning Winner Name
    function returnWinner()public view returns (string memory winner) {
        return(candidates[winner_id].name);
    }

    //Function for Retrieve Candidates Name
    function showName(uint n) public view returns (string memory name) {
         return(candidates[n].name);
    }
}