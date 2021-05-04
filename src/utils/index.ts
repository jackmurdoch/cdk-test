import * as faker from 'faker';

interface RandomData {
  uuid: string;
  firstName: string;
  lastName: string;
  product: string;
}

export function generateRandom(): RandomData {
  return {
    uuid: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    product: faker.commerce.product(),
  };
}
