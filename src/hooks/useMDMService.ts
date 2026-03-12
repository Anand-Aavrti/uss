import { useEffect, useState } from "react";
import { useAuth } from "./useAuthUser";

// hooks/useMDMService.ts
export function useMDMService() {
  const { user } = useAuth(); // USS user
  const [mdmActivated, setMDMActivated] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Check if MDM service is activated for this USS user
    const mdmData = localStorage.getItem(`mdm_service_${user.userId}`);
    setMDMActivated(!!mdmData);
  }, [user]);

  const activateMDM = async () => {
    // Call MDM-specific tenant/user creation APIs
    // Store MDM data separately
    localStorage.setItem(`mdm_service_${user.userId}`, JSON.stringify(mdmData));
  };

  return { mdmActivated, activateMDM };
}
