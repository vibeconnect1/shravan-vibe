import { getItemInLocalStorage } from "../utils/localStorage";
import axiosInstance from "./axiosInstance";

const token = getItemInLocalStorage("TOKEN");

export const login = async (data) => axiosInstance.post("/login.json", data);
export const getSiteAsset = async () => axiosInstance.get("/site_assets.json", {
    params: {
      token: token
    }
  });


  export const getUnitAsset = async (floorId) => axiosInstance.get("/units.json", {
    params: {
      token: token,
      mob:1,
      q: {
          floor_id_eq: floorId
        }
    }
  });

  // mob=1&q%5Bfloor_id_eq%5D=22

  export const getFloorAsset = async (buildingId) => axiosInstance.get("/floors.json", {
    params: {
      token: token,
      mob: 1,
        q: {
          building_id_eq: buildingId
        }
    }
  });


  export const getGroupAsset = async () => axiosInstance.get("/asset_groups.json", {
    params: {
      token: token
    }
  });


  // ob=1&q%5Bbuilding_id_eq%5D=18"

  export const getCategoryAsset = async () => axiosInstance.get("/categories.json", {
    params: {
      token: token
    }
  });

  export const getVendorsAsset = async () => axiosInstance.get("/vendors.json", {
    params: {
      token: token
    }
  });

  

export const getSiteAssetDetails = async (id) => axiosInstance.get(`/site_assets/${id}.json`, {
    params: {
      token: token
    }
  });
export const postSiteAsset = async (data) => axiosInstance.post(`/site_assets.json`,data,{
  params: {
      token: token
    }
});
  
