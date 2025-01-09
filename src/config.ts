interface Config {
  apiUrl: string
  baseUrl: string
}

export const config: Config = {
  apiUrl: import.meta.env.VITE_SERVER,
  baseUrl: import.meta.env.VITE_BASE
}
