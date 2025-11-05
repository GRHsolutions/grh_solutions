// hooks/useFinishSession.ts
import { useAuth } from "../../hooks/auth";

export const useFinishSession = () => {
  const { logout } = useAuth();

  return () => {
    logout();
  };
};
