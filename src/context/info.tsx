import React, { ReactNode, createContext, useState, useContext } from "react";
import internal from "stream";

interface InfoProps {
  children: ReactNode;
}

interface InfoContextType {
  userId: number;
  setUserId: (userId: number) => void;
  schoolCode: string;
  setSchoolCode: (schoolCode: string) => void;
}

const InfoContext = createContext<InfoContextType>({
  userId: 0,
  setUserId: () => {},
  schoolCode: "",
  setSchoolCode: () => {},
});

export const useInfo = () => {
  return useContext(InfoContext);
};

export const InfoProvider = ({ children }: InfoProps) => {
  const [userId, setUserId] = useState(0);
  const [schoolCode, setSchoolCode] = useState("");

  const value = {
    userId,
    setUserId,
    schoolCode,
    setSchoolCode,
  };

  return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>;
};
