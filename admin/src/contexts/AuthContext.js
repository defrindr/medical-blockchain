import AuthHelper from "helpers/AuthHelper";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const refreshAuth = useCallback(() => init(), []);

  const init = async () => {
    const response = await AuthHelper().getUser();
    setUser(response);
    // const [web3, accounts, contract] = await initWeb3();
    // setWeb3(web3);
    // setAccounts(accounts);
    // setContract(contract);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, refreshAuth }}>{children}</AuthContext.Provider>
  );
}
