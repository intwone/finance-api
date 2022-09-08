import HttpFrameworkAdapter from '@src/adapter/ports/HttpFramework';
import { Request, Response } from 'express';

export default class Express implements HttpFrameworkAdapter {
  create(fn: Function) {
    const func = async (request: Request, response: Response) => {
      const obj = await fn(request, response);
      response.json(obj);
    };
    return func;
  }
}
