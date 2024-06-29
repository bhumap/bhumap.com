import React from 'react'
import SearchBar from './SearchBar'
import PropertyCardsGrid from '@/src/components/PropertyCardsGrid'

const PropertySearch = ({query,properties}) => {
  return (
    <div>
      <div className="max-w-6xl p-4 sm:py-10 mx-auto">
        <SearchBar query={query} />
        {
          properties.data.length ?
          <PropertyCardsGrid properties={properties} />
          :
          <div>
                <img
                  className="w-56 mx-auto"
                  src="/images/propertySearch.svg"
                  alt=""
                />
                <p className="text-gray-400 text-center -translate-y-full">
                  No Property Found!
                </p>
              </div>
        }
      </div>
    </div>
  )
}

export default PropertySearch