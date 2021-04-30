import * as cdk from '@aws-cdk/core'
import * as events from '@aws-cdk/aws-events'
import * as lambda from '@aws-cdk/aws-lambda-nodejs'
import * as path from 'path'
import * as targets from '@aws-cdk/aws-events-targets'

export class ScheduledLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const fn = new lambda.NodejsFunction(this, `${process.env.DEPLOY_ENV || 'staging'}-scheduled-lambda`, {
      entry: path.resolve(__dirname, '../src/scheduled-lambda/index.ts'),
      handler: 'handler',
      environment: {
        NEW_RELIC_NO_CONFIG_FILE: 'true',
        NEW_RELIC_APP_NAME: `${process.env.DEPLOY_ENV || 'staging'}-scheduled-lambda`,
        NEW_RELIC_ACCOUNT_ID: process.env.NEWRELIC_ACCOUNT_ID || '',
        NEW_RELIC_TRUSTED_ACCOUNT_KEY: process.env.NEWRELIC_ACCOUNT_ID || ''
      },
      bundling: {
        nodeModules: ['newrelic']
      }
    })

    const rule = new events.Rule(this, `${process.env.DEPLOY_ENV || 'staging'}-scheduled-rule`, {
      schedule: events.Schedule.rate(cdk.Duration.minutes(1))
    })

    rule.addTarget(new targets.LambdaFunction(fn))
  }
}
