import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.user ?? null)?.currentUser?.accessToken || null;
// const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2ZlYzM3MTQ0YjE2YjIzMDRhMDUwMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NTEzNDM3NCwiZXhwIjoxNjY1MzkzNTc0fQ.Sscr_FA-ybAgpkOP0P7UHjEjHmB1ixjmJ8gzb8stDJs"


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
