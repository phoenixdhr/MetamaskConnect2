const keccak256 = require("keccak256")
const { ethers } = require("hardhat")

const data= "CTM"

const hash= keccak256(data)

console.log(hash);