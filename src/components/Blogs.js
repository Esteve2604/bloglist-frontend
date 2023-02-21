import Blog from './Blog'
import BlogForm from './BlogForm'

const Blogs = ({ blogs, setBlogs, user, setUser, title, setTitle, author, setAuthor, url, setUrl, setSuccessMessage, setErrorMessage }) => {

    const logout = () => () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    return (<>
        <h2>Blogs</h2>
        {user.name} logged in <button onClick={logout()}>logout</button>
        <p></p>
        <BlogForm blogs={blogs} setBlogs={setBlogs} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} 
        setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}/>
        {
            blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )
        }
    </>
    )
}

export default Blogs