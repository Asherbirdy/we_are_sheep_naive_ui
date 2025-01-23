export type RequestSchema = Record<string, ApiFunction<any, any>>

type ApiFunction<T, R> = {
  api: (payload?: T)=> Promise<R>
  queryKey?: string
}