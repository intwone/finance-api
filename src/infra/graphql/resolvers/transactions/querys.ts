import {
  GetAllTransactions,
  GetOneTransaction,
} from '@src/domain/usecases/transactions';
import PrismaTransactionRepository from '@src/infra/databases/prisma/repositories/PrismaTransactionRepository';

const transactionRepository = new PrismaTransactionRepository();

const querys = {
  getTransactions: async () => {
    const getAllTransactionsUsecase = new GetAllTransactions(
      transactionRepository,
    );
    const transactions = await getAllTransactionsUsecase.run();
    return transactions;
  },

  getTransaction: async (_: any, args: { id: string }) => {
    const getOneTransactionUsecase = new GetOneTransaction(
      transactionRepository,
    );
    const transaction = await getOneTransactionUsecase.run(args.id);
    return transaction;
  },
};

export default querys;
