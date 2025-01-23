export type RequestSchema = Record<string, ApiFunction>

type ApiFunction= {
  api: (payload?: any)=> Promise<any>
  queryKey?: string
}
