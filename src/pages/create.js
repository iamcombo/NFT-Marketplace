import { ethers } from 'ethers';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { marketplaceAddress } from '../../config';
import NFTMarketplace from '../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';
import { useNFTContract } from '../hooks/useContract';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

export default function Create() {
  const router = useRouter();
  const contract = useNFTContract({readOnly: false});
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({ 
    price: '', 
    name: '', 
    description: '' 
  });

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(
        file,
        {progress: (prog) => console.log(`received: ${prog}`)}
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }  
  }

  async function uploadToIPFS() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return url;
    } catch (error) {
      console.log('Error uploading file: ', error);
    }  
  }

  async function listNFTForSale() {
    const url = await uploadToIPFS();

    /* next, create the item */
    const price = ethers.utils.parseUnits(formInput.price, 'ether');
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();
    let transaction = await contract.createToken(url, price, { value: listingPrice });
    await transaction.wait();
   
    router.push('/')
  }


  return (
    <div className='max-w-screen-lg m-auto'>
      <div className='grid justify-center'>
      <h2 className='font-bold text-3xl mb-4'>Create Item</h2>
      <div className='w-96'>
        <label className='block'>Asset Name:</label>
        <input 
          className='w-full border-2 border-slate-900 h-12 p-2 mb-4'
          placeholder='Enter Asset Name'
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <label className='block'>Asset Description:</label>
        <input 
          className='w-full border-2 border-slate-900 h-12 p-2 mb-4'
          placeholder='Enter Asset Description'
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <label className='block'>Asset Price:</label>
        <input 
          className='w-full border-2 border-slate-900 h-12 p-2 mb-4'
          placeholder='Enter Asset Price'
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <input
          type="file"
          name="Asset"
          className="mb-4"
          onChange={onChange}
        />
        {
          fileUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="rounded mt-4 mb-4" alt='' width="350" src={fileUrl} />
          )
        }
        <button onClick={listNFTForSale} className='w-full h-12 bg-pink-600 text-white p-2 block'>Create Digital Asset</button>
      </div>
      </div>
    </div>
  )
}
