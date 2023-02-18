const { PORT = 4050 } = process.env;
const app = require("./app");

const listener = () => console.log(`Listening on port : ${PORT}`);
app.listen(PORT, listener);
