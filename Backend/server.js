const app = require("./src/app")
const PORT = require("./src/config/env").PORT ||8000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});