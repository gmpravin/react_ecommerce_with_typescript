import { hashSync, genSaltSync } from 'bcrypt';
const salt = genSaltSync(10);
export const hash = value => {
  return hashSync(value, salt);
};
