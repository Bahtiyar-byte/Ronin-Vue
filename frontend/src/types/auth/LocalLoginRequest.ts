export default interface LocalLoginRequest {
  email: string
  password: string
  remember?: boolean | undefined
}
