import BadRequest from '@src/adapter/ports/httpResponse/badRequest';
import Created from '@src/adapter/ports/httpResponse/Created';
import ServerError from '@src/adapter/ports/httpResponse/ServerError';
import Unauthorized from '@src/adapter/ports/httpResponse/Unauthorized';
import AuthMiddleware from '@src/application/middlewares/Auth';
import {
  InsertFileDataInDatabaseUsecase,
  SaveFileUsecase,
} from '@src/application/usecases/files';
import { CreateTransactionUsecase } from '@src/application/usecases/transactions';
import config from '@src/config';
import JwtToken from '@src/infra/cryptography/JwtToken';
import PrismaTransactionRepository from '@src/infra/databases/prisma/repositories/PrismaTransaction';
import Helpers from '@src/infra/storage/Helpers';

export default class File {
  static async handle(request: any) {
    const provider = new Helpers().defineStorageProvider();
    const jwt = new JwtToken(config.jwt.secret);
    const transactionRepository = new PrismaTransactionRepository();
    const saveFileUsecase = new SaveFileUsecase(provider);
    const createTransactionUsecase = new CreateTransactionUsecase(
      transactionRepository,
    );
    const insertFileDataInDatabaseUsecase = new InsertFileDataInDatabaseUsecase(
      createTransactionUsecase,
    );
    const authMiddleware = new AuthMiddleware(jwt);
    if (!request.headers?.authorization) return new Unauthorized();
    const jwtInfo = await authMiddleware.validate({ headers: request.headers });
    if (jwtInfo instanceof Error || !jwtInfo) return new Unauthorized();
    if (!request.file) return new BadRequest('file is required');
    const { filename, originalname } = request.file;
    const saveFileResult = await saveFileUsecase.run(filename);
    if (saveFileResult instanceof Error) return new ServerError();
    const insertFileResult = await insertFileDataInDatabaseUsecase.run(
      filename,
      jwtInfo.user.id,
    );
    if (insertFileResult instanceof Error) return new ServerError();
    return new Created({ message: `${originalname} uploaded successfully` });
  }
}
