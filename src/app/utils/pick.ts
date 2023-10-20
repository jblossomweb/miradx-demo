import type AnyObject from 'app/types/AnyObject'

const pick = <
  OriginalObject = AnyObject,
  ResultObject = Partial<OriginalObject>,
>(
  object: OriginalObject,
  keys: (keyof OriginalObject)[],
): ResultObject =>
  keys.reduce(
    (obj, key) => ({
      ...obj,
      [key]: object[key],
    }),
    {},
  ) as ResultObject

export default pick
