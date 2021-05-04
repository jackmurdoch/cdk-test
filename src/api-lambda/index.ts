import { APIGatewayProxyHandler } from 'aws-lambda';
import { generateRandom } from '../utils';

export const handler: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {
        random: generateRandom(),
        event,
      },
      null,
      2,
    ),
  };
};
