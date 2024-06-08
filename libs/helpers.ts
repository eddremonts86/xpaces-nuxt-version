import { uniqueId as _uniqueId, sortBy } from 'lodash'

export function sliceText(text: string, start: number, end: number) {
  if (!text) return ''
  return text.length >= end ? text.slice(start || 0, end) + ' ...' : text
}

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US'
) => {
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }
  const formatter = new Intl.DateTimeFormat(locale, options)
  return formatter.format(date)
}

export const formatDateToNumber = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.getTime()
}

export const formatDateToOther = () => {
  const date = new Date().toISOString().slice(0, 10)
  return date
}

export const formatDate = (dateString: string) => {
  const date = dateString ? new Date(dateString) : new Date()
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  return `${year}-${month}-${day}`
}

export const uniqueId = (text = 'id_') => {
  return _uniqueId(text)
}

export const sortByKeys = (array = [], key = ['name'], order = 'decs') => {
  const elements = sortBy(array, key)
  if (order === 'asc') {
    return elements
  }
  return elements.reverse()
}

export const weeksFromToday = (someDate: string) => {
  const date = new Date(someDate)
  const today = new Date()
  const timeDifference = date.getTime() - today.getTime()
  const daysDifference = (timeDifference / (1000 * 3600 * 24)) * -1
  return Math.ceil(daysDifference / 7)
}

export const images = (amount = 3) => {
  const images = [
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/499220127.jpg?k=c64581ccfc187bce5c6036a48299c166c079f1b38a1df4d6941fbe96b9507a43&o=&hp=1',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/483641820.jpg?k=ec176a4aa9cc180bf8fb4297991868a0934a71c3065d7cd64da3ca541c931da0&o=&hp=1',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/483641310.jpg?k=8157008dd2ea8d31797ee411f097f5a2fd45879a77f726c98920cdf871c9da3d&o=&hp=1',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/483638889.jpg?k=1d33f070bb9d066f90e1810de3b954c4c25479fdceedacfb9f92879f5eda6680&o=&hp=1',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/494507908.jpg?k=49f73ce7567a2b79d8ba6dd48c62561f95b83ab0e5676763a71328361c19fd63&o=&hp=1',
    'https://media.designcafe.com/wp-content/uploads/2023/01/31151510/contemporary-interior-design-ideas-for-your-home.jpg',
    'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/home-improvement/wp-content/uploads/2021/12/featured-image-interior-design.jpeg',
    'https://cityfurnish.com/blog/wp-content/uploads/2023/07/modern-apartment-with-bold-bright-walls-perfect-showcasing-your-art-collection-min.jpg',
    'https://megafurniture.sg/cdn/shop/articles/modern-luxury-interior-design-tips-for-home-renovation-megafurniture_d199fbaa-61e4-4abe-9d1d-37b272b30fc1.jpg?v=1710226685',
    'https://www.rennovate.co.in/wp-content/uploads/2022/09/blog10-1.jpg',
    'https://www.unite.ai/wp-content/uploads/2023/07/Alex_Mc_interior_design._modern._47404ec8-1cd9-4b15-ba7f-b22669c45f46.jpg',
    'https://www.istitutomarangoni.com/marangoni/entities/article/CS-INTERIOR-DESIGN-JOB_IMG_D.jpg',
    'https://global-uploads.webflow.com/63826902210b950303814c04/64d149313689dc5b65bb3cc1_Memphis_design_169_V52_(01).jpeg',
    'https://img.houseui.com/media/blog-thumbnail/Basics_of_Interior_Design.jpeg/',
    'https://thumbs.dreamstime.com/b/wall-rendering-art-interior-coral-geometric-ball-shape-armchair-pink-render-room-design-style-sofa-vintage-colourful-memphis-285531639.jpg',
    'https://thumbs.dreamstime.com/b/armchair-modern-floor-rendering-wall-design-style-render-art-room-colourful-house-mock-interior-memphis-space-sofa-geometric-284255654.jpg',
    'https://www.fitnyc.edu/_resources/assets/img/programs-interior-design-hero-fall-2021.jpg',
  ]
  return createRandomArray(images, amount)
}
const createRandomArray = (baseArray: string[], amount: number) => {
  return baseArray.sort(() => Math.random() - 0.5).slice(0, amount)
}
