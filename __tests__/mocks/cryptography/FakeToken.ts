import Plaintext from '@src/adapter/ports/criptography/Plaintext';
import IPayload from '@src/adapter/ports/token/Payload';
import TokenAdapter from '@src/adapter/ports/token/Token';
import config from '@src/config';

export default class FakeToken implements TokenAdapter {
  async encrypt(plaintext: Plaintext, _: string): Promise<string> {
    return Buffer.from(JSON.stringify(plaintext)).toString('base64');
  }

  async decrypt(ciphertext: string): Promise<IPayload | null> {
    const id = Buffer.from(ciphertext, 'base64').toString('ascii');
    const iat = new Date().getTime();
    const exp = new Date().setDate(
      new Date().getDate() + Number(config.jwt.expiresInDays),
    );

    const user = {
      id,
      name: 'any_name',
      email: 'any_email',
    };

    const jwtInfo = {
      user,
      iat,
      exp,
    };
    return jwtInfo || null;
  }
}
