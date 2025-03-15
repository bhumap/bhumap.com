"use client"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PropertyDetail from '@/src/components/PropertyDetail'
import '@/src/app/embla.css'
import Cookies from 'js-cookie';
import { getCookies } from '@/src/utils/getCookies';

const PropertyDetailPage = () => {
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const slug = params?.slug;

  useEffect(() => {
    const fetchProperty = async () => {
      if (!slug) return;

      try {
        setIsLoading(true);
        const accessToken = await getCookies('AccessToken');
        
        const url = new URL(`${process.env.NEXT_PUBLIC_DOMAIN}/api/properties/single`);
        url.searchParams.set('propertyID', slug);

        console.log(url, "url---->>")
        
        if (accessToken) {
          url.searchParams.set('AccessToken', accessToken);
        }

        const response = await fetch(url.toString(), { 
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (data.success) {
          setProperty(data.message);
        } else {
          setError('Property not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [slug]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!property) {
    return <div>No property found</div>;
  }

  return (
    <div>
      <PropertyDetail property={property} />
    </div>
  );
};

export default PropertyDetailPage;