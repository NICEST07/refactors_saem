import axios from 'axios'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { InfoUser } from './next-auth'

function calculateMaxAge (): number {
  const now = new Date()
  const endOfDay = new Date(now)
  endOfDay.setHours(23, 59, 59, 999) // Fija la hora a las 23:59:59.999
  const secondsUntilEndOfDay = Math.floor((endOfDay.getTime() - now.getTime()) / 1000)

  return secondsUntilEndOfDay
}

export interface GetInfoUser {
  infoUser: InfoUser
  message: string
  success: boolean
}

export async function getInfoUser (token: string, origin: string) {
  return await axios.get<GetInfoUser>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user-info/info-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      origin
    }
  })
}

export const authConfig: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: calculateMaxAge() //* depende a que horas se le loguea hasta las 23:59:59.999 */
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize (credentials: any, req) {
        try {
          const { data } = await getInfoUser(credentials?.accessToken ?? '', req?.headers?.origin)
          if (!data.success) throw new Error(data?.message ?? 'Error al obtener la información del usuario')

          return { id: data.infoUser.email, ...data.infoUser, accessToken: credentials.accessToken }
        } catch (error) {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt ({ token, user }) {
      return {
        ...token,
        ...user
      }
    },
    async session ({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token
        },
        accessToken: token?.accessToken ?? ''
      }
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  }
}
