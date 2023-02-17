import { ethers } from "ethers";

const signButton = document.getElementById("signButton");
signButton.addEventListener("click", sign);

const toSignData = document.getElementById("toSignData");
const signTypedDataResult = document.getElementById("signTypedDataResult");

async function sign() {
  const data = toSignData.value;
  const hash1_data = ethers.utils.id(data);

  if (data) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const hash_Bytes = ethers.utils.arrayify(hash1_data);
      const signature_Data_Ethers = await signer.signMessage(hash_Bytes);

      ///////// FIRMA USANDO METODO JSON RPC - "personal_sign" /////////
      // const addressSigner = await signer.getAddress();
      //   const signature_Data_personal_sign = await ethereum.request({
      //     method: "personal_sign",
      //     params: [hash1_data, addressSigner],
      //   });
      //   console.log(
      //     "const signature_Data_personal_sign  ",
      //     signature_Data_personal_sign
      //   );

      ///////// VERIFICACION DE FIRMA CON ETHERS /////////
      // const nose2 = ethers.utils.verifyMessage( hash_Bytes, signature_Data_Ethers );

      signTypedDataResult.innerText = signature_Data_Ethers;
    } catch (error) {
      signTypedDataResult.innerText = error;
    }
  } else {
    signTypedDataResult.innerText = "INGRESA UN MENSAJE PARA FIRMAR";
  }
}

/// signer 0xcacEEc6e89E0891AFb74500464946533Be19Eac3
