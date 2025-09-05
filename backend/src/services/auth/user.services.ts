import { GetUserCommand } from "@aws-sdk/client-cognito-identity-provider"
import { cognitoClient } from "../../clients/cognito"

export async function getUser(accessToken: string) {
    
    const command = new GetUserCommand({
        AccessToken: accessToken
    })

    const response = await cognitoClient.send(command)

    return response
}