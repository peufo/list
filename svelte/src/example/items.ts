import { faker } from '@faker-js/faker'

export const items = [...Array(6)].map((u, i) => ({
  name: faker.name.firstName(),
  city: faker.address.cityName(),
  color: faker.color.rgb({ format: 'css' }),
  key: i,
}))
