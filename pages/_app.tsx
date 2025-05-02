import '../styles/globals.css';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { base, baseGoerli } from 'viem/chains';
import { publicProvider } from 'wagmi/providers/public';
import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { alchemyProvider } from 'wagmi/providers/alchemy';

// Configure chains for both mainnet and testnet
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [base, baseGoerli],
  [
    publicProvider(),
    alchemyProvider({ apiKey: 'YourAlchemyApiKey' }), // Optional: Add your Alchemy API key for better reliability
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'ProductiveFi',
  projectId: 'a14234612450c639dd0adcbb729ddfd8',
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider 
        chains={chains}
        theme={darkTheme({
          accentColor: '#4F46E5',
          borderRadius: 'medium',
        })}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}