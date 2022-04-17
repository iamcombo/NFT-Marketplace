import { useMemo } from 'react';
import { Contract, ethers } from 'ethers';
import { marketplaceAddress } from '../../config';
import NFTMarketplace from '../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';

export function useContract(address, abi, providerOrSigner) {
  return useMemo(() => {
    try {
      if(!address || !abi || !providerOrSigner) return null;
      return new Contract(address, abi, providerOrSigner);
    } catch (error) {
      console.log('Failed to get contract', error);
      return null;
    }
  },[address, abi, providerOrSigner]);
}

export function useNFTContract({ readOnly }) {
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = provider.getSigner();
  return useContract(
    marketplaceAddress, 
    NFTMarketplace.abi,
    readOnly ? provider : signer
  );
}