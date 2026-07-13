import { type ChannelThreadingAdapter } from "openclaw/plugin-sdk/channel-runtime";

export const gmailThreading: ChannelThreadingAdapter = {
  buildToolContext: ({ context, hasRepliedRef }) => ({
    currentThreadTs: context.ReplyToId,
    hasRepliedRef,
  }),
};
