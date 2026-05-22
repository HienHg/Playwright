import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "../base-page"

export class LoginPage extends BasePage {
    private txtEmailLoc: Locator = this.page.getByRole("textbox", { name: "Email" })
    private txtPasswordLoc: Locator = this.page.getByRole("textbox", { name: "Password Forgot your password?" })
    private btnLoginLoc: Locator = this.page.getByRole("button", { name: "Login" })
    
    constructor(page: Page) {
        super(page)
    }

    async enterEmailAndPassword(email: string, password: string) {
        await this.txtEmailLoc.fill(email)
        await this.txtPasswordLoc.fill(password)
    }

    async clickOnLoginButton() {
        await this.btnLoginLoc.waitFor({ state: "visible" })
        await this.btnLoginLoc.click()
    }

}
