"use client";

import ListPropertyForm2 from '@/src/components/ListPropertyForm2'
import axios from 'axios';


var fetchPropertyByID = async (id) =>{
  try {
    var res = await axios.get(`https://www.bhumap.com/api/listing/${id}`)
    return res.data.message
  } catch (error) {
    console.log(error)
  }
}

const page = async ({params}) => {
  var property = await fetchPropertyByID(params.id)

  return (
    <div>
      <ListPropertyForm2 property={property} />
    </div>
  )
}

export default page