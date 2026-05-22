import { Locator, Page } from "@playwright/test";

export class BasePage {
    page : Page
    constructor(page: Page) {
        this.page = page
    }

    async inputTextBoxWithLabel(label: string, value: string, index = 1) {
        await this.page.locator(`(//input[preceding::*[normalize-space(text())='${label}'] or @placeholder='${label}'])[${index}]`).fill(value);
    }

    async clickOnButton(label: string) {
        await this.page.locator(`//button[text()='${label}']`).click();
    }

    async resetMousePosition() {
        await this.page.mouse.click(0, 0)
    }

    getFiguresLoc(index: number, el: string): Locator {
        return this.page.locator(`//figure[@data-masonryposition='${index}']${el}`).first();
    }

    getImageLocator(index: number): Locator {
        return this.getFiguresLoc(index, "//img[@itemprop='thumbnailUrl']");
    }

    getLikeButtonLocator(index: number): Locator {
        return this.getFiguresLoc(index, "//button[@title='Like this image']/..");
    }

    getBookmarkButtonLocator(index: number): Locator {
        return this.getFiguresLoc(index, "//button[@aria-label='Bookmark']");
    }
    
    getUnlikeButtonLocator(index: number): Locator {
        return this.getFiguresLoc(index, "//button[@title='Unlike this image']/..");
    }
}