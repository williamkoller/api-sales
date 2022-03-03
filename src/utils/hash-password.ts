import { hashSync } from 'bcrypt';

export const hashPassword = (password: string): string => {
  const saltNumber = 8;
  return hashSync(password, saltNumber);
};
