/* eslint-disable @next/next/no-img-element */
export default function CardItem({ image, title, desc, price }) {
  async function handleBuy() {

  }
  
  return (
    <div className="max-w-[280px] border-2 hover:border-4 duration-150 border-slate-600 p-3">
      <img src='/assets/logo.png' className="pb-2" alt="" width={24} height={24} />
      <img src={image} alt='' width="250" />
      <div className="flex justify-between my-3">
        <div>
          <p className="font-semibold text-xl">{title}</p>
          <p className="font-xs">{desc}</p>
        </div>
        <div>
          <p className="font-semibold text-lg">{price} ETH</p>
          <p>Instant Price</p>
        </div>
      </div>
      <button className="w-full h-14 bg-purple-700 text-white" onClick={handleBuy}>Buy</button>
    </div>
  )
}
