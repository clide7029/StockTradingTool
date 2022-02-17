import { useState, useEffect } from "react";


import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const [auth, setAuth] = useState("no user logged in")

  return (
    <Layout>
      <Component {...pageProps } setAuth={setAuth}/>
      <h1>{auth.username}</h1>
      <h1>{auth.password}</h1>
    </Layout>
  )
}

export default MyApp
