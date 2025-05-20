import config from "../config/config";

import { Client, Account, ID } from "appwrite";

export class AuthService {

    constructor() {
        this.client = new Client()
            .setEndpoint(config.appWriteURL)  // API Endpoint
            .setProject(config.appWriteProjectID) // Project ID
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({ email, password })
            } else {
                return { error: "Account creation failed" };
            }
        } catch (error) {
            console.error("Error creating account", error.message || error)
            throw new Error("Unable to create account. Please try again later.");
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.error("Error logging in account", error)
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.error("Error getting current account", error)
            return null
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.error("Error logging out account", error)
        }
    }
}

const authService = new AuthService()
export default authService;