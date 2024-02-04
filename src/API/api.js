import axios from "axios";

const API_BASE_URL = "https://myneighborhoodscope.com";
const API_BASE_URL_GITHUB =
  "https://lacpalaganas.github.io/VS/neighborhood.json";

async function fetchRentalsData() {
  try {
    const response = await fetch(`${API_BASE_URL_GITHUB}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching neighborhood rentals data:", error);
    throw error;
  }
}

async function fetchNhoodData() {
  try {
    const response = await fetch(`${API_BASE_URL_GITHUB}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching neighborhood rentals data:", error);
    throw error;
  }
}

async function fetchRentalsByID(nhoodID) {
  try {
    const response = await fetch(`${API_BASE_URL}/rentalApi.php`);
    const data = await response.json();
    var filterData = data.filter(
      (item) => item.neighborhood == nhoodID.toString() && item.active == 1
    );
    return filterData;
  } catch (error) {
    console.error("Error fetching rentals by id data:", error);
    throw error;
  }
}

async function fetchAllRentals() {
  try {
    const response = await fetch(`${API_BASE_URL}/rentalApi.php`);
    const data = await response.json();
    var sortData = data.sort((a, b) => b.id - a.id);
    return sortData;
  } catch (error) {
    console.error("Error fetching rentals by id data:", error);
    throw error;
  }
}

async function fetchAdsData() {
  try {
    const response = await fetch(`${API_BASE_URL}/zipAdsJson.php`);
    const data = await response.json();
    var filterData = data.filter((x) => x.active === 1);
    return filterData;
  } catch (error) {
    console.error("Error fetching zip Ads data:", error);
    throw error;
  }
}

export {
  fetchRentalsData,
  fetchRentalsByID,
  fetchNhoodData,
  fetchAdsData,
  fetchAllRentals,
};
