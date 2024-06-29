import PropertyCardsGrid from "../../../components/PropertyCardsGrid2";
import { IoArrowForwardSharp } from "react-icons/io5";

const fetchMyPropertiesNearbyYou = async () => {
  try {
    const res = await fetch(`https://www.bhumap.com/api/listing`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.message;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const Page = async ({params}) => {
  const alldata = await fetchMyPropertiesNearbyYou();
  const nearbyYouProperties = alldata?.data?.filter(property => property.category === params.id);

  return (
    <div>
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="params-title">{params.id} <IoArrowForwardSharp /> ({nearbyYouProperties.length} products available)</h1>
          <PropertyCardsGrid
          properties={nearbyYouProperties}
        />
      </div>
    </div>
  );
};

export default Page;
