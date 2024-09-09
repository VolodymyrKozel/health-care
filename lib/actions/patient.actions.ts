"use server";
import { CreateUserParams, RegisterUserParams } from "../../types/index.d";
import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "../appwrite.config";
import { InputFile } from "node-appwrite";
import { parseStringify } from "../utils";
export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return newUser;
  } catch (error: any) {
    if (error && error.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      return documents?.users[0];
    }
    console.log(error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

// Function to convert Blob to Buffer
const blobToBuffer = async (blob: Blob): Promise<Buffer> => {
  return new Promise<Buffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(Buffer.from(reader.result as ArrayBuffer));
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
};

// Function to register a patient
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams): Promise<any> => {
  try {
    let file;

    if (identificationDocument) {
      const blob = identificationDocument.get("blobFile") as Blob;
      const fileName = identificationDocument.get("fileName") as string;

      // Convert Blob to Buffer
      const buffer = await blobToBuffer(blob);

      // Create input file
      const inputFile = InputFile.fromBuffer(buffer, fileName);

      // Upload file to storage
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    // Create a new patient record in the database
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: file
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
          : null,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("Error registering patient:", error);
    throw error; // Re-throw the error after logging it
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );
    return parseStringify(patients).documents[0];
  } catch (error) {
    console.log(error);
  }
};
