export function validatePassword (password: string) {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&/+#¿-])[A-Za-z\d@$!%?&/+#¿-].+$/
  return regex.test(password)
}
