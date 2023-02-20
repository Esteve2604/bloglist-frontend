import Blog from './Blog'
import FormInput from './FormInput'
import blogsServices from '../services/blogs'
const Blogs = ({ blogs, setBlogs, user, setUser, title, setTitle, author, setAuthor, url, setUrl, setSuccessMessage, setErrorMessage }) => {
    const success = (success)=>{
        setSuccessMessage(success)
        setTimeout(()=>setSuccessMessage(null), 5000)
    }
    const error = (error) =>{
        setErrorMessage(error)
        setTimeout(()=>setErrorMessage(null), 5000)
    }
    const logout = () => () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }
    const handleNewBlog = async (event) => {
        event.preventDefault()
        try {
            const newBlog = await blogsServices.create({title, author, url})
            success(`New Blog ${title} by ${author} added correctly`)
            setBlogs(blogs.concat(newBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (exception) {
            error("Wrong Blog Format")
            console.log('Wrong Blog Format')
        }
        return
    }
    return (<>
        <h2>Blogs</h2>
        {user.name} logged in <button onClick={logout()}>logout</button>
        <p></p>
        <h2>Create new blog</h2>
        <form onSubmit={handleNewBlog}>
            <FormInput entry={title} setEntry={setTitle} entryName={"Title"}/>
            <FormInput entry={author} setEntry={setAuthor} entryName={"Author"}/>
            <FormInput entry={url} setEntry={setUrl} entryName={"URL"}/>
            <button type="submit">Create</button>
        </form>
        {
            blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )
        }
    </>
    )
}

export default Blogs