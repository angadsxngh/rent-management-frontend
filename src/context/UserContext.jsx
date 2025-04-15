import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [properties, setProperties] = useState([])

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
  }, [properties])

  const fetchProperties = async() => {
    try {
      const response = await fetch('/api/v1/owners/your-properties', {
        method: 'GET',
        credentials: 'include'
      })

      if(response.ok){
        const res = await response.json();
        console.log("context log", res)
        setProperties(res || [])
        console.log("context properties",properties)
      } else{
        throw new Error('failed to fetch properties')
      }
    } catch (error) { 
      console.log("failed to fetch properties")
      setProperties([])
    }
  }

  const fetchUser = async () => {
    try {
      let response = await fetch("/api/v1/owners/get-user", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        response = await fetch("/api/v1/tenants/get-user", {
          method: "GET",
          credentials: "include",
        });
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status}`);
      }

      const res = await response.json();
      console.log(res.user);
      setUser(res.user || null);
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
      localStorage.removeItem("user");
    }
  };

    const logout = async () => {
      try {
        await fetch("/api/v1/tenants/logout", {
          method: "POST",
          credentials: "include",
        });

        await fetch('api/v1/owners/logout', {
          method: 'POST',
          credentials: 'include'
        })

          setUser(null);
          localStorage.removeItem("user");
      } 


    catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        refreshUser: fetchUser,
        properties,
        refreshProperties: fetchProperties
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
