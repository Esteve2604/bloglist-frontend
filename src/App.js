import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <div>
      {user === null ?
      <Login username={username} password={password} user={user}
        setUsername={setUsername} setPassword={setPassword} setUser={setUser} />
      :
      <Blogs blogs={blogs} />}
    </div>
  )
}

export default App