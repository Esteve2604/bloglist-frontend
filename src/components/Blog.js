import { useState } from 'react'
import blogsServices from '../services/blogs'
const Blog = ({ blog, blogs, setBlogs }) => {
  const [extra, setExtra] = useState(false)
  const [text, setText] = useState('view')
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleView = () => () => {
    extra === false ? setText('hide') : setText('view')
    setExtra(!extra)
  }
  const handleLikes = (blogToUpdate) => async () => {
    blogToUpdate.likes++
    const updatedBlog = await blogsServices.update(blogToUpdate)
    updatedBlog.user = blogToUpdate.user
    const updatedBlogs=((blogs.map(blog => updatedBlog.id.toString() === blog.id.toString() ? updatedBlog : blog)))
    setBlogs(updatedBlogs.sort((a, b) => a.likes > b.likes ? a : b))
  }
  return (<>
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={handleView()}>{`${text}`}</button>
      {extra === true ?
        <p>
          {blog.url} <br></br>
          {blog.likes} <button onClick={handleLikes(blog)}>like</button> <br></br>
          {blog.user.name}
        </p> : <></>
      }
    </div>
  </>
  )
}

export default Blog