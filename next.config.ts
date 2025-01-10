import { NextConfig } from "next";
// @ts-ignore
import autoCert from "anchor-pki/auto-cert/integrations/next";

const withAutoCert = autoCert({
  enabledEnv: "development",
});

const nextConfig: NextConfig = {
  reactStrictMode: true, // Add your own configurations here
};

export default withAutoCert(nextConfig);
