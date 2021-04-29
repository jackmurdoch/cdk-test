#!/usr/bin/env node
import 'source-map-support/register'
import { App } from '@aws-cdk/core'
import { ScheduledLambdaStack } from '../infra/scheduled-lambda-stack'
import { ApiLambdaStack } from '../infra/api-lambda-stack'

const app = new App()

new ScheduledLambdaStack(app, `${process.env.DEPLOY_ENV}-ScheduledLambda`)
new ApiLambdaStack(app, `${process.env.DEPLOY_ENV}-ApiLambda`)
