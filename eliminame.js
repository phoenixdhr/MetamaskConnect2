const { ethers, logger } = require("ethers")



const value = "1"



const valueWei_FormatUnits = ethers.utils.formatUnits(value  ,"ether")
const velueWei_FormatEther = ethers.utils.formatEther(1)





const velueWei_ParceUnits = ethers.utils.parseUnits(valueWei_FormatUnits)
const velueWei_ParceEther = ethers.utils.parseEther(velueWei_FormatEther)


console.log("valueWei_FormatUnits ===>>>   ",valueWei_FormatUnits);
console.log("velueWei_FormatEther ===>>>   ",velueWei_FormatEther);


console.log("velueWei_ParceUnits ===>>>   ",velueWei_ParceUnits);
console.log("velueWei_ParceEther ===>>>   ",velueWei_ParceEther);