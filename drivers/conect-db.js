const mongoose = require("mongoose");

/**Remota*/
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bwzbmmc.mongodb.net/GraphQl`;

mongoose.set("strictQuery", false);

mongoose
  .connect(URI)
  .then(() => {
    console.log("Conect with database");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
