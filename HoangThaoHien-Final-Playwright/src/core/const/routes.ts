export const ROUTES = {
    PROFILE_ROUTE: (new_username: string) => `/@${new_username}`,
    ACCOUNT_SETTING_ROUTE: "/account",
    USER_PHOTO_FAVORITE_ROUTE: (username: string) => `/@${username}/likes`,
    USER_PHOTO_BOOKMARK_ROUTE: "/bookmarks",
}