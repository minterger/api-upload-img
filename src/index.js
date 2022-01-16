require("dotenv").config();
const app = require("./app");

app.set("port", process.env.PORT || 4040);

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
