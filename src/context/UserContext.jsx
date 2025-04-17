import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const [owner, setOwner] = useState(false)

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [properties, setProperties] = useState([]);
  const [rentals, setRentals] = useState([])

  const [requests, setRequests] = useState([]);
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {}, [properties]);

  const fetchRentals = async() => {
    try {
      const response = await fetch('/api/v1/tenants/properties', {
        method: 'GET',
        credentials: 'include'
      })
      if(response.ok){
        const res = await response.json();
        setRentals(res || [])
      }
    } catch (error) {
      console.log("failed to fetch properties")
      setRentals([])
    }
  }

  const fetchProperties = async () => {
    try {
      const response = await fetch("/api/v1/owners/your-properties", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const res = await response.json();
        setProperties(res || []);
      } else {
        throw new Error("failed to fetch properties");
      }
    } catch (error) {
      console.log("failed to fetch properties");
      setProperties([]);
    }
  };

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
      const isOwner = !res.user.rentDue;
      const enrichedUser = { ...res.user, owner: isOwner };
      setUser(res.user, { owner: isOwner } || null);
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

      await fetch("api/v1/owners/logout", {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const fetchRequests = async () => {
    const response = await fetch("/api/v1/owners/get-requests", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const res = await response.json();
      console.log(res);
      setRequests(res || []);
    }
  };

  const fetchAlerts = async () => {
    const response = await fetch("/api/v1/tenants/get-alerts", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const res = await response.json();
      console.log(res);
      setAlerts(res || []);
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
        refreshProperties: fetchProperties,
        requests,
        fetchRequests: fetchRequests,
        alerts,
        fetchAlerts: fetchAlerts,
        rentals,
        fetchRentals: fetchRentals
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
