const evnCheckers = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY must be defined");
    }
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL must be defined");
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export { evnCheckers };
