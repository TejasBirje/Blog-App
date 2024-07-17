import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)  //It stores ID ,content, featuredImage (id),status, title
        this.bucket = new Storage(this.client)  // The actual image
    }

    async createPost({title,slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error :: ", error);
        }
    }

    async updatePost(slug,{title, content, featuredImage, status, userId}) {  // slug is out of object so then we dont have use '.' to access everytime
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // document ID in slug
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error :: ", error);

        }
    }

    async deletePost(slug,{title, content, featuredImage, status, userId}) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // Document ID in slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error :: ", error);
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error :: ", error);
            return false 
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {   // in parameter giving default value only because we want all posts whose status is active
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,  // already in parameters

                /*  Can also write this way.
                [
                    [Query.equal("status", "active")
                ]
                */
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error :: ", error);
            return false
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            ) 
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error :: ", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error :: ", error);
            return false 
        }
    }   

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()  
export default service  // directly exporting object instead of class