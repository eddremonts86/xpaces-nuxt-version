export { IDictionary, Dictionary }
declare global {
  type IDictionary = {
    [key: string]: any
  }

  type Dictionary<T> = {
    [key: string]: T
  }
}
