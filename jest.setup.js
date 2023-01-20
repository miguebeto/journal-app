import "whatwg-fetch"; // <-- yarn add whatwg-fetch
import "setimmediate";
import { getEnvironments } from "./src/helpers/getEnviroments";

require("dotenv").config({
  path: ".env.test",
});

jest.mock("./src/helpers/getEnviroments", () => ({
  getEnvironments: () => ({ ...process.env }),
}));
