export const web3Config = {
  chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID || 137),
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://polygon-rpc.com'
}
