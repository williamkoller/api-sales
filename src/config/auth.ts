export default {
  jwt: {
    secret: String(process.env.JWT_SECRET),
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};
