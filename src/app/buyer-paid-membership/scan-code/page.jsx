import React from 'react'
import Image from "next/image"
const Page = () => {
  return (
  <>
     <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">

<div className=' flex justify-center'>
    <Image width={400} height={400}  src={"/images/qr-code.jpg"} />
</div>
</div>
  
  </>
  )
}

export default Page