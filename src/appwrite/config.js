import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";
import { Permission, Role } from "appwrite";


export class Service {

    constructor() {
        this.client = new Client()
            .setEndpoint(config.appWriteURL)
            .setProject(config.appWriteProjectID)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appWriteDB,
                config.appWriteCollectionID,
                slug, //whatever slug is passed, will be considered as document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.error("Failed to create post:", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDB,
                config.appWriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.error("Failed to update post:", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appWriteDB,
                config.appWriteCollectionID,
                slug,
            )
            return true
        } catch (error) {
            console.error("Failed to delete post:", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            if (!slug || slug === "undefined") {
                console.warn("Service.getPost called with invalid slug:", slug);
                return false;
            }

            return await this.databases.getDocument(
                config.appWriteDB,
                config.appWriteCollectionID,
                slug,
            )
        } catch (error) {
            console.error("Failed to get the post:", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appWriteDB,
                config.appWriteCollectionID,
                queries
            )
        } catch (error) {
            console.error("Failed to get all posts:", error);
            return false
        }
    }

    // file upload methods
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appWriteBucketID,
                ID.unique(),
                file,
            );
        } catch (error) {
            console.error("error occured", error);
            return false;
        }
    }

    async deleteFile(fileId) {  // The fileId is returned when the file is created and should be stored in the document's featuredImage field.

        try {
            await this.bucket.deleteFile(
                config.appWriteBucketID,
                fileId
            )
            return true
        } catch (error) {
            console.log("error occured", error)
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appWriteBucketID,
            fileId
        ).href
    }
}

const service = new Service()
export default service;

