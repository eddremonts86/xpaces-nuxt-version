export const useUseValidateDate = () => {
  const validateDate = (date: string) => {
    const dateObj = new Date(date)
    const isValid = !isNaN(dateObj.getTime())
    return isValid
  }

  const validateDates = (dates: string[]) => {
    const validDates = dates.filter((date) => validateDate(date))
    return validDates
  }

  const validateDateToNumber = (date: string) => {
    const dateObj = new Date(date)
    const isValid = !isNaN(dateObj.getTime())
    return isValid ? dateObj.getTime() : 0
  }

  const validateDateToOther = (date: string) => {
    const dateObj = new Date(date)
    const isValid = !isNaN(dateObj.getTime())
    return isValid ? dateObj.toISOString().slice(0, 10) : ''
  }

  const validateDateToLocal = (date: string, locale: string = 'en-US') => {
    const dateObj = new Date(date)
    const isValid = !isNaN(dateObj.getTime())
    if (!isValid) return ''
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }
    const formatter = new Intl.DateTimeFormat(locale, options)
    return formatter.format(dateObj)
  }

  const getDayRange = (dates: string[]) => {
    if (!validateRangeDate(dates)) return 0
    const [start, end] = dates.map((date) => new Date(date))
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const validateRangeDate = (dates: string[]) => {
    const [start, end] = dates.map((date) =>
      validateDate(date) ? new Date(date) : null
    )
    if (!start || !end) return false
    if (end < start) return false
    return true
  }

  const dayFormatter = (myDate: string) => {
    const date = new Date(myDate)
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }
    const formatter = new Intl.DateTimeFormat('en-US', options)
    return formatter.format(date)
  }

  return {
    validateDate,
    validateDates,
    validateDateToNumber,
    getDayRange,
    validateDateToOther,
    validateDateToLocal,
    validateRangeDate,
    dayFormatter,
  }
}
