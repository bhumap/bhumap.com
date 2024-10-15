import ListPropertyForm from '@/src/components/ListPropertyForm'
import axios from 'axios'
import React from 'react'
import { isDev } from "@/src/backend/helpers/util";

var fetchPropertyByID = async (id) =>{
  try {
    var res = await axios.get(`${isDev() ? process.env.NEXT_PUBLIC_LOCAL_URL: process.env.NEXT_PUBLIC_DOMAIN}api/properties/${id}`)
    return res.data.message
  } catch (error) {
    console.log(error)
  }
}

const page = async ({params}) => {
  var property = await fetchPropertyByID(params.id)

  return (
    <div>
      <ListPropertyForm property={property} />
    </div>
  )
}

export default page