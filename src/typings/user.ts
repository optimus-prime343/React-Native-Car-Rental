export type User = {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
}
export type UpdateUserInput = Pick<User, 'id' | 'name' | 'email'>
