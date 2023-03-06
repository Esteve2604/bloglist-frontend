import { useState } from 'react'
import blogsServices from '../services/blogs'
import PropTypes from 'prop-types'
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
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    blogs: PropTypes.array.isRequired,
    setBlogs: PropTypes.func.isRequired
  }
  const handleView = () => () => {
    extra === false ? setText('hide') : setText('view')
    setExtra(!extra)
  }
  const handleLikes = (blogToUpdate) => async () => {
    blogToUpdate.likes++
    const updatedBlog = await blogsServices.update(blogToUpdate)
    updatedBlog.user = blogToUpdate.user
    const updatedBlogs = ((blogs.map(blog => updatedBlog.id.toString() === blog.id.toString() ? updatedBlog : blog)))
    setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
  }
  const handleRemove = (blogToDelete) => async () => {
    await blogsServices.remove(blogToDelete)
    setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
  }
  const loggedUser=JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
  return (<>
    <div style={blogStyle}>
      <p className='blogshort'>{blog.title} {blog.author} <button onClick={handleView()}>{`${text}`}</button> </p>
      {extra === true ?
        <p>
          {blog.url} <br></br>
          {blog.likes} <button id='like-button' onClick={handleLikes(blog)}>like</button> <br></br>
          {blog.user.name}
        </p> : <></>
      }
      {loggedUser.username==blog.user.username ? <button id='remove-button' onClick={handleRemove(blog)}>remove</button> : <></>}
    </div>
  </>
  )
}

export default Blog