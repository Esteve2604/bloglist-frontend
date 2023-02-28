import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}
const update = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const blogToUpdate = {
   // user: blog.user.id.toString(),
    likes: blog.likes,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }
  const response = await axios.put(`${baseUrl}/${blog.id.toString()}`, blogToUpdate, config)
  return response.data
}
const remove = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${blog.id.toString()}`,config)
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update, remove }