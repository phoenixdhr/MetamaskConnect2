import MetaMaskOnboarding from "@metamask/onboarding";
import {deploy} from "./delpoy"

//const forwarderOrigin = "http://localhost:9011";

function initialize() {
  // Importamos botones de index.HTML
  const onboardButton = document.getElementById("connectButton");
  const getAccounts = document.getElementById("getAccounts");
  const getAccountsResult = document.getElementById("getAccountsResult");


  // isMetaMaskInstalled, funcion que verifica que exista el objeto "window.ethereum" y se haya instalado "metamask" 
  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const MetaMaskClientCheck = () => {
    if (isMetaMaskInstalled()) {
      // Si metamask está instaaldo, el boton dirá: "conectar"
      onboardButton.innerText = "connect";

      // onClickConnect funcion onclick para conectarse a metamask
      onboardButton.onclick = onClickConnect;

    } else {
      // Si metamask no esta instalado, el botton dirá: Instalar metamask
      onboardButton.innerText = "instalar metamask";

      // onClickConnect funcion onclick para instalar metamask
      onboardButton.onclick = onClickInstall;
    }
  };


  // onClickConnect, funcion async que se conecta a metamask
  const onClickConnect = async () => {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.error(error);
    }
  };

  // onClickInstall, funcion que usa la libreria @metamask/onboarding, para isntalar metamask
  const onClickInstall = () => {
    const onboarding = new MetaMaskOnboarding();
    onboardButton.innerText = "Onboarding in progress";
    onboardButton.disabled = true;
    onboarding.startOnboarding();
  };

  //  Listener del boton "getAccounts", que muestra el primer address.
  getAccounts.addEventListener("click", async () => {
    const address = await ethereum.request({ method: "eth_requestAccounts" });
    getAccountsResult.innerText = address[0];
  });

  MetaMaskClientCheck();
}

window.addEventListener("DOMContentLoaded", initialize);


const deployButton= document.querySelector("#deployButton")
deployButton.addEventListener("click", deploy)


