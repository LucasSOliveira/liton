import 'express';

declare module 'express' {
  export interface Response {
    cookie(name: string, value: any, options?: any): this;
  }
}
