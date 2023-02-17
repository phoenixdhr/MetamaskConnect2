const { ethers } = require("ethers");
const { keccak256 } = require("ethers/lib/utils");

// TO 0x52549735702A71d31d9fc0745cC972DE61E349C3

const sendButton = document.getElementById("sendButton");
sendButton.addEventListener("click", send);


const toAddress2 = document.getElementById("toAddress2");
const valueETH2 = document.getElementById("valueETH2");
const contractStatus2 = document.getElementById("contractStatus2")



async function send() {

   
    try {

        contractStatus2.innerText="Start Transaction"
        const fromArray = await ethereum.request({ method: "eth_accounts" });
        const from = fromArray[0];
        const valueDec = ethers.utils.parseEther(valueETH2.value);
        const valueHex = ethers.utils.hexlify(valueDec);
        const to = toAddress2.value;
      
        const tx = {
          //from: from,
          to: to,
          //     nonce:
          value: valueHex,
          //     gasLimit:
          //    maxFeePerGas
        };
    
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
    
        const txSingRequestEHERS = await signer.signTransaction(tx)
            console.log(txSingRequestEHERS );
        const txRequestEHERS = await signer.sendTransaction(tx)
        console.log(txRequestEHERS.s)

        // const txRequestRPC = await ethereum.request({
        //   method: "eth_sendTransaction",
        //   params: [tx],
        // });

        await txRequestEHERS.wait()
        console.log(txRequestEHERS.w)
        contractStatus2.innerText="Transaction Success!"
   

    } catch (error) {
      contractStatus2.innerText="Transaction Fail!"

    }
}


