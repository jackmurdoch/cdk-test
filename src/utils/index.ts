import * as faker from 'faker';

export function generateRandom() {
  return {
    uuid: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    product: faker.commerce.product(),
  }
}
