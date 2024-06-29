import LoginForm from '@/src/components/Login/LoginForm'
import Link from 'next/link'
import React from 'react'


export const metadata = {
  title:"Login - Bhumap",
  desc:"Indian No.1 Real Estate Services Providers"
}


const Login = () => {
  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default Login