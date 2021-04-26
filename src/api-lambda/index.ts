import * as faker from 'faker'
import { APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async event => {
  console.log('request:', JSON.stringify(event, undefined, 2))

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hello: `${faker.name.firstName()} ${faker.name.lastName()}`
    })
  }
}
