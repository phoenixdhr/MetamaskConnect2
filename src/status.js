// import "./metamask"
const network = document.getElementById("network");
const chainId = document.getElementById("chainId");
const accounts = document.getElementById("accounts");

async function Status(params) {
  
  // Se detecta si se tiene una cuenta conectada, eso se realiza llamando las address
  accounts.innerText = await ethereum.request({ method: "eth_accounts" });

  // Se detecta la Chain ID  a la que MEtamask esta conectada, el return es un hexadecimal
  chainId.innerText =parseInt(    await ethereum.request({ method: "eth_chainId" }),    16  );

  // Este metodo es lo mismo que chain ID, pero esta en decimal
  const red = await ethereum.request({ method: "net_version" });


  // De acuerdo al ChainID, se retornará el nombre de la RED
  switch (true) {
    case red == "1":
      network.innerText = "Ethereum";
      break;
    case red == "97":
      network.innerText = "Test BSC";
      break;
    case red == "1337":
      network.innerText = "LocalHost";
      break;
    case red == "5":
      network.innerText = "Goerli";
      break;

    default:
      network.innerText = red;
      break;
  }

  // Detecta el cambio de la red, y lo muestra en el FRont
  ethereum.on("chainChanged", handleChainChanged);

  function handleChainChanged() {
    // We recommend reloading the page, unless you must do otherwise
     window.location.reload();
  }



// Detecta el cambio de address
  ethereum.on("accountsChanged", () => {
    window.location.reload();
  });


}

Status();
