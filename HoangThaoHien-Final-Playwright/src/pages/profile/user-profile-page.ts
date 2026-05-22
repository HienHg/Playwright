import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "../base-page"
import { ROUTES } from "@core/const/routes"

export class UserProfilePage extends BasePage {
    private LnkEditProfileLoc: Locator = this.page.getByRole("link", { name: "Edit profile" })
    private txtUsernameLoc: Locator = this.page.getByRole("textbox", { name: "Username", exact: true })
    private txtFirstNameLoc: Locator = this.page.getByRole("textbox", { name: "First name" })
    private txtLastNameLoc: Locator = this.page.getByRole("textbox", { name: "Last name"  })
    private btnUpdateAccountLoc: Locator = this.page.getByRole("button", { name: "Update account" })
    private lnkBookmarksLoc: Locator = this.page.getByRole("link", { name: "Bookmarks" })

    constructor(page: Page) {
        super(page)
    } 

    async goToAccountSettingPage() {
        await this.page.goto(ROUTES.ACCOUNT_SETTING_ROUTE)
    }

    async goToUserProfileLink(new_username: string) {
        await this.page.goto(ROUTES.PROFILE_ROUTE(new_username))
    }

    async goToUserPhotoLikesLink(new_username: string) {
        await this.page.waitForLoadState('load');
        await this.page.goto(ROUTES.USER_PHOTO_FAVORITE_ROUTE(new_username))
    }

    async clickOnEditProfileLink() {
        await this.LnkEditProfileLoc.click()
    }

    async clickOnBookmarksLink() {
        await this.lnkBookmarksLoc.click()
    }

    async editUsername(username: string) {
        await this.txtUsernameLoc.clear()
        await this.txtUsernameLoc.fill(username)
    }

    async clickOnUpdateAccountButton() {
        await this.btnUpdateAccountLoc.click()
    }

    async getFirstAndLastName(): Promise<{ firstName: string, lastName: string }> {
        const firstName = await this.txtFirstNameLoc.inputValue()
        const lastName = await this.txtLastNameLoc.inputValue()
        return { firstName, lastName }
    }

    async verifyUpdateUserSuccessfully(username: string) {
        const lblNewUsernameLoc: Locator = this.page.locator(`//strong[text()='${username}']`)
        await expect(lblNewUsernameLoc).toBeVisible()
    }

    async verifyUserFullname(firstName: string, lastName: string) {
        const lblUserFullnameLoc: Locator = this.page.locator(`//div[text()='${firstName} ${lastName}']`)
        await expect(lblUserFullnameLoc).toBeVisible()
    }

    async verifyQuantityLikedPhoto(quantity: number) {
        const quantityLikedPhotoLoc = this.page.locator(`//a[text()='Likes']//span[text()='${quantity}']`)
        await expect(quantityLikedPhotoLoc).toBeVisible()
    }
    
    async verifyQuantityBookmarkedPhoto(quantity: number) {
        if (quantity === 1) {
            await expect(this.page.getByText(`${quantity} image`)).toBeVisible();
        } else {
            await expect(this.page.getByText(`${quantity} images`)).toBeVisible();
        }
    }

    async clearAllPhotosFromBookmarks() {
        await this.page.getByRole("button", { name: "Clear" }).click();
        await this.page.getByRole("button", { name: "Clear Bookmarks" }).click();
    }

    async verifyTheDeletionOfBookmarks(arr: number[]) {
        for (let i = 0; i < arr.length; i++) {
            await expect(this.getImageLocator(arr[i])).not.toBeVisible();
        }
    }
}
