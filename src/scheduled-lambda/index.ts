import { ScheduledHandler } from 'aws-lambda';
import { generateRandom } from '../utils';

export const handler: ScheduledHandler = async () => {
  console.log(generateRandom());
};
