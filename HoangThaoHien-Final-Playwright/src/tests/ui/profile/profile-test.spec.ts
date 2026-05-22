import { test } from "@core/fixtures/fixture"
import { HomePage } from "@pages/home/home-page"
import { UserProfilePage } from "@pages/profile/user-profile-page"
import testData from "@tests/ui/profile/profile-data.json"
import { UserPhotoLikeType, UserType } from "@data-types/user-type"
import { generateName, genRandomArray } from "@core/utils/string-helper"

test.describe('Profile Test', () => {
    let homePage: HomePage
    let userProfilePage: UserProfilePage

    test.beforeEach(async ({ page, homeFixture, loginFixture }) => {
        homePage = new HomePage(page)
        userProfilePage = new UserProfilePage(page)
    });

    test("@Profile Verify when user follow a photographer", async ({ page }) => {
        await test.step("Click on the second photo on home page", async () => {
            await homePage.clickOnPhoto(2);
        });

        await test.step("Hover on icon user at the top left corner", async () => {
            await homePage.hoverOnUserAvatar();
        });

        await test.step("Click the View profile button", async () => {
            await homePage.clickOnViewProfileLinkOnPopup();
        });
    });

    test("@Profile Verify when updating the user information in the Profile page", async ({ page }) => {
        let firstName: string;
        let lastName: string;
        const data = testData.user_data as UserType
        const userData = { ...data };
        userData.newUsername = generateName();

        await test.step("Navigate to the Profile page", async () => {
            await userProfilePage.goToAccountSettingPage();
        });

        await test.step("Edit username", async () => {
            ({ firstName, lastName } = await userProfilePage.getFirstAndLastName());
            await userProfilePage.editUsername(userData.newUsername);
        });

        await test.step("Click on the Update Account button", async () => {
            await userProfilePage.clickOnUpdateAccountButton();
            await userProfilePage.verifyUpdateUserSuccessfully(userData.newUsername);
        });

        await test.step("Go to the Profile page by link", async () => {
            await userProfilePage.goToUserProfileLink(userData.newUsername);
        });

        await test.step("Verify that user full name is displayed", async () => {
            await userProfilePage.verifyUserFullname(firstName, lastName);
        });
    });

    test("@Profile Verify list of liked photos when user likes photos", async ({ page }) => {
        const data = testData.photo_data as UserPhotoLikeType;
        const photo = { ...data };
        photo.photo = genRandomArray(3, 1, 10);

        await test.step("Bookmark random photos in Homepage", async () => {
            await homePage.BookmarkPhotos(photo.photo);
        });

        await test.step("Go to Bookmarks by link", async () => {
            await userProfilePage.clickOnBookmarksLink();
        });

        await test.step("Verify that the number of bookmarks equals to the number of bookmarked photos", async () => {
            await userProfilePage.verifyQuantityBookmarkedPhoto(photo.photo.length);
        });

        await test.step("Clear all photos from the bookmarks", async () => {
            await userProfilePage.clearAllPhotosFromBookmarks();
            await userProfilePage.verifyTheDeletionOfBookmarks(photo.photo);
        });
    });
})