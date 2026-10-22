import type { RhmAdapter } from "./RhmAdapter";
import { SimulatedAdapter } from "./simulated";
import { LiveAdapter } from "./live";
import { IdentitySession } from "./identity";

export interface RhmEnv {
  VITE_RHM_MODE?: string;
  VITE_RHM_API_BASE?: string;
  VITE_RHM_IDENTITY_BASE?: string;
}

export type RhmMode = RhmAdapter["mode"];

/** Pure mode selection: only the exact value "live" opts into the live stack. */
export const resolveMode = (env: RhmEnv): RhmMode => (env.VITE_RHM_MODE === "live" ? "live" : "simulated");

export const apiBaseFromEnv = (env: RhmEnv): string => env.VITE_RHM_API_BASE?.trim() || "http://127.0.0.1:8001";

/** Identity defaults to the API base when a separate identity origin is not configured. */
export const identityBaseFromEnv = (env: RhmEnv): string => env.VITE_RHM_IDENTITY_BASE?.trim() || apiBaseFromEnv(env);

export const createSession = (env: RhmEnv): IdentitySession =>
  new IdentitySession(identityBaseFromEnv(env), apiBaseFromEnv(env));

/**
 * The selected adapter for a mode. In live mode there is no adapter until a
 * session has logged in (returns null) — callers must not fall back to simulated.
 */
export function selectAdapter(mode: RhmMode, env: RhmEnv, session?: IdentitySession | null): RhmAdapter | null {
  if (mode === "simulated") return new SimulatedAdapter();
  return session ? new LiveAdapter(apiBaseFromEnv(env), session) : null;
}
