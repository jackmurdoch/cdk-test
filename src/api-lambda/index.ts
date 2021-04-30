import * as faker from 'faker';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { setLambdaHandler } from 'newrelic';

import '@newrelic/aws-sdk';

export const handler: APIGatewayProxyHandler = setLambdaHandler(
  async (event) => {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          random: {
            uuid: faker.datatype.uuid(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            product: faker.commerce.product(),
          },
          event,
        },
        null,
        2,
      ),
    };
  },
);
