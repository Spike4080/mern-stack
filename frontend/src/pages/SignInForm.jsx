import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios'

export default function SigninForm() {
  let [email,setEmail] = useState('');
  let [password,setPassword] = useState('');
  let [error,setError] = useState(null);
  let navigate =useNavigate();

  let login = async(e) => {
    try {
      e.preventDefault();
      setError(null);

      let data = {
        email,
        password
      }

    let res = await axios.post('http://localhost:4000/api/users/login',data,{
      withCredentials:true
    });
    if(res.status == 200) {
      navigate('/');
    }
      } catch(e){
        console.log(e);
        setError(e.response.data.error);
      }

  }
  return (
    <div className="w-full max-w-lg mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={login}>
        <h1 className="text-2xl font-bold text-center">Login Form</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input className={`shadow appearance-none border ${error ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}  id="email" type="text" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
          {!!(error) &&<p className="text-red-500 text-xs italic">{error}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input 
          className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password" 
          type="password" 
          placeholder="******************" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-orange-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Login
          </button>
          <Link to='/sign-up' className="inline-block align-baseline font-bold text-sm text-orange-400 hover:text-blue-800" href="#">
            Register Here
          </Link>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
</div>
  )
}
