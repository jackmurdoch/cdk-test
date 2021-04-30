import * as api from '@aws-cdk/aws-apigateway'
import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda-nodejs'
import * as path from 'path'

export class ApiLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const restApi = new api.RestApi(this, `${process.env.DEPLOY_ENV || 'staging'}-api`, {
      deployOptions: {
        stageName: process.env.DEPLOY_ENV || 'staging',
        metricsEnabled: true,
        loggingLevel: api.MethodLoggingLevel.INFO,
        dataTraceEnabled: true
      }
    })

    const fn = new lambda.NodejsFunction(this, `${process.env.DEPLOY_ENV || 'staging'}-api-lambda`, {
      entry: path.resolve(__dirname, '../src/api-lambda/index.ts'),
      handler: 'handler',
      environment: {
        NEW_RELIC_NO_CONFIG_FILE: 'true',
        NEW_RELIC_APP_NAME: `${process.env.DEPLOY_ENV || 'staging'}-api-lambda`,
        NEW_RELIC_ACCOUNT_ID: process.env.NEWRELIC_ACCOUNT_ID || '',
        NEW_RELIC_TRUSTED_ACCOUNT_KEY: process.env.NEWRELIC_ACCOUNT_ID || ''
      },
      bundling: {
        nodeModules: ['newrelic']
      }
    })

    restApi.root.addProxy({
      defaultIntegration: new api.LambdaIntegration(fn)
    })
  }
}
