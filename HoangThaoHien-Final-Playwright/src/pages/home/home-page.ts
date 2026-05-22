import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "../base-page"

export class HomePage extends BasePage {
    private lnkLoginLoc: Locator = this.page.getByRole("link", { name: "Log in", exact: true })
    private imgUserAvatarLoc: Locator = this.page.locator("//div[@data-testid='photos-route']//header//img[@role='presentation']")
    private btnUserAvatarLoc: Locator = this.page.getByRole("button", { name: "Your personal menu button" })
    private lnkViewProfileLoc: Locator = this.page.getByRole("menuitem", { name: "View profile" })
    private lnkViewProfileInPopUpLoc: Locator = this.page.getByRole("link", { name: "View profile" })
    private btnBookmarkLoc: Locator = this.page.getByRole("button", { name: "Bookmark" })

    constructor(page: Page) {
        super(page)
    }

    getPhotoOwnwerLocator(name: string): Locator {
        return this.page.getByRole("link", { name: name })
    }

    async gotoBrowser(url = "") {
        await this.page.goto(url)
    }

    async clickOnLoginLink() {
        await this.lnkLoginLoc.click()
    }

    async clickOnPhoto(index = 1) {
        await this.getImageLocator(index).click()
    }

    async hoverOnPhoto(index = 1) {
        await this.page.waitForLoadState("domcontentloaded")
        await this.getImageLocator(index).hover()
    }

    async hoverOnUserAvatar() {
        await this.imgUserAvatarLoc.hover()
    }

    async clickOnUserAvatar() {
        await this.btnUserAvatarLoc.click()
    }

    async clickOnViewProfileLinkOnHomePage() {
        await this.lnkViewProfileLoc.waitFor({ state: "visible" })
        await this.lnkViewProfileLoc.click()
    }
    async clickOnViewProfileLinkOnPopup() {
        await this.lnkViewProfileInPopUpLoc.waitFor({ state: "visible" })
        await this.lnkViewProfileInPopUpLoc.click()
    }

    async BookmarkPhotos(arr: number[]) {
        for (let i = 0; i < arr.length; i++) {
            await this.getImageLocator(arr[i]).hover()
            await this.getBookmarkButtonLocator(arr[i]).click()
        }
    }

}
