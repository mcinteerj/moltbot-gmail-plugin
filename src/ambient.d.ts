// Ambient module declarations for runtime dependencies that ship without
// TypeScript types. The Gmail plugin imports these at runtime; declaring
// them as `any` keeps the typecheck focused on the real SDK-contract
// surface (openclaw/plugin-sdk) rather than third-party typings.
declare module "sanitize-html";
