import * as faker from 'faker';
import { ScheduledHandler } from 'aws-lambda';
import { setLambdaHandler } from 'newrelic';

require('@newrelic/aws-sdk');

export const handler: ScheduledHandler = setLambdaHandler(async () => {
  console.log('hello:', faker.name.firstName(), faker.name.lastName());
});
