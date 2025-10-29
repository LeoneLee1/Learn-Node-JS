const dotenv = require("dotenv");
const app = require("./src/app");

dotenv.config();

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
