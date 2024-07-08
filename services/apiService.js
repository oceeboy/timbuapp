import axios from "axios";

const URL = "https://api.timbu.cloud/products";
const organization_id = "54db846ca93b479a9cc67204674621ed";
const Appid = "6BWP9Z2WUC29X6C";
const Apikey = "2482205ddcff4363b4d7d5e8637f1c4920240705193638616942";

export const getProducts = async () => {
  try {
    const response = await axios.get(URL, {
      params: {
        organization_id,
        Appid,
        Apikey,
      },
    });
    return response.data.items;
  } catch (error) {
    throw error;
  }
};
