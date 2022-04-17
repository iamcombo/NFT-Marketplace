import Image from "next/image";
import Link from "next/link";
import { useConnect } from "../hooks/useConnect";
import { shortenAddress } from "../utils";

export default function Header() {
  const { connect, state } = useConnect();
  
  return (
    <div className="max-w-screen-lg m-auto h-20 flex items-center justify-between mb-20 px-2">
      <Image src='/assets/logo.png' alt='' width={40} height={40} />
      <div className="grid grid-cols-2 font-semibold ml-4">
        <Link href='/' passHref>
          <p className="cursor-pointer">Home</p>
        </Link>
        <Link href='/myassets' passHref>
          <p className="cursor-pointer">My Assets</p>
        </Link>
      </div>
      <div className="w-56 flex justify-between items-center font-semibold">
        <Link href='/create' passHref>
          <p className="cursor-pointer">Create</p>
        </Link>
        <button className="rounded-full border-2 border-slate-900 p-2 px-4" onClick={connect}>
          { state.data ?
            <div className="flex duration-150">
              <Image src='/assets/profile.svg' alt='' width={24} height={24} /> 
              {shortenAddress(state.data[0])}
            </div>
            : 'Connect Wallet'
          }
        </button>
      </div>
    </div>
  )
}
