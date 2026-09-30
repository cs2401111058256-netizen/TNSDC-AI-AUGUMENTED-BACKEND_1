const mongoose = require("mongoose");

const establishDatabaseConnection = async () => {
  try {
    const dbConnectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Successfully Connected: ${dbConnectionInstance.connection.host}`);
  } catch (connectionError) {
    console.error("Database connection failed:", connectionError.message);
    process.exit(1);
  }
};

module.exports = establishDatabaseConnection;