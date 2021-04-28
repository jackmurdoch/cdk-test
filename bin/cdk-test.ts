#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { ScheduledLambdaStack } from '../lib/scheduled-lambda-stack'
import { ApiLambdaStack } from '../lib/api-lambda-stack'

const app = new cdk.App()

new ScheduledLambdaStack(app, `${process.env.DEPLOY_ENV}-ScheduledLambda`)
new ApiLambdaStack(app, `${process.env.DEPLOY_ENV}-ApiLambda`)
