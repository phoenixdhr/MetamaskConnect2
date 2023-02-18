// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >0.8.10;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Token is ERC20 {
    constructor(string memory _name, string memory _simbol, uint _supply) ERC20(_name, _simbol) {
      _mint(msg.sender, _supply*10**decimals());

    }
}

