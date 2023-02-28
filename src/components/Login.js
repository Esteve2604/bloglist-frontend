import loginService from '../services/login'
import FormInput from './FormInput'
import blogService from '../services/blogs'
const Login = ({ username, password, setUsername, setPassword, setUser, setErrorMessage }) => {
    const error = (error) =>{
        setErrorMessage(error)
        setTimeout(()=>setErrorMessage(null), 5000)
    }
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setUsername('')
            setPassword('')
            error("wrong username or password")
            console.log('Wrong credentials')
        }
    }
    return (
        <form onSubmit={handleLogin}>
            <FormInput entry={username} setEntry={setUsername} entryName={"username"} />
            <div>
                password
                <input
                id='password'
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button id='login-button' type="submit">login</button>
        </form>
    )
}
export default Login