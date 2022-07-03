import TransactionEntity from '../entities/Transaction';

export default interface Transaction {
  create(
    id: string,
    title: string,
    type: string,
    value: number,
    category: string,
    created_at: Date,
    updated_at: Date,
  ): Promise<TransactionEntity | null>;
  getAll(): Promise<TransactionEntity[] | []>;
  getOne(id: string): Promise<TransactionEntity | null>;
  update(
    id: string,
    data: TransactionEntity,
  ): Promise<TransactionEntity | null>;
  delete(id: string): Promise<boolean>;
}
