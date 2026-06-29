export const MESSAGES = {
    COMMON:{
        "INTERNAL_SERVER_ERROR": "Something went wrong",
        "EMAIL_EXISTS": "Email is already registered",
        "UNATHORIZED_ACCESS": 'Unauthorized request!'
    }
}

export const dynamic_messages = {
    FETCHED_SUCCESSFULLY: (item_fetched: string) => `${item_fetched} fetched successfully`,
    SUCCESSFULLY_CREATED: (item_created: string) => `${item_created} successfully created`,
    SUCCESSFULLY_UPDATED: (item_updated: string) => `${item_updated} successfully updated`,
    NOT_FOUND: (item: string) => `${item} not found`,
    DELETED: (item: string) => `${item} successfully deleted`,
    CREATED_SUCCESSFULLY: (item_created: string) => `${item_created} created successfully`,
    ALREADY_EXISTS: (item: string) => `${item} already exists`,
}