const app = require("./app");

const mongoose = require("mongoose");

mongoose
  // eslint-disable-next-line no-undef
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to database...");
  })
  .catch(() => {
    // eslint-disable-next-line no-undef
    process.exit(-1);
  });

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on PORT " + PORT);
});
