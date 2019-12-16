const is_dev = process.env.NODE_ENV && process.env.NODE_ENV === "development";
const userinfo = is_dev ? "http://119.28.12.109:3100/mock/92/userinfo" : "/api/userinfo";
export default {
  userinfo
};
