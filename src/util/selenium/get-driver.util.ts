import { WebDriver, Builder, Browser } from "selenium-webdriver";

export const getChromeDriver = async (): Promise<WebDriver> => {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();
  return driver;
}
