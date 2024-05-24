import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ConContext = createContext();

const ConProvider = ({ children }) => {
  const [user, setUser] = useState({
    user: null,
    token: "",
  });
    
  //default axios
  axios.defaults.headers.common["Authorization"] = user?.token;

  useEffect(() => {
    const data = localStorage.getItem("userInform");
    if (data) {
      const parseData = JSON.parse(data);
      setUser({
        ...user,
        user: parseData.user,
        token: parseData.token,
      });
    }

    // eslint-disable-next-line
  }, []);

  return (
    <ConContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </ConContext.Provider>
  );
};
export const ConState = () => {
  return useContext(ConContext);
};

export default ConProvider;
