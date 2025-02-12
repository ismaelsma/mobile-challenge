export default {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!**/vendor/**"],
  coverageDirectory: "coverage",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    ".(ts|tsx)": "ts-jest",
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testMatch: [
    "<rootDir>/src/tests/**/*.test.tsx",
    "<rootDir>/src/tests/**/*.test.ts",
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage",
    "package.json",
    "package-lock.json",
    "reportWebVitals.ts",
    "setupTests.ts",
    "index.tsx",
  ],
  moduleNameMapper: {
    "\\.scss$": "<rootDir>/src/tests/mocks/styleMocks.js",
  },
};
