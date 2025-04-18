import React from "react";
import { Config, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { XellarKitProvider, defaultConfig, darkTheme, lightTheme } from "@xellar/kit";
import { liskSepolia, polygonAmoy, sepolia} from "viem/chains";
 
const config = defaultConfig({
  appName: "Xellar",
  // Required for WalletConnect
  walletConnectProjectId: 'd2fcae952e3bd7b4e51fb295883cacdf',
 
  // Required for Xellar Passport
  xellarAppId: 'ca96fce5-cf74-4e2d-ac94-45cb9f8a874b',
  xellarEnv: "sandbox",
  chains: [polygonAmoy, sepolia, liskSepolia]
}) as Config;
 
const queryClient = new QueryClient();
 
export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider
          theme={lightTheme}
          // Fill this if you want to use Google Auth
          googleClientId="938284786122-ot8bign110hc4ml4louiv09hanpnft7o.apps.googleusercontent.com">
          {children}
        </XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
  