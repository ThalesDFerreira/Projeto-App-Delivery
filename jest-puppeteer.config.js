module.exports = {
  launch: {
    product: "chrome",
    headless: process.env.HEADLESS !== "false",
    slowMo: 5,
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--window-size=1360,768",
    ],
    defaultViewport: { width: 1350, height: 638 },
  },
  browserContext: "default",
};
