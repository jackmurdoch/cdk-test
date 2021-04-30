#!/usr/bin/env node
import 'source-map-support/register'
import { App } from '@aws-cdk/core'
import { ScheduledLambdaStack } from '../infra/scheduled-lambda-stack'
import { ApiLambdaStack } from '../infra/api-lambda-stack'

const app = new App()

new ScheduledLambdaStack(app, `${process.env.DEPLOY_ENV || 'staging'}-scheduled-lambda`)
new ApiLambdaStack(app, `${process.env.DEPLOY_ENV || 'staging'}-api-lambda`)
