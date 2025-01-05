const APIkey = "at_YzniOK82Xaoz6XRD5W71BvLtP3Vee";

const inputField = document.querySelector("input");
const logButton = document.querySelector("button");

const ipNumber = document.querySelector(".ip-number");
const locationAddress = document.querySelector(".location-address");
const timezone = document.querySelector(".Timezone");
const ispProvider = document.querySelector(".ISP-provider");

let latitude = 51.505;
let longitude = -0.09;

let map, marker;

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the map
  map = L.map("map").setView([latitude, longitude], 13); // Default view

  // Add the OpenStreetMap tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Add a marker to the map
  marker = L.marker([latitude, longitude]).addTo(map);
});

logButton.addEventListener("click", async e => {
  e.preventDefault();
  try {
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${APIkey}&ipAddress=${inputField.value}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    ispProvider.innerHTML = json.isp;
    timezone.innerHTML = `UTC ${json.location.timezone}`;
    locationAddress.innerHTML = json.location.region;
    ipNumber.innerHTML = json.ip;

    latitude = json.location.lat;
    longitude = json.location.lng;

    map.setView([latitude, longitude], 13); // Adjust the zoom level if needed

    marker.setLatLng([latitude, longitude]);

    marker
      .bindPopup(
        `<b>${json.ip}</b><br>${json.location.city}, ${json.location.region}`
      )
      .openPopup();

    console.log("json", json);
  } catch (error) {
    console.error(error.message);
  }
});
