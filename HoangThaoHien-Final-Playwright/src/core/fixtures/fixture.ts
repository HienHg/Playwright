import { test as base } from "@playwright/test";
import { HomePage } from "@pages/home/home-page";
import { LoginPage } from "@pages/login/login-page";
require('dotenv').config();

type MyFixture = {
    homeFixture: HomePage
    loginFixture: LoginPage
}

export const test = base.extend<MyFixture>({
    loginFixture:
        async ({ page }, use) => {
            const email = process.env.USER_NAME as string
            const password = process.env.PASSWORD as string
            const loginPage = new LoginPage(page)
            await loginPage.enterEmailAndPassword(email, password)
            await loginPage.clickOnLoginButton()
            await use(loginPage)
        },

    homeFixture:
        async ({ page }, use) => {
            const homePage = new HomePage(page)
            await homePage.gotoBrowser()
            await homePage.clickOnLoginLink()
            await use(homePage)
        },
})