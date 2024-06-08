import type { FormItem } from '@/types/Global'

export const isValidForm = (dataValues: IDictionary, items: FormItem[]) => {
  if (!Object.keys(dataValues).length) return false

  const requiredItems = items.reduce((acc: string[], item: FormItem) => {
    if (item.required) {
      //@ts-ignore
      acc.push(item.name)
    }
    return acc
  }, [])

  return requiredItems.every((name: keyof IDictionary) => {
    if (dataValues[name as string].length >= 3) {
      return true
    }
    return false
  })
}
