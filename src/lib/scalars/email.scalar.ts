import { GraphQLScalarType } from 'graphql';

const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

function validate(email: unknown): string | never {
  if (typeof email !== 'string' || !regex.test(email)) {
    throw new Error('invalid email');
  }
  return email;
}

export const CustomEmailScalar = new GraphQLScalarType({
  name: 'Email',
  description: 'A field representing email address',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
});
