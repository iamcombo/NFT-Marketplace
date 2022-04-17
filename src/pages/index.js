import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import CardItem from '../components/CardItem';
import { useNFTContract } from '../hooks/useContract';

export default function Home() {
  const contract = useNFTContract({readOnly: true});
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const data = await contract.fetchMarketItems();
    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId._hex);
      
      const res = await fetch(tokenUri);
      const meta = await res.json();
      
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta?.image,
        name: meta?.name,
        description: meta?.description,
      };
      return item;
    }))
    setNfts(items);
    setLoadingState(false);
  }

  if(loadingState) return <Loading />
  if (!nfts.length) return <h1 className="px-20 py-10 text-xl">No items in marketplace</h1>
  return (
    <div className='max-w-screen-lg m-auto'>
      <div className='grid grid-cols-3'>
        { nfts.map((nft, i) => (
          <CardItem 
            key={i}
            image={nft.image}
            title={nft.name}
            desc={nft.description}
            price={nft.price}
          />
        ))}
      </div>
    </div>
  )
}
