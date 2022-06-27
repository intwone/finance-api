import { CreateTransactionUsecase } from '@src/domain/usecases/transactions';
import MemoryTransactionRepository from '@src/infra/databases/Disk/repositories/MemoryTransaction';
import TransactionEntity from './domain/entities/Transaction';
import transactionsFixture from './fixtures/transaction';

describe('Create transaction', () => {
  it('should be able to create a new transaction', async () => {
    // Given
    const transactionRepository = new MemoryTransactionRepository();
    const createTransactionUsecase = new CreateTransactionUsecase(
      transactionRepository,
    );
    const transaction = transactionsFixture[0] as TransactionEntity;

    // When
    const result = await createTransactionUsecase.run(transaction);

    // Then
    expect(result).toEqual(transactionRepository.transactions[0]);
    expect(transactionRepository.transactions.length).toBe(1);
  });
});
