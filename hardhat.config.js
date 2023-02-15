
/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomicfoundation/hardhat-network-helpers");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();


module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.17" },
      { version: "0.8.9" },
      { version: "0.8.7" },
    ],
  },


  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },

  // mocha: {
  //   timeout: 40000
  // },

  defaultNetwork: "hardhat",

  networks: {


    hardhat: {
      chainId: 1337, // We set 1337 to make interacting with MetaMask simpler

      forking: {
        url: process.env.API_QUIK_TEST_BSC,
        blockNumber: 16520000,
        enabled:false
      },

      accounts: [
        { privateKey: process.env.KEY1, balance: "10000000000000000000000" },
        { privateKey: process.env.KEY2, balance: "10000000000000000000000" },
        { privateKey: process.env.KEY3, balance: "50000000000000000000000" },
        { privateKey: process.env.KEY4, balance: "10000000000000000000000" },
        { privateKey: process.env.KEY5, balance: "10000000000000000000000" },
      ],

      accounts: {
        mnemonic: process.env.SEED,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
        accountsBalance:"15000000000000000000000",
        passphrase: "",
      },


    },


    Test_ETH_Goerli: {
      url: process.env.API_INFURA_GOERLI,
      accounts: {
        mnemonic: process.env.SEED,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
        passphrase: "",
      },
    },


    ETH_Mainet: {
      url: process.env.API_ALCHEMY_MAINET,
      accounts: {
        mnemonic: process.env.SEED,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
        passphrase: "",
      },
    },


    Test_Polygon_Mumbai: {
      url: "https://endpoints.omniatech.io/v1/matic/mumbai/public",
      accounts: {
        mnemonic: process.env.SEED,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
        passphrase: "",
      },
    },



    Test_BSC: {
      url: "https://endpoints.omniatech.io/v1/bsc/testnet/public",
      chainId: 97,
      accounts: {
        mnemonic: process.env.SEED,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
        passphrase: "",
      },
    },


    
  },

  etherscan:{
    apiKey: process.env.API_ETHERSCAN
  }

};
