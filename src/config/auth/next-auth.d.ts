export interface InfoUser {
  fullName: string
  email: string
  changeEmail: boolean
  verifyEmail: boolean
  cellphone: string
  changeCellphone: boolean
  verifyCellphone: boolean
  country: string
  isReseller: boolean
  levelUser: number
  tradeName: string
  username: string
  prefixCountry: string
  prefixCelPhone: string
}

interface Token {
  accessToken: string
}

declare module 'next-auth' {
  interface Session {
    user: InfoUser & Token
  }
  interface User extends InfoUser {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: InfoUser & Token
  }
}
