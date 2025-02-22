import Hero from "@/src/components/Hero";
import Investments from "@/src/components/Investments";
import PropertyCardsGrid from "../components/PropertyCardsGrid";

var fetchMyPropertiesNearbyYou = async () => {
  try {
    var res = await fetch(`${process.env.DOMAIN}/api/properties`, {
      cache: "no-store",
    });
    res = await res.json();
    return res.message;
  } catch (error) {
    console.log(error);
  }
};

const page = async () => {
  var nearbyYouProperties = await fetchMyPropertiesNearbyYou();

  return (
    <div>
      <Hero />
      <h1>Test</h1>
    
      <div className="max-w-6xl mx-auto p-4">
        <PropertyCardsGrid
          title="Properties Nearby You"
          properties={nearbyYouProperties}
        />
      </div>
      <Investments />
      <div className="max-w-6xl mx-auto p-4">
        <PropertyCardsGrid title="Sponsored Properties" />
        <PropertyCardsGrid title="Popular Properties" search={true} />
      </div>
    </div>
  );
};

export default page;
