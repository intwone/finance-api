import TransactionRepository from '@infra/databases/prisma/repositories/PrismaTransactionRepository';

export default class GetAllTransactions {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run() {
    const allTransactions = await this.transactionRepository.getAll();
    return allTransactions;
  }
}
