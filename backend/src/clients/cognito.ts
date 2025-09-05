import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import dotenv from 'dotenv'

dotenv.config()

export const CLIENT_ID = process.env.COGNITO_CLIENT_ID as string
export const USER_POOL_ID = process.env.COGNITO_USER_POOL_ID as string

export const cognitoClient = new CognitoIdentityProviderClient({
    region: process.env.COGNITO_REGION as string,
})