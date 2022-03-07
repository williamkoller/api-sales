import { EntityRepository, Repository } from 'typeorm';
import { UserToken } from '@modules/users/typeorm/entities/user-token';

@EntityRepository(UserToken)
export class UserTokensRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    return await this.findOne({
      where: { token },
    });
  }

  public async findByUserId(userId: string): Promise<UserToken | undefined> {
    return await this.findOne({
      where: { userId },
    });
  }

  public async generateToken(userId: string): Promise<UserToken> {
    const userToken = this.create({ userId });
    return await this.save(userToken);
  }
}
