import { ISignUp, IConfirmSignUp, ISignIn } from "../types/auth";
import { CognitoIdentityProviderClient, 
    ListUsersCommand, 
    ListUsersCommandInput, 
    SignUpCommandInput, 
    SignUpCommand,
    ConfirmSignUpCommand,
    InitiateAuthCommand,
    InitiateAuthCommandInput, 
    GlobalSignOutCommand,
    GetUserCommand
} from "@aws-sdk/client-cognito-identity-provider";
import { APIError } from '../config/error';
import dotenv from 'dotenv'

dotenv.config()

export class AuthServices {

    private static readonly CLIENT_ID = process.env.COGNITO_CLIENT_ID as string
    private static readonly USER_POOL_ID = process.env.COGNITO_USER_POOL_ID as string

    static client = new CognitoIdentityProviderClient({
        region: process.env.COGNITO_REGION as string,
    })

    static async signUp({email, username, password}: ISignUp) {

        const listParams: ListUsersCommandInput = {
            UserPoolId: this.USER_POOL_ID,
            Filter: `email = "${email}"`
        }

        const listCommand = new ListUsersCommand(listParams)
        const result = await this.client.send(listCommand)

        if (result.Users && result.Users.length > 0) {
            throw new APIError('Email already exists', 409)
        }

        const signUpParams: SignUpCommandInput = {
            ClientId: this.CLIENT_ID,
            Username: username,
            Password: password,
            UserAttributes: [{Name: 'email', Value: email}]
        }

        const command = new SignUpCommand(signUpParams)
        
        const response = this.client.send(command)

        return response
    }

    static async confirmSignUp({username, code}: IConfirmSignUp) {

        const params = {
            ClientId: this.CLIENT_ID,
            Username: username,
            ConfirmationCode: code,
        }

        const command = new ConfirmSignUpCommand(params)

        const response = await this.client.send(command)

        return response

    }

    static async signIn({email, password}: ISignIn) {
        
        const params: InitiateAuthCommandInput = {
            AuthFlow: "USER_PASSWORD_AUTH",
            ClientId: this.CLIENT_ID,
            AuthParameters: {
                'USERNAME': email,
                'PASSWORD': password,
            }
        }

        const command = new InitiateAuthCommand(params)

        const response = await this.client.send(command)

        return response
    }

    static async signOut(accessToken: string) {

        const command = new GlobalSignOutCommand({
            AccessToken: accessToken
        });

        await this.client.send(command);

        return;
    }

    static async getUser(accessToken: string) {
        
        const command = new GetUserCommand({
            AccessToken: accessToken
        })

        const response = await this.client.send(command)

        console.log(response)

        return response
    }
}