import { Route, useRouteLoaderData } from 'react-router-dom'
import { BrowserRouter, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import { useState, useEffect } from 'react';
import AppContext from '../features/context/AppContext';
import Layout from './ui/layout/Lyout';
import Base64 from '../shared/base64/Base64';
import Login from '../pages/login/Login';

const tokenStorageKey = "react-token";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

 const request = (url, conf) => new Promise((resolve,reject) => 
  {
    if(url.startsWith('/')){
      url= serverUrl + url;
      if(token){
        if(typeof conf == 'undefined'){
        conf = {};
        }
        if(typeof conf.headers == 'undefined'){
          conf.headers = {};
        }
        if(typeof conf.headers["Authorization"] == 'undefined'){
          conf.headers["Authorization"] = "Bearer " + token;
        }
      }
      
    } 
    fetch(url, conf)
        .then(r => r.json())
        .then(j => {
            if(j.status.isOk){
                resolve(j.data);
            }
            else{
                if(j.status.code == 401){
                  alert("UnAuthorized")
                }
                reject(j);
            }
        })
        .catch((e) => alert(e))
  });

  useEffect(() => {
    const storedToken = localStorage.getItem(tokenStorageKey);
    if(storedToken){
      const payload = Base64.jwtDecodePayload(storedToken);
      const exp = new Date(payload.Exp.toString().length == 13
        ? Number(payload.Exp)
        : Number(payload.Exp) * 1000);
      const now = new Date();
      if(exp < now){
        localStorage.removeItem(tokenStorageKey);
      }
      else{
        console.log("Token left: ", (exp - now)/1000 + " seconds");
        setToken(storedToken);
      }
      
    }

  }, []);

  useEffect(() => {
    if(token == null){
      setUser(null);
      localStorage.removeItem(tokenStorageKey);
    }
    else{
      localStorage.setItem(tokenStorageKey, token);
      setUser(Base64.jwtDecodePayload(token));
    }
    },[token]);
  

  return <>
  <AppContext.Provider value={ {request, user, token, setToken, serverUrl} }>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='login' element={<Login/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </AppContext.Provider>
  </> 
}


export default App