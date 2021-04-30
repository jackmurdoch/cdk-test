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
      handler: 'handler'
    })

    const rule = new events.Rule(this, `${process.env.DEPLOY_ENV || 'staging'}-scheduled-rule`, {
      schedule: events.Schedule.rate(cdk.Duration.minutes(1))
    })

    rule.addTarget(new targets.LambdaFunction(fn))
  }
}
