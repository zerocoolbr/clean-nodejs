import { getModelForClass } from '@typegoose/typegoose';
import { Account, AccountSchema } from '@/domain/models/account';
import { MongoBaseRepository } from '@/shared/infra/db/repositories';
import { AccountRepository } from './account-repository';

export class MongoAccountRepository
  extends MongoBaseRepository<Account, AccountSchema>
  implements AccountRepository
{
  constructor() {
    super();
    this.ormRepository = getModelForClass(AccountSchema);
  }

  public async findByEmail(email: string): Promise<Account | null> {
    const account = await this.ormRepository.findOne({ email });

    if (account === null) return null;

    return account.toObject() as Account;
  }
}
