import { IAuth } from "../types/auth";
import { CognitoIdentityProviderClient, ListUsersCommand, ListUsersCommandInput, SignUpCommandInput, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { APIError } from '../config/error';
import dotenv from 'dotenv'

dotenv.config()

export class AuthServices {

    private static readonly CLIENT_ID = process.env.COGNITO_CLIENT_ID as string
    private static readonly USER_POOL_ID = process.env.COGNITO_USER_POOL_ID as string

    static client = new CognitoIdentityProviderClient({
        region: process.env.AWS_REGION as string,
    })

    static async signUp({email, username, password}: IAuth) {

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
}