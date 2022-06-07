import { User } from './user'

export type CreateUserInput = Pick<User, 'email' | 'password' | 'name'> & {
  confirmPassword: string
}
export type LoginInput = Pick<User, 'email' | 'password'>
