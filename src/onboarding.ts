import type { ChannelSetupAdapter, OpenClawConfig } from "openclaw/plugin-sdk";

const channel = "openclaw-gmail" as const;

/**
 * Setup adapter for the 2026.6.x channel contract.
 *
 * NOTE: The old interactive OAuth onboarding wizard (gog CLI detection,
 * browser-based Google consent flow, API-credential prompts, etc.) is NOT
 * representable in the new `ChannelSetupAdapter` model, which only receives
 * a fixed generic input bag (`ChannelSetupInput`). Full Gmail OAuth
 * (clientId / clientSecret / refreshToken) must still be configured directly
 * in the channel config JSON or via the existing credentials helpers in
 * `./auth.js`. This adapter creates/updates the account shell so the
 * channel can be enabled and re-configured from setup surfaces.
 */
export const gmailSetupAdapter: ChannelSetupAdapter = {
  applyAccountConfig: ({ cfg, accountId, input }) => {
    const channels = (cfg.channels ?? {}) as Record<string, any>;
    const gmail = (channels[channel] ?? {}) as Record<string, any>;
    const accounts = { ...(gmail.accounts ?? {}) } as Record<string, any>;
    const existing = (accounts[accountId] ?? {}) as Record<string, any>;

    const nextAccount: Record<string, any> = {
      ...existing,
      enabled: true,
      email: (existing.email as string) || accountId,
      name: (input.name as string | undefined) ?? (existing.name as string) ?? accountId,
    };

    // Best-effort: if a refresh token was supplied, record it. The OAuth
    // clientId/clientSecret still need to be supplied via config (see note above).
    if (input.token && !existing.oauth) {
      nextAccount.oauth = {
        clientId: (existing.oauth?.clientId as string) ?? "",
        clientSecret: (existing.oauth?.clientSecret as string) ?? "",
        refreshToken: input.token,
      };
    }

    accounts[accountId] = nextAccount;

    return {
      ...cfg,
      channels: {
        ...channels,
        [channel]: {
          ...gmail,
          enabled: true,
          accounts,
        },
      },
    };
  },
};
