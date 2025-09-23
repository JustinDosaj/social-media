import { ISignIn } from "../../types/auth";
import { cognitoClient, CLIENT_ID, USER_POOL_ID } from "../../clients/cognito";
import { InitiateAuthCommandInput, InitiateAuthCommand, GlobalSignOutCommand, GetUserCommand, ListUsersCommand } from "@aws-sdk/client-cognito-identity-provider";
import { decodeJWT } from "../../utils/decode";

export async function login({email, password}: ISignIn) {
    
    const listCommand = new ListUsersCommand({
        UserPoolId: USER_POOL_ID,
        Filter: `email = "${email}"`
    })

    const listResponse = await cognitoClient.send(listCommand)
    const user = listResponse.Users?.[0]

    if (user?.UserStatus !== 'CONFIRMED') {

        console.log("Not Confirmed -- Sending Reconfirmation")
        
        const sub = user?.Attributes?.find(attr => attr.Name === "sub")?.Value

        return {
            email,
            username: user?.Username,
            isVerified: false,
            sub: sub,
            accessToken: null,
            refreshToken: null,
            expiresIn: 3600,
        }
    }
    
    const params: InitiateAuthCommandInput = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: CLIENT_ID,
        AuthParameters: {
            'USERNAME': `${user?.Username}`,
            'PASSWORD': password,
        }
    }

    const command = new InitiateAuthCommand(params)

    const response = await cognitoClient.send(command)

    const session = decodeJWT(response.AuthenticationResult?.IdToken || '')

    return {
        accessToken: response.AuthenticationResult?.AccessToken,
        refreshToken: response.AuthenticationResult?.RefreshToken,
        expiresIn: response.AuthenticationResult?.ExpiresIn,
        sub: session.sub,
        username: user?.Username,
        email: session.email,
        isVerified: session.email_verified
    }
}

export async function logout(accessToken: string) {

    const command = new GlobalSignOutCommand({
        AccessToken: accessToken
    });

    await cognitoClient.send(command);

    return;
}

export async function getUserSession(accessToken: string) {
    
    const command = new GetUserCommand({
        AccessToken: accessToken
    })

    const response = await cognitoClient.send(command)

    return response
}