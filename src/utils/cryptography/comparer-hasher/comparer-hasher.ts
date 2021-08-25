import { compareSync } from 'bcrypt';

export const comparerHasher = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return compareSync(password, hash);
};
