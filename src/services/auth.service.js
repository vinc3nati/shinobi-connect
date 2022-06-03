import axios from "axios";
import { AUTHSERVICE } from "../utils/constants";

export const loginUser = async ({ username, password }) =>
  await axios.post(AUTHSERVICE.LOGIN, {
    username,
    password,
  });

export const signupUser = async ({ username, password, firstName, lastName }) =>
  await axios.post(AUTHSERVICE.SIGNUP, {
    username,
    password,
    firstName,
    lastName,
  });

export const updateUser = async ({ userData, token }) =>
  await axios.post(
    AUTHSERVICE.UPDATE,
    { userData },
    {
      headers: {
        authorization: token,
      },
    }
  );
