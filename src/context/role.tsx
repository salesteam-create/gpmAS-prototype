import { createContext, useContext, useState, type ReactNode } from "react";

export type Role = "coach" | "athlete";

interface RoleState {
  role: Role;
  setRole: (r: Role) => void;
  /** The athlete whose personal experience is shown when role === "athlete". */
  athleteId: string;
}

const RoleContext = createContext<RoleState | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("coach");
  // Demo athlete identity — Eskil Hauge (Senior Squad striker).
  const athleteId = "p1";
  return (
    <RoleContext.Provider value={{ role, setRole, athleteId }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}
