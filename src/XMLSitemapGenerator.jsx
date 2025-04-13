import React, { useEffect, useState } from "react";
import { 
  cities, 
  tourDetails, 
  vehicleDetails
} from "./utils/data";

import {cityRoutesData} from "./utils/cityRoutesData";

const XMLSitemapGenerator = () => {
  const [xmlContent, setXmlContent] = useState("");
  const baseUrl = "https://trivenicabs.in"; // Replace with your actual domain

  useEffect(() => {
    generateSitemap();
  }, []);

  const generateSitemap = () => {
    // Collect all routes
    const routes = [
      // Main routes
      { path: "/", priority: "1.0", changeFreq: "weekly" },
      { path: "/about", priority: "0.8", changeFreq: "monthly" },
      { path: "/services", priority: "0.9", changeFreq: "weekly" },
      { path: "/contact", priority: "0.8", changeFreq: "monthly" },
      { path: "/destinations", priority: "0.9", changeFreq: "weekly" },
      { path: "/car-rental", priority: "0.9", changeFreq: "weekly" },
      { path: "/tour-guide", priority: "0.8", changeFreq: "monthly" },
      { path: "/tourist-spots", priority: "0.8", changeFreq: "weekly" },
      { path: "/sitemap", priority: "0.7", changeFreq: "monthly" },
      
      // City pages
      ...cities.map(city => ({
        path: `/${city.name}`,
        priority: city.popularity === "high" ? "0.8" : "0.7",
        changeFreq: "weekly"
      })),
      
      // Tour package pages
      ...Object.keys(tourDetails).map(slug => ({
        path: `/tour-package/${slug}`,
        priority: "0.8",
        changeFreq: "weekly"
      })),
      
      // Vehicle details pages
      ...vehicleDetails.map(vehicle => ({
        path: `/vehicle-details/${vehicle.type.toLowerCase().replace(/ /g, "-")}`,
        priority: "0.7",
        changeFreq: "weekly"
      })),
      
      // City route pages
      ...Object.keys(cityRoutesData).flatMap(cityName => 
        cityRoutesData[cityName].map(route => ({
          path: `/${cityName}/to/${route.destination.toLowerCase().replace(/ /g, "-")}`,
          priority: "0.7",
          changeFreq: "weekly"
        }))
      )
    ];

    // Generate XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    routes.forEach(route => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
      xml += `    <changefreq>${route.changeFreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      const today = new Date().toISOString().split('T')[0];
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    
    setXmlContent(xml);
  };

  const downloadSitemap = () => {
    const element = document.createElement("a");
    const file = new Blob([xmlContent], { type: "text/xml" });
    element.href = URL.createObjectURL(file);
    element.download = "sitemap.xml";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">XML Sitemap Generator</h1>
      <p className="mb-4 text-gray-700">
        This utility generates an XML sitemap for all your website's pages. 
        Download the file and place it in your public folder.
      </p>
      
      <div className="mb-6">
        <button 
          onClick={downloadSitemap}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Download sitemap.xml
        </button>
      </div>
      
      <div className="bg-gray-100 p-4 rounded-lg max-h-[500px] overflow-auto">
        <pre className="whitespace-pre-wrap text-xs">
          {xmlContent}
        </pre>
      </div>
      
      <div className="mt-6 text-gray-600">
        <p className="font-semibold">Instructions:</p>
        <ol className="list-decimal pl-6 mt-2 space-y-2">
          <li>Download the sitemap.xml file using the button above</li>
          <li>Place it in the public folder of your React application</li>
          <li>Submit the sitemap URL to Google Search Console and other search engines</li>
          <li>Update your robots.txt to include: Sitemap: https://trivenicabs.in/sitemap.xml</li>
        </ol>
      </div>
    </div>
  );
};

export default XMLSitemapGenerator;