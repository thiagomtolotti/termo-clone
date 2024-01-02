import { createContext, useState } from "react";

interface DeviceProviderProps {
  children: React.ReactNode;
}

interface DeviceContextType {
  notification: string;
  renderNotification: React.Dispatch<React.SetStateAction<string>>;
}

export const DeviceContext = createContext<DeviceContextType>(
  {} as DeviceContextType
);

export const DeviceProvider = ({ children }: DeviceProviderProps) => {
  const [notification, renderNotification] = useState<string>("");

  return (
    <DeviceContext.Provider value={{ notification, renderNotification }}>
      {children}
    </DeviceContext.Provider>
  );
};
