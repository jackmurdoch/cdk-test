import * as api from '@aws-cdk/aws-apigateway'
import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda-nodejs'
import * as path from 'path'

export class ApiLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const restApi = new api.RestApi(this, `${process.env.DEPLOY_ENV}-api`, {
      deployOptions: {
        stageName: process.env.DEPLOY_ENV,
        metricsEnabled: true,
        loggingLevel: api.MethodLoggingLevel.INFO,
        dataTraceEnabled: true
      }
    })

    const fn = new lambda.NodejsFunction(this, `${process.env.DEPLOY_ENV}-scheduled`, {
      entry: path.resolve(__dirname, '../src/api-lambda/index.ts'),
      handler: 'handler'
    })

    restApi.root.addProxy({
      defaultIntegration: new api.LambdaIntegration(fn, {})
    })
  }
}
