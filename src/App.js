import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import './index.css'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    }
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
//title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl}
  return (
    <div>
      <Notification.SuccessNotification successMessage={successMessage} />
      <Notification.ErrorNotification errorMessage={errorMessage} />
      {user === null ?
        <Login username={username} password={password} user={user}
          setUsername={setUsername} setPassword={setPassword} setUser={setUser} setErrorMessage={setErrorMessage}/>
        :
        <Blogs blogs={blogs} setBlogs={setBlogs} user={user} setUser={setUser}
           setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}/>}
    </div>
  )
}

export default App