import FormInput from './FormInput'
import blogsServices from '../services/blogs'
import Togglable from './Togglable'
const BlogForm = ({ blogs, setBlogs, title, setTitle, author, setAuthor, url, setUrl, setSuccessMessage, setErrorMessage, user }) => {
    const success = (success) => {
        setSuccessMessage(success)
        setTimeout(() => setSuccessMessage(null), 5000)
    }
    const error = (error) => {
        setErrorMessage(error)
        setTimeout(() => setErrorMessage(null), 5000)
    }
    const handleNewBlog = async (event) => {
        event.preventDefault()
        try {
            const newBlog = await blogsServices.create({ title, author, url })
            newBlog.user=user
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
    return (
        <>
            <h2>Create new blog</h2>
            <Togglable buttonLabel='create new blog'>
                <form onSubmit={handleNewBlog}>
                    <FormInput entry={title} setEntry={setTitle} entryName={"Title"} />
                    <FormInput entry={author} setEntry={setAuthor} entryName={"Author"} />
                    <FormInput entry={url} setEntry={setUrl} entryName={"URL"} />
                    <button id='create-button' type="submit">Create</button>
                </form>
            </Togglable>
        </>
    )
}
export default BlogForm