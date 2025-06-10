'use client';
import { createContext, useContext, useState, useEffect } from "react";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

const AvatarContext = createContext();

export function AvatarProvider({ children }) {
  const [userAvatar, setUserAvatar] = useState(null);
  const [username, setUsername] = useState("Anonymous");

  useEffect(() => {
    const fetchAvatar = async () => {
      const avatar = createAvatar(lorelei, {
        seed: Math.random().toString(),
        size: 128,
      });
      try {
        const uri = await avatar.toDataUri();
        setUserAvatar(uri);
      } catch (error) {
        console.error("Error generating avatar:", error);
        setUserAvatar("/placeholder.svg");
      }
    };
    fetchAvatar();
  }, []);

  const updateAvatar = (avatar) => setUserAvatar(avatar || getRandomAvatar(Math.random().toString()));
  const updateUsername = (name) => setUsername(name || "Anonymous");

  return (
    <AvatarContext.Provider value={{ userAvatar, username, updateAvatar, updateUsername }}>
      {children}
    </AvatarContext.Provider>
  );
}

export function useAvatar() {
  return useContext(AvatarContext);
}