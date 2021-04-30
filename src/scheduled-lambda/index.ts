import * as faker from 'faker';
import { ScheduledHandler } from 'aws-lambda';

export const handler: ScheduledHandler = async () => {
  console.log('hello:', faker.name.firstName(), faker.name.lastName());
};
