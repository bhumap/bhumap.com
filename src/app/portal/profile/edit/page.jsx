import React from 'react'
// import EditProfile from '@/src/components/EditProfile'
import dynamic from 'next/dynamic'

const EditProfile = dynamic(() => import('@/src/components/EditProfile'), {
    ssr: false
})

const page = () => {
  return (
    <div>
      <EditProfile />
    </div>
  )
}

export default page