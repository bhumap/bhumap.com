import ListPropertyForm from '@/src/components/ListPropertyForm'
import axios from 'axios'
import React from 'react'

var fetchPropertyByID = async (id) =>{
  try {
    var res = await axios.get(`http://localhost:3000/api/properties/${id}`)
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