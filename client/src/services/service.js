import { axiosAPI } from "../helpers/axiosAPI";

const controllerAutenticar = async (data) => {
  try {
    const response = await axiosAPI.post("/api/autenticar", data);
    if (response.data !== null) {
      return response.data;
    }
  } catch (error) {
    return {
      success: false,
      message: "No se ha podido establecer la conexion",
    };
  }
};

const controllerGetAllPromotions = async () => {
  try {
    const response = await axiosAPI.get("/api/allPromotion");
    if (response.data != null) {
      return response.data;
    }
  } catch (error) {
    return {
      success: false,
      message: "No se ha podido establecer la conexion",
    };
  }
};

const controllerUpdatePromotion = async (data) => {
  try {
    const response = await axiosAPI.put("/api/updatePromotion", data);
    if (response.data != null) {
      return response.data;
    }
  } catch (error) {
    return {
      success: false,
      message: "No se ha podido establecer la conexion",
    };
  }
};

const controllerDeletePromotion = async (id) => {
  try {
    const response = await axiosAPI.delete(`/api/DeletePromotion/${id}`);
    if (response.data != null) {
      return response.data;
    }
  } catch (error) {
    return {
      success: false,
      message: "No se ha podido establecer la conexion",
    };
  }
};

const controllerCreatePromotion = async (data) => {
  try {
    const response = await axiosAPI.post("/api/createPromotion", data);
    if (response.data != null) {
      return response.data;
    }
  } catch (error) {
    return {
      success: false,
      message: "No se ha podido establecer la conexion",
    };
  }
};

export {
  controllerAutenticar,
  controllerGetAllPromotions,
  controllerUpdatePromotion,
  controllerDeletePromotion,
  controllerCreatePromotion,
};
