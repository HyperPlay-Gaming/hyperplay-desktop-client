export interface RequestBody<T> extends Express.Request {
  body: T
}
