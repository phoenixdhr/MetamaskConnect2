import MetaMaskOnboarding from "@metamask/onboarding";

//const forwarderOrigin = "http://localhost:9011";

async function initialize() {
  const signers = await ethereum.request({ method: "eth_accounts" });
  // Importamos botones de index.HTML
  const onboardButton = document.getElementById("connectButton");
  const getAccounts = document.getElementById("getAccounts");
  const getAccountsResult = document.getElementById("getAccountsResult");

  // isMetaMaskInstalled, funcion que verifica que exista el objeto "window.ethereum" y se haya instalado "metamask"
  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const MetaMaskClientCheck = async () => {
    // Se evalua si existe el objeto window y si esta instalado Metamask
    if (isMetaMaskInstalled()) {

      // Se evalua si ya se tiene una cuenta conectada, el boton dira: Conectado! y estará desabilitado
      if (signers.length ) {
        onboardButton.innerText = "Conectado!";
        onboardButton.disabled = true;
      }else{

      // Si metamask está instalado, pero no se tiene ninguna cuneta conectada el boton dirá: "conectar" y estará habilidado
      // onClickConnect funcion onclick para conectarse a metamask
      onboardButton.onclick = onClickConnect;
      onboardButton.innerText = "connect MetaMaskClientCheck";
      onboardButton.disabled = false;
      }

    } else {
      // Si metamask no esta instalado, el botton dirá: Instalar metamask
      onboardButton.innerText = "instalar metamask";
      onboardButton.disabled = false;
      // onClickConnect funcion onclick para instalar metamask
      onboardButton.onclick = onClickInstall;
    }
  };

  // onClickConnect, funcion async que se conecta a metamask
  const onClickConnect = async () => {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      onboardButton.disabled = true;
      onboardButton.innerText = "Connected!";
      // window.location.reload();
      console.log("ethereum is connect?", ethereum.isConnected());
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

initialize();
// window.addEventListener("DOMContentLoaded", initialize);

//Falta: Agregar un listener que escuche cunado una cuenta demetamask se desconecta, debe comunicar al front
//Falta: Agregar un listener que esuche un cambio de red
