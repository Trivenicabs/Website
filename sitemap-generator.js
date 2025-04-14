// sitemap-generator.js - Run this as part of your build process
const fs = require('fs');
const path = require('path');

// Configuration
const baseUrl = "https://trivenicabs.in"; // Replace with your actual domain
const outputPath = path.join(__dirname, 'public', 'sitemap.xml');

// City data - copied from your data.js to make the script standalone
const cities = [
  { name: "Delhi", region: "North India", coverage: "NCR Region", popularity: "high" },
  { name: "Agra", region: "North India", coverage: "City + 50km radius", popularity: "high" },
  { name: "Jaipur", region: "North India", coverage: "Pink City Area", popularity: "high" },
  { name: "Haridwar", region: "North India", coverage: "Temple Circuit", popularity: "medium" },
  { name: "Chandigarh", region: "North India", coverage: "Tri-city Area", popularity: "medium" },
  { name: "Shimla", region: "North India", coverage: "Hill Station Tours", popularity: "high" },
  { name: "Manali", region: "North India", coverage: "Adventure Routes", popularity: "high" },
  { name: "Amritsar", region: "North India", coverage: "Golden Temple Area", popularity: "medium" },
  { name: "Dehradun", region: "North India", coverage: "Valley Region", popularity: "medium" },
  { name: "Rishikesh", region: "North India", coverage: "Spiritual Circuit", popularity: "high" },
  { name: "Jodhpur", region: "North India", coverage: "Blue City Area", popularity: "medium" },
  { name: "Udaipur", region: "North India", coverage: "Lake City Region", popularity: "high" },
  { name: "Ayodhya", region: "North India", coverage: "Temple City", popularity: "high" },
  { name: "Ahmedabad", region: "West India", coverage: "City + Suburbs", popularity: "medium" }
];

// Tour details - these are the slugs from your tourDetails object
const tourDetailsSlugs = [
  "manali-tour-from-mumbai",
  "chardham-yatra-package",
  "shimla-from-mumbai",
  "rajasthan-tour",
  "kashmir-tour",
  "punjab-tour"
];

// Vehicle details - these are the vehicle types from your vehicleDetails array
const vehicleTypes = [
  "Sedan",
  "SUV",
  "Tempo-Traveller",
  "Luxury-Bus",
  "Bus"
];

// City routes data - defining the main city pairs
const cityRoutes = {
  "Delhi": ["Agra", "Haridwar", "Jaipur", "Chandigarh", "Shimla", "Manali", "Amritsar", "Dharamshala"],
  "Jaipur": ["Delhi", "Udaipur", "Jodhpur"],
  "Mumbai": ["Pune", "Lonavala", "Nashik"],
  "Chandigarh": ["Delhi", "Shimla", "Manali"],
  "Agra": ["Delhi", "Jaipur"],
  "Shimla": ["Delhi", "Chandigarh", "Manali"],
  "Manali": ["Delhi", "Chandigarh"],
  "Amritsar": ["Delhi", "Chandigarh"],
  "Haridwar": ["Delhi", "Rishikesh"]
};

function generateSitemap() {
  // Collect all routes
  let routes = [
    // Main routes
    { path: "/", priority: "1.0", changeFreq: "weekly" },
    { path: "/about", priority: "0.8", changeFreq: "monthly" },
    { path: "/services", priority: "0.9", changeFreq: "weekly" },
    { path: "/contact", priority: "0.8", changeFreq: "monthly" },
    { path: "/destinations", priority: "0.9", changeFreq: "weekly" },
    { path: "/car-rental", priority: "0.9", changeFreq: "weekly" },
    { path: "/tour-guide", priority: "0.8", changeFreq: "monthly" },
    { path: "/tourist-spots", priority: "0.8", changeFreq: "weekly" },
    { path: "/sitemap", priority: "0.7", changeFreq: "monthly" }
  ];
  
  // City pages
  cities.forEach(city => {
    routes.push({
      path: `/${city.name.toLowerCase()}`,
      priority: city.popularity === "high" ? "0.8" : "0.7",
      changeFreq: "weekly"
    });
  });
  
  // Tour package pages
  tourDetailsSlugs.forEach(slug => {
    routes.push({
      path: `/tour-package/${slug}`,
      priority: "0.8",
      changeFreq: "weekly"
    });
  });
  
  // Vehicle details pages
  vehicleTypes.forEach(vehicleType => {
    routes.push({
      path: `/vehicle-details/${vehicleType.toLowerCase().replace(/ /g, "-")}`,
      priority: "0.7",
      changeFreq: "weekly"
    });
  });
  
  // City route pages
  Object.keys(cityRoutes).forEach(cityName => {
    cityRoutes[cityName].forEach(destination => {
      routes.push({
        path: `/${cityName.toLowerCase()}/to/${destination.toLowerCase().replace(/ /g, "-")}`,
        priority: "0.7",
        changeFreq: "weekly"
      });
    });
  });

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
  
  return xml;
}

// Generate and save the sitemap
const sitemap = generateSitemap();
fs.writeFileSync(outputPath, sitemap);
console.log(`Sitemap generated at ${outputPath}`);


const robotsPath = path.join(__dirname, 'public', 'robots.txt');
let robotsContent = '';

// Try to read existing robots.txt
try {
  robotsContent = fs.readFileSync(robotsPath, 'utf8');
  
  // Check if sitemap is already mentioned
  if (!robotsContent.includes('Sitemap:')) {
    robotsContent += `\n\n# Sitemap location\nSitemap: ${baseUrl}/sitemap.xml`;
    fs.writeFileSync(robotsPath, robotsContent);
    console.log(`Updated robots.txt to include sitemap reference`);
  }
} catch (error) {
  // Create a new robots.txt if it doesn't exist
  robotsContent = `User-agent: *\nAllow: /\n\n# Sitemap location\nSitemap: ${baseUrl}/sitemap.xml`;
  fs.writeFileSync(robotsPath, robotsContent);
  console.log(`Created robots.txt with sitemap reference`);
}