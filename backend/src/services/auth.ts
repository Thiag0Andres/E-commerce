"use strict";
import jwt from "jsonwebtoken";

export const generateToken = async (data: any) => {
  const SALT_KEY = 'p-lo?m-MksBK';
  
  return jwt.sign(data, SALT_KEY, { expiresIn: "365d" });
};