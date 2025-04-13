import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  cities, 
  tourDetails, 
  vehicleDetails,
  
} from "./utils/data";
import {cityRoutesData} from "./utils/cityRoutesData";
const SiteMap = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  // Main routes of the website
  const mainRoutes = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About Us" },
    { path: "/services", name: "Services" },
    { path: "/contact", name: "Contact Us" },
    { path: "/destinations", name: "Destinations" },
    { path: "/car-rental", name: "Car Rental" },
    { path: "/tour-guide", name: "Tour Guide" },
    { path: "/tourist-spots", name: "Tourist Spots" },
  ];

  // City routes
  const cityRoutes = cities.map(city => ({
    path: `/${city.name}`,
    name: `${city.name} Services`
  }));

  // Tour package routes
  const tourPackageRoutes = Object.keys(tourDetails).map(slug => ({
    path: `/tour-package/${slug}`,
    name: tourDetails[slug].title
  }));

  // Vehicle routes
  const vehicleRoutes = vehicleDetails.map(vehicle => ({
    path: `/vehicle-details/${vehicle.type.toLowerCase().replace(/ /g, "-")}`,
    name: `${vehicle.type} Details`
  }));

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <Helmet>
        <title>Sitemap - Travel Services & Routes | Complete Travel Guide</title>
        <meta 
          name="description" 
          content="Complete sitemap of our travel website. Find all services, destinations, car rentals, and intercity travel routes across India."
        />
        <meta 
          name="keywords" 
          content="travel sitemap, India travel, cab services, tour packages, intercity travel, car rental"
        />
        <link rel="canonical" href="/sitemap" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-8 text-center">Site Map</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Main Pages */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Main Pages</h2>
          <ul className="space-y-2">
            {mainRoutes.map((route) => (
              <li key={route.path}>
                <Link 
                  to={route.path} 
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* City Services */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">City Services</h2>
          <ul className="space-y-2">
            {cityRoutes.map((route) => (
              <li key={route.path}>
                <Link 
                  to={route.path} 
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tour Packages */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Tour Packages</h2>
          <ul className="space-y-2">
            {tourPackageRoutes.map((route) => (
              <li key={route.path}>
                <Link 
                  to={route.path} 
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Vehicle Types */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Vehicle Details</h2>
          <ul className="space-y-2">
            {vehicleRoutes.map((route) => (
              <li key={route.path}>
                <Link 
                  to={route.path} 
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Routes */}
        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Intercity Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(cityRoutesData).map(cityName => (
              <div key={cityName} className="mb-4">
                <h3 className="font-medium text-gray-700 mb-2">From {cityName}</h3>
                <ul className="space-y-1 pl-4">
                  {cityRoutesData[cityName].map(route => (
                    <li key={`${cityName}-${route.destination}`}>
                      <Link 
                        to={`/${cityName}/to/${route.destination.toLowerCase().replace(/ /g, "-")}`} 
                        className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                      >
                        {cityName} to {route.destination}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteMap;