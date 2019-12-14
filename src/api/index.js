const is_dev = process.env.NODE_ENV && process.env.NODE_ENV === "development";
const userinfo = is_dev ? "/mock/userinfo.json" : "/api/userinfo";
export default {
  userinfo
};
