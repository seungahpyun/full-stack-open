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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
