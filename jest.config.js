module.exports = {
  preset: "jest-puppeteer",
  rootDir: "./__tests__/end-to-end",
  testEnvironment: "../config/test_env.js",
  testSequencer: "../config/sequencer.js",
  setupFilesAfterEnv: [
    "../config/setupTest.js",
    "../config/matchers/other",
    "../config/matchers/mysql",
    "../config/matchers/puppeteer",
  ],
  testRegex: "./*\\.test\\.js$",
  testTimeout: 180000,
};
