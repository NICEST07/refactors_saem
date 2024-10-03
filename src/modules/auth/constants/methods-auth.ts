export const METHODSAUTH = {
  GOOGLE: 'GOOGLE',
  MAIL: 'MAIL'
} as const

export type TypeMethodsAuth = typeof METHODSAUTH[keyof typeof METHODSAUTH]
