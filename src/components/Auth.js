import axios from 'axios';
import {useState, useContext} from 'react';
import AuthContext from '../store/authContext.js';
 
const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)

   const authCtx = useContext(AuthContext);
 
   const submitHandler = e => {
       e.preventDefault()

		const body = {
			username,
			password
		}
		// const url = 'https://socialmtn.devmountain.com';
        if (register) {
            //user is registering
            axios.post(`/register`, body)
				.then(({data}) => {
console.log(data)
					authCtx.login(data)
				})
				.catch((err) => {
					setPassword('');
					setUsername('');
				})
        }
        else {
            //user is logging in
            axios.post(`/login`, body)
			.then(({data}) => {
console.log(data)
				authCtx.login(data)
			})
			.catch((err) => {
				setPassword('');
				setUsername('');
			})
        }
   }
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                   type='text'
                   placeholder='Username'
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   className='form-input'/>
               <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                   className='form-input'/>
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button onClick={() => setRegister(!register)} className='form-btn'>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth;