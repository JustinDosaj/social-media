import { ISignIn } from "../../types/auth";
import { cognitoClient, CLIENT_ID } from "../../clients/cognito";
import { InitiateAuthCommandInput, InitiateAuthCommand, GlobalSignOutCommand } from "@aws-sdk/client-cognito-identity-provider";

export async function login({email, password}: ISignIn) {
    const params: InitiateAuthCommandInput = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: CLIENT_ID,
        AuthParameters: {
            'USERNAME': email,
            'PASSWORD': password,
        }
    }

    const command = new InitiateAuthCommand(params)

    const response = await cognitoClient.send(command)

    return response
}

export async function signOut(accessToken: string) {

    const command = new GlobalSignOutCommand({
        AccessToken: accessToken
    });

    await cognitoClient.send(command);

    return;
}