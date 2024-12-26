import React from 'react'
import PropertySearch from './PropertySearch'
import queryString from 'query-string';
export const dynamic = 'force-dynamic'

var fetchSearchedProperties = async (searchParams) => {
  try {
    var res = await fetch(`${process.env.DOMAIN}/api/properties?${queryString.stringify(searchParams)}`, { cache: "no-store" });
    res = await res.json();
    return res.message
  } catch (error) {
    console.log(error);
  }
};

const page = ({searchParams}) => {

 


  return (
    <div>
        <PageComp searchParams={searchParams}/>
    </div>
  )
}

export default page


const PageComp = async({searchParams}) => {

  var properties = await fetchSearchedProperties(searchParams)


  return (
    <div>
        <PropertySearch properties={properties} query={searchParams} />
    </div>
  )
}