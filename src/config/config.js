const config = {
    appWriteURL: String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDB: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteCollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default config


// we are just doing it all to make sure that our app doesn't crash as we are making sure that ID's are in String
// it is mostly used in production grade applications