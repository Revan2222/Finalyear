const map = L.map('map').setView([22.9734, 78.6569], 5); // Center of India

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Mining locations with marker info
const miningData = [
  {
    name: "Jharia Coalfield",
    state: "Jharkhand",
    mineral: "Coal",
    lat: 23.7401,
    lng: 86.4194,
  },
  {
    name: "Bailadila Mines",
    state: "Chhattisgarh",
    mineral: "Iron Ore",
    lat: 18.6928,
    lng: 81.111,
  },
  {
    name: "Kudremukh",
    state: "Karnataka",
    mineral: "Iron Ore",
    lat: 13.5633,
    lng: 75.2546,
  },
  {
    name: "Koraput Bauxite Belt",
    state: "Odisha",
    mineral: "Bauxite",
    lat: 19.2022,
    lng: 82.5537,
  },
  {
    name: "Kolar Gold Fields",
    state: "Karnataka",
    mineral: "Gold",
    lat: 12.9507,
    lng: 78.2754,
  },
  {
    name: "Zawar Mines",
    state: "Rajasthan",
    mineral: "Zinc & Lead",
    lat: 24.4341,
    lng: 73.6926,
  }
];

// Add markers
miningData.forEach(site => {
  L.marker([site.lat, site.lng])
    .addTo(map)
    .bindPopup(`<strong>${site.name}</strong><br>State: ${site.state}<br>Mineral: ${site.mineral}`);
});
