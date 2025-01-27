interface Config {
  apiUrl: string
  baseUrl: string
  test: {
    email: string
  }
}

export const config: Config = {
  apiUrl: import.meta.env.VITE_SERVER,
  baseUrl: import.meta.env.VITE_BASE,
  test: {
    email: import.meta.env.VITE_TEST_EMAIL
  }
}
