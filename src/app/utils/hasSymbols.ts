export const SYMBOLS = `!@#$%&'*+-/=?^_{|}~[],.'`

const hasSymbols = (string: string) => {
  const symbols = SYMBOLS.split('')
  for (let i = 0; i < symbols.length; i++) {
    if (string.includes(symbols[i])) return true
  }

  return false
}

export default hasSymbols
