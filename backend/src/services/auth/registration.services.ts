import { ISignUp, IConfirmSignUp } from "../../types/auth";
import { cognitoClient, USER_POOL_ID, CLIENT_ID } from "../../clients/cognito";
import { SignUpCommand, 
    SignUpCommandInput, 
    ListUsersCommandInput, 
    ListUsersCommand,
    ConfirmSignUpCommand 
} from "@aws-sdk/client-cognito-identity-provider";
import { APIError } from "../../config/error";

export async function signUp({email, username, password}: ISignUp) {
    
    const listParams: ListUsersCommandInput = {
        UserPoolId: USER_POOL_ID,
        Filter: `email = "${email}"`
    }

    const listCommand = new ListUsersCommand(listParams)
    const result = await cognitoClient.send(listCommand)

    if (result.Users && result.Users.length > 0) {
        throw new APIError('Email already exists', 409)
    }

    const signUpParams: SignUpCommandInput = {
        ClientId: CLIENT_ID,
        Username: username,
        Password: password,
        UserAttributes: [{Name: 'email', Value: email}]
    }

    const command = new SignUpCommand(signUpParams)
    
    const response = cognitoClient.send(command)

    return response
}

export async function confirmSignUp({username, code}: IConfirmSignUp) {

    const params = {
        ClientId: CLIENT_ID,
        Username: username,
        ConfirmationCode: code,
    }

    const command = new ConfirmSignUpCommand(params)

    const response = await cognitoClient.send(command)

    return response

}