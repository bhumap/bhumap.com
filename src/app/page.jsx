import Hero from "@/src/components/Hero";
import Investments from "@/src/components/Investments";
import PropertyCardsGrid from "../components/PropertyCardsGrid";

var fetchMyPropertiesNearbyYou = async () => {
  try {
    console.log("fetching properties", process.env.NEXT_PUBLIC_DOMAIN);
    var res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/properties`, {
      cache: "no-store",
    });
    res = await res.json();
    return res.message;
  } catch (error) {
    console.log( "-------- home --------",error);
  }
};

const page = async () => {
  var nearbyYouProperties = await fetchMyPropertiesNearbyYou();
  console.log( "-------- home --------",nearbyYouProperties);

  return (
    <div>
      <Hero />     
    
      <div className="max-w-6xl mx-auto p-4">
        <PropertyCardsGrid
          title="Properties Nearby You"
          properties={nearbyYouProperties}
        />
      </div>
      <Investments />
      <div className="max-w-6xl mx-auto p-4">
        <PropertyCardsGrid properties={nearbyYouProperties} title="Sponsored Properties" />
        <PropertyCardsGrid properties={nearbyYouProperties} title="Popular Properties" search={true} />
      </div>
    </div>
  );
};

export default page;
