import Blog from './Blog'
import BlogForm from './BlogForm'
import { useState } from 'react'
const Blogs = ({ blogs, setBlogs, user, setUser, setSuccessMessage, setErrorMessage }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const logout = () => () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    return (<>
        <h2>Blogs</h2>
        {user.name} logged in <button id= 'logout-button' onClick={logout()}>logout</button>
        <p></p>
        <BlogForm blogs={blogs} setBlogs={setBlogs} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} 
        setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} user={user}/>
        {
            blogs.map(blog =>
                <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs}/>
            )
        }
    </>
    )
}

export default Blogs