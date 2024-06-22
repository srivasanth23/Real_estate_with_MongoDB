import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/view-all-residencies", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const createUser = async (email, token) => {
  try {
    await api.post(
      `/user/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

export const bookVisit = async (date, email, propertyId) => {
  try {
    await api.post(`/user/bookvisit/${propertyId}`, {
      email,
      id: propertyId,
      date: dayjs(date).format("DD/MM/YYYY"),
    });
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

export const removeBooking = async (id, email) => {
  try {
    await api.post(`/user/cancelbooking/${id}`, {
      email,
    });
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

export const addToFav = async (id, email) => {
  try {
    await api.post(`/user/addtofav/${id}`, { email });
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

export const getAllFavourites = async (email) => {
  try {
    const res = await api.get(`/user/getallfav`, {
      email,
    });
    console.log(res.data["favResidenciesId"]);
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

export const getAllBookings = async (email) => {
  try {
    const res = await api.post(`/user/allbookings`, {
      email,
    });
    console.log(res.data["bookedVisits"]);
  } catch (error) {
    toast.error("Something went wrong while fetching bookings");
    throw error;
  }
};


export const createResidency = async (data) => {
  console.log(data);
  try {
    const res = await api.post(`/residency/create`, {
      data,
    });
    console.log(res.data);
    toast.success("Property Added Successfully");
  } catch (error) {
    toast.error("Something went wrong, Please try again");
  }
};
