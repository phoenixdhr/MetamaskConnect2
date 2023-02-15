/*global ethereum, MetamaskOnboarding */

/*
The `piggybankContract` is compiled from:
*/
// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >0.8.10;

  contract PiggyBank {

      uint private balance;
      address public owner;
      
      constructor() {
          owner = msg.sender;
          balance = 0;
      }


      function deposit() public payable returns (uint) {
          balance += msg.value;
          return balance;
      }

      function withdraw(uint withdrawAmount) public returns (uint remainingBal) {
          require(msg.sender == owner);
          balance -= withdrawAmount;

          payable(msg.sender).transfer(withdrawAmount);

          return balance;
      }
  }
