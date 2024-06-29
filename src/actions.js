"use server";
import { cookies } from "next/headers";
import { JWTVerify } from "./backend/helpers/jwt";

export const getProfile = async () => {
  var cookie = cookies();
  var token = cookie.get("AccessToken")?.value;
  var UserID = await JWTVerify(token);

  if (token && UserID) {
    return UserID;
  } else {
    return false;
  }
};

export const addToViewed = async (req) => {
  try {
    // var cookie = cookies();
    // var token = cookie.get("AccessToken")?.value;
    // var UserID = await JWTVerify(token);

    console.log(req);
  } catch (error) {
    console.log(error);
  }
};
