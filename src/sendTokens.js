const { ethers } = require("ethers");

const spanTokenAddress = document.getElementById("spanTokenAddress");

const button_createToken = document.getElementById("button_createToken");
const button_transferTokens = document.getElementById("button_transferTokens");
const button_approveTokens = document.getElementById("button_approveTokens");
const button_transferTokensWithoutGas = document.getElementById(
  "button_transferTokensWithoutGas"
);
const button_approveTokensWithoutGas = document.getElementById(
  "button_approveTokensWithoutGas"
);
const button_balanceOf = document.getElementById("button_balanceOf");

const nameToken = document.getElementById("nameToken");
const simbolToken = document.getElementById("simbolToken");
const supplyToken = document.getElementById("supplyToken");

const adressTo = document.getElementById("adressTo");
const mountToken = document.getElementById("mountToken");

const inputAdressApprove = document.getElementById("inputAdressApprove");
const inputMountApprove = document.getElementById("inputMountApprove");

const inputBalanceOf = document.getElementById("inputBalanceOf");

const SpancontractStatus = document.getElementById("SpancontractStatus");

const toWei = (value) => ethers.utils.parseEther(value);
const fromWei = (value) => ethers.utils.formatEther(value);

button_createToken.addEventListener("click", deployToken);
button_transferTokens.addEventListener("click", transferToken);
button_approveTokens.addEventListener("click", approveToken);
//button_transferTokensWithoutGas.addEventListener("click",transferToken)
//button_approveTokensWithoutGas.addEventListener("click",approveToken)
button_balanceOf.addEventListener("click", balanceof);

let contract;

async function deployToken() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  spanTokenAddress.innerText = "Deploying...";
  const name = nameToken.value;
  const simbol = simbolToken.value;
  const supply = parseInt(supplyToken.value);

  const signer = provider.getSigner();

  const ABI = await fetch(
    "http://localhost:5500/artifacts/contracts/token.sol/Token.json"
  );
  const ABIjson = await ABI.json();

  const TokenFactory = await ethers.ContractFactory.fromSolidity(
    ABIjson
  ).connect(signer);
  const TokenContract = await TokenFactory.deploy(name, simbol, supply);
  await TokenContract.deployed();

  contract = TokenContract;

  spanTokenAddress.innerText = TokenContract.address;
}

async function transferToken() {
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();

  const To = adressTo.value;
  const value = mountToken.value;

  const mount = toWei(value);

  const tx = await contract.transfer(To, mount);
//   , {
//     gasLimit: 200000,
//     maxFeePerGas: ethers.utils.parseUnits("150","gwei"),
//     maxPriorityFeePerGas: ethers.utils.parseUnits("100","gwei"), 
//   }
    const gas = await contract.estimateGas.transfer(To, mount);
    console.log("el gas usado  para Transfer será:", gas );


  await tx.wait();
}

async function balanceof() {
  const address = inputBalanceOf.value;

  const tx = await contract.balanceOf(address);
  const balance = fromWei(tx);
  SpancontractStatus.innerText = balance;
}

async function approveToken() {
  const addressToApprove = inputAdressApprove.value;
  const valueToAppove = toWei(inputMountApprove.value);
  console.log("1");

  const tx = await contract.approve(addressToApprove, valueToAppove);
  await tx.wait();

  console.log("exit");
}

/// to 0xed6C0B634a8C5Cb78f6a59eC4992D4CB1E837180
