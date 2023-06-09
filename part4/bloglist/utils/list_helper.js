const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, item) => {
    return favorite.likes > item.likes ? favorite : item
  }
  return blogs.reduce(reducer, {})
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const author = authors.sort((a, b) =>
    authors.filter(v => v === a).length
    - authors.filter(v => v === b).length
  ).pop()
  return blogs.find(blog => blog.author === author)
}

const mostLikes = (blogs) => {
  if (!blogs.length) return null
  let coints = {}
  blogs.forEach(blog => { coints[blog.author] = 0 })
  blogs.forEach(blog => { coints[blog.author] += blog.likes })
  const author = Object.keys(coints).reduce((a, b) => coints[a] > coints[b] ? a : b)
  return { author, likes: coints[author] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
