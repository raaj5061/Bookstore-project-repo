import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Usertype } from "../components/UserRegistration";
import type { AddressType } from "../components/UserRegistration";

export const userContextObj = createContext<UserContextType>({
  isLoggedIn: false,
  currentUser: null,
  SetIsAdmin: () => {},
  err: "",
  login: async () => false,
  logout: () => {},
  isAdmin: false,
  addAddress: () => {},
  removeAddress: () => {},
  getDetails: async () => {},
  editUser: async () => {},
});

export type UserContextType = {
  isLoggedIn: boolean;
  currentUser: Usertype | null;
  err: string;
  SetIsAdmin: (b: boolean) => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  addAddress: (address: AddressType) => void;
  removeAddress: (id: string) => void;
  getDetails: (u: string) => void;
  editUser: (u: Usertype) => {};
};

type UserContextProps = {
  children: ReactNode;
};

function UserContext(props: UserContextProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [err, SetErr] = useState<string>("");
  const [currentUser, setUser] = useState<Usertype | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  async function getUser(username: string, password: string): Promise<boolean> {
    try {
      const res = await fetch("http://localhost:3000/user-api/user-login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      });
      if (res.status === 200) {
        const data = await res.json();
        console.log(data.payload);
        setUser(data.payload);
        setIsLoggedIn(true);
        SetErr("");
        return true;
      } else if (res.status === 401) {
        const data = await res.json();
        SetErr(data.message);
        setIsLoggedIn(false);
        return false;
      } else {
        SetErr("Network or server Error");
        setIsLoggedIn(false);
        return false;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      SetErr("An unexpected error occurred.");
      setIsLoggedIn(false);
      return false;
    }
  }

  const SetIsAdmin = (bool: boolean) => {
    setIsAdmin(bool);
  };

  const login = async (username: string, password: string) => {
    return await getUser(username, password);
  };

  const logout = async () => {
    let res = await fetch("http://localhost:3000/user-api/user-logout",{credentials:"include"});
    if (res.status === 200) {
      setIsLoggedIn(false);
      SetIsAdmin(false);
      setUser({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        role: "",
        address: [],
      });
    }
  };

  const addAddress = (address: AddressType) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        address: [...(currentUser.address || []), address],
      };
      setUser(updatedUser);
    }
  };
  const getDetails = async function (user: string) {
    let res = await fetch(`http://localhost:3000/users?username=${user}`);
    let data = await res.json();
    setUser(data);
  };
  async function editUser(update: Usertype) {
    let res = await fetch(`http://localhost:3000/users/${update.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    });
    if (res.status === 200) {
      setUser(update);
      alert("Details changed successfully , kindly login again");
      logout();
    } else {
      alert("failed to update the details");
    }
  }
  const removeAddress = (id: string) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        address: currentUser.address.filter((addr) => addr.id !== id),
      };
      setUser(updatedUser);
    }
  };
  //refresh
  useEffect(() => {
    fetch("http://localhost:3000/refresh", { credentials: "include" })
      .then((res) => {
        if (res.status === 401) {
          setUser(null);
          setIsLoggedIn(false);
          SetErr("Kindly relogin");
          throw new Error("Unauthorised error");
        }
        return res.json();
      })
      .then((user) => {
        setUser(user.user);
        console.log(user);
        SetErr("");
        setIsLoggedIn(true);
        if(currentUser?.role==='admin'){
          setIsAdmin(true)
        }
      });
  }, []);

  return (
    <userContextObj.Provider
      value={{
        SetIsAdmin,
        isLoggedIn,
        err,
        currentUser,
        login,
        logout,
        isAdmin,
        removeAddress,
        addAddress,
        getDetails,
        editUser,
      }}
    >
      {props.children}
    </userContextObj.Provider>
  );
}

export default UserContext;
