import * as faker from 'faker'
import { ScheduledHandler } from 'aws-lambda'

export const handler: ScheduledHandler = async event => {
  console.log('hello:', faker.name.firstName(), faker.name.lastName())
  console.log('request:', JSON.stringify(event, undefined, 2))
}
