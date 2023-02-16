const { messagePrefix } = require("@ethersproject/hash");
const { ethers } = require("ethers");

const deployButton = document.querySelector("#deployButton");
deployButton.addEventListener("click", deploy);

// const localStoragePiggyBank = localStorage.getItem("Contrato");
let contractsPiggyBank;
const valueETH = document.querySelector("#valueETH");

const contractStatus = document.getElementById("contractStatus");

// if (!localStoragePiggyBank) {
//   localStorage.setItem("Contrato", JSON.stringify([]));
//   contractsPiggyBank = [];
// } else {
//   contractsPiggyBank = JSON.parse(localStoragePiggyBank);

// }

/////////////////////// DEPLOY ///////////////////////////////

async function deploy() {
  contractStatus.innerText = "Deploying";
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  const res = await fetch(
    "http://localhost:5500/artifacts/contracts/PiggyBank.sol/PiggyBank.json"
  );
  const data = await res.json();

  try {
    const factoryPiggyBank = await ethers.ContractFactory.fromSolidity(
      data
    ).connect(signer);
    const PiggyBank = await factoryPiggyBank.deploy();

    await PiggyBank.deployed();
    contractsPiggyBank = PiggyBank;
    contractStatus.innerText = `Deploy Success Contract Address \n ${PiggyBank.address}`;
  } catch (error) {
    console.error(error);
    contractStatus.innerText = "Deploy Fail";
  }


}

/////////////////////// DEPOSIT ///////////////////////////////

const depositButton = document.querySelector("#depositButton");
depositButton.addEventListener("click", deposit);

async function deposit() {
  contractStatus.innerHTML = 'Deposit initiated'
  const tx = await contractsPiggyBank.deposit({
    value: ethers.utils.parseEther(valueETH.value),
  });

  await tx.wait()
  contractStatus.innerHTML = 'Deposit completed'
}

/////////////////////// WITHDRAWL ///////////////////////////////

const withdrawButton = document.querySelector("#withdrawButton");
withdrawButton.addEventListener("click", withdraw);

async function withdraw() {
    contractStatus.innerHTML = 'withdraw initiated'
  const tx = await contractsPiggyBank.withdraw(ethers.utils.parseEther(valueETH.value));
  await tx.wait()
  contractStatus.innerHTML = 'withdraw completed'
}
