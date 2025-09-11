import { SSMClient, GetParametersCommand } from "@aws-sdk/client-ssm";

export async function getParametersFromSSM(names: string[]) {

    const ssm = new SSMClient({ region: process.env.AWS_REGION });

    const command = new GetParametersCommand({
        Names: names,
        WithDecryption: true
    })

    const response = await ssm.send(command)

    const params: Record<string, string> = {}

    response.Parameters?.forEach((param) => {
        if (param.Name && param.Value) {
            params[param.Name] = param.Value
        }
    })

    return params
}