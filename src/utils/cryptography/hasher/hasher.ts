import { hashSync, genSaltSync } from 'bcrypt';

export const hasher = async (password: string): Promise<string> => {
  const salt = genSaltSync();
  return hashSync(password, salt);
};
