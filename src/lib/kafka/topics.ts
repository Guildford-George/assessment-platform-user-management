export enum KafkaTopics{
    // User-based topics
    NEW_ORGANIZATION_USER="new-organization-user",
    UPDATE_ORGANIZATION_USER="update-organization-user",
    ORGANIZATION_USER_STATUS="organization-user-status",
    DELETE_ORGANIZATION_USER="delete-organization-user",
    DELETE_USER="delete-user",


    // Organization-based topics
    CREATE_ORGANIZATION="create-user",
    DELETE_ORGANIZATION="delete-organization",
    ORGANIZATION_ACCOUNT_STATUS="organization-status",
}