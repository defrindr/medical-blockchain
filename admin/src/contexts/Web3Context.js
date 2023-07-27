import React, { createContext, useContext, useEffect, useState } from "react";
import initWeb3 from "../web3";

const Web3Context = createContext();

export function useWeb3() {
  return useContext(Web3Context);
}

export function Web3Provider({ children }) {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  const init = async () => {
    const [web3, accounts, contract] = await initWeb3();
    setWeb3(web3);
    setAccounts(accounts);
    setContract(contract);
  };

  useEffect(() => {
    init();
  }, []);

  if (!web3) {
    return <div>Loading...</div>; // Add a loading state while web3 is being initialized
  }

  return (
    <Web3Context.Provider value={{ web3, accounts, contract }}>
      {children}
    </Web3Context.Provider>
  );
}
