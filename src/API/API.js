import moment from 'moment';
import { API_KEY, URL } from '../constans';

const fetchCategories = async () => {
  const response = await fetch(`${URL}categories/?api_key=${API_KEY}`);
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    console.error('Error: ' + response.status);
  }
};

const fetchBrands = async () => {
  const response = await fetch(`${URL}categories/1/marks?api_key=${API_KEY}`);
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    console.error('Error: ' + response.status);
  }
};

const fetchEngines = async () => {
  const response = await fetch(`${URL}type?api_key=${API_KEY}`);
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    console.error('Error: ' + response.status);
  }
};
const fetchGearBoxes = async () => {
  const response = await fetch(
    `${URL}categories/1/gearboxes?api_key=${API_KEY}`
  );
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    console.error('Error: ' + response.status);
  }
};

const fetchModels = async (model) => {
  const response = await fetch(
    `${URL}categories/1/marks/${model}/models?api_key=${API_KEY}`
  );
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    console.error('Error: ' + response.status);
  }
};

const fetchCarsList = async (brand, model, year, engine, gearbox) => {
  const response = await fetch(
    `${URL}search?api_key=${API_KEY}&category_id=1&marka_id=${brand}&model_id=${model}&yers=${year}&fuel_id=${engine}&gear_id=${gearbox}`
  );
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    console.error('Error: ' + response.status);
  }
};

const fetchCar = async (carID) => {
  const response = await fetch(
    `${URL}info?api_key=${API_KEY}&auto_id=${carID}`
  );
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    console.error('Error: ' + response.status);
  }
};

const fetchAveragePrice = async (brand, model, year, engine, gearbox) => {
  const currentYear = moment(year).format('YYYY');

  const response = await fetch(
    `${URL}average_price?api_key=${API_KEY}&category_id=1&marka_id=${brand}&model_id=${model}&yers=${currentYear}&fuel_id=${engine}&gear_id=${gearbox}`
  );
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    console.error('Error: ' + response.status);
  }
};

const fetchPhotoOfCar = async (carID) => {
  const response = await fetch(`${URL}fotos/${carID}?api_key=${API_KEY}`);
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    console.error('Error: ' + response.status);
  }
};

export {
  fetchPhotoOfCar,
  fetchAveragePrice,
  fetchCar,
  fetchCarsList,
  fetchEngines,
  fetchModels,
  fetchGearBoxes,
  fetchCategories,
  fetchBrands,
};
