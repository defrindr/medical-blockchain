import Web3 from "web3";
import RekamMedisContract from "./contracts/RekamMedis.json"; // Your compiled smart contract artifacts

const getWeb3 = async () => {
  if (window.ethereum) {
    // Modern dapp browsers
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      return web3;
    } catch (error) {
      console.error("User denied account access");
    }
  } else if (window.web3) {
    // Legacy dapp browsers
    return new Web3(window.web3.currentProvider);
  } else {
    // Non-dapp browsers
    console.error(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};

const getContract = async (web3) => {
  try {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = RekamMedisContract.networks[networkId];
    return new web3.eth.Contract(
      RekamMedisContract.abi,
      deployedNetwork && deployedNetwork.address
    );
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
};

const initWeb3 = async () => {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = RekamMedisContract.networks[networkId];
  console.log(RekamMedisContract.networks);
  const contract = new web3.eth.Contract(
    RekamMedisContract.abi,
    deployedNetwork && deployedNetwork.address
  );
  return [web3, accounts, contract];
};

export { getWeb3, getContract, initWeb3 };

export default initWeb3;
