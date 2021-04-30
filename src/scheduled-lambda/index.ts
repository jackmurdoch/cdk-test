import * as faker from 'faker';
import { ScheduledHandler } from 'aws-lambda';
import { setLambdaHandler } from 'newrelic';

export const handler: ScheduledHandler = setLambdaHandler(async () => {
  console.log('hello:', faker.name.firstName(), faker.name.lastName());
});
