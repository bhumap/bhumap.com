import PropertyDetail from '@/src/components/PropertyDetail'
import Map from '../../../components/SimpleMap'
import '@/src/app/embla.css'
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

var fetchSingleProperty = async (slug) => {
  try {
    var res
    if(cookies().has("AccessToken")){
      const token = cookies().get("AccessToken").value
      res = await fetch(`${process.env.DOMAIN}/api/properties/single?AccessToken=${token}&propertyID=${slug}`, { cache: "no-store"});
    }else{
      res = await fetch(`${process.env.DOMAIN}/api/properties/single?propertyID=${slug}`, { cache: "no-store"});
    }
    res = await res.json();
    return res
  } catch (error) {
    return false
  }
};

const page = async ({params}) => {
  var property = await fetchSingleProperty(params.slug);

  if(!property?.success){
    notFound()
  }

  return (
    <div>
        <PropertyDetail property={property.message} />
    </div>
  )
}

export default page