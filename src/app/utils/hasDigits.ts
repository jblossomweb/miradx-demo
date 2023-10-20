const hasDigits = (string: string) => {
  const regex = /\d/
  return regex.test(string)
}

export default hasDigits
