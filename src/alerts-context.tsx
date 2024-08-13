import { createContext, ReactNode, useContext, useRef, useState } from "react";
import { Alert, AlertsWrapper, AlertProps } from "./alert";

export const AlertsContext = createContext();

export function AlertsProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const addAlert = (alert: AlertProps) => {
    const id =
      Math.random().toString(36).slice(2, 9) +
      new Date().getTime().toString(36);
    setAlerts((prev) => [{ ...alert, id: id }, ...prev]);
    return id;
  };

  const dismissAlert = (id: AlertProps["id"]) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertsContext.Provider value={{ alerts, addAlert, dismissAlert }}>
      <AlertsWrapper>
        {alerts.map((alert) => (
          <Alert key={alert.id} {...alert} handleDismiss={() => {}} />
        ))}
      </AlertsWrapper>
      {children}
    </AlertsContext.Provider>
  );
}

export function useAlerts() {
  const [alertIds, setAlertIds] = useState([]);
  const alertIdsRef = useRef(alertIds);
  const { addAlert, dismissAlert } = useContext(AlertsContext);

  const addAlertWithId = (alert) => {
    const id = addAlert(alert);
    alertIdsRef.current.push(id);
    setAlertIds(alertIdsRef.current);
  };

  const clearAlerts = () => {
    alertIdsRef.current.forEach((id) => dismissAlert(id));
    alertIdsRef.current = [];
    setAlertIds([]);
  };
  return { addAlert: addAlertWithId, clearAlerts };
}
