import * as express from "express";

export class ExceptionMiddleware {
  public static handle(
    error: Error,
    req: express.Request,
    res: express.Response,
    next: () => void
  ) {
    // tslint:disable-next-line: no-console
    console.error(`
        ----------------------------------
        EXCEPTION MIDDLEWARE
        HTTP ${req.method} ${req.url}
        ${error.message}
        ${error.stack}
        ----------------------------------
        `);

    return res.status(500).send({ error: error.message });
  }
}
