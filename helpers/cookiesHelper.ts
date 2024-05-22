import { BrowserContext } from '@playwright/test';
import config from '../playwright.config';

export async function setAuthCookies(context: BrowserContext, accessToken: string, firstName: string, userID: string) {
    await context.addCookies([
        {
            name: "access_token",
            value: accessToken,
            url: config.use?.baseURL,
        },
        {
            name: "firstName",
            value: firstName,
            url: config.use?.baseURL,
        },
        {
            name: "userID",
            value: userID,
            url: config.use?.baseURL,
        },
    ]);
}
