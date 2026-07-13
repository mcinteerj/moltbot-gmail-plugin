/**
 * Local type definitions for shapes that were removed from the OpenClaw
 * plugin-sdk in the 2026.6.x channel-contract rework.
 *
 * `InboundMessage` and `ResolvedChannelAccount` no longer exist in
 * openclaw/plugin-sdk (2026.6.11), so we define a structurally
 * compatible `InboundMessage` here. `ResolvedGmailAccount` lives in
 * accounts.ts (it used to extend the now-gone `ResolvedChannelAccount`).
 */

export interface InboundMessage {
  channelId: string;
  accountId?: string;
  channelMessageId: string;
  threadId?: string;
  text: string;
  sender: {
    id: string;
    name?: string;
    isBot?: boolean;
  };
  /** Raw provider payload (GogPayload / GogSearchMessage) for downstream access. */
  raw?: any;
  isGroup?: boolean;
  replyTo?: {
    channelMessageId: string;
  };
  /** Optional attachment/media metadata populated by the monitor. */
  mediaPath?: string;
  mediaType?: string;
  mediaUrl?: string;
  /** Epoch milliseconds. */
  timestamp?: number;
}
