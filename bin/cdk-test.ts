#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { ScheduledLambdaStack } from '../lib/scheduled-lambda-stack'
import { ApiLambdaStack } from '../lib/api-lambda-stack'

const app = new cdk.App()

new ScheduledLambdaStack(app, 'ScheduledLambdaStack')
new ApiLambdaStack(app, 'ApiLambdaStack')
