import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import dotenv from 'dotenv'
import { getParametersFromSSM } from "./ssm";

dotenv.config()

// export const CLIENT_ID = process.env.COGNITO_CLIENT_ID as string
// export const USER_POOL_ID = process.env.COGNITO_USER_POOL_ID as string

// export const cognitoClient = new CognitoIdentityProviderClient({
//     region: process.env.COGNITO_REGION as string,
// })

export let CLIENT_ID: string
export let USER_POOL_ID: string
export let REGION: string
export const cognitoClient = new CognitoIdentityProviderClient({
        region: process.env.AWS_REGION as string,
});

export async function initCognito() {
    const prefix = `/social-media/${process.env.NODE_ENV as string}`
    
    const params = await getParametersFromSSM([
        `${prefix}/cognito_client_id`,
        `${prefix}/cognito_user_pool_id`,
        `${prefix}/cognito_region`
    ])

    CLIENT_ID = params[`${prefix}/cognito_client_id`]
    USER_POOL_ID = params[`${prefix}/cognito_user_pool_id`]
    REGION = params[`${prefix}/cognito_region`]

}
