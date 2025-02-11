import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
