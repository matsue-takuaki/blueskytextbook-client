import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import {auth, provider} from "@/lib/firebase"

function SignIn() {
    const SignInwithGoogle = () => {
        signInWithPopup(auth,provider);
    }
  return (
    <div>
        <button onClick={SignInwithGoogle} className='w-36 h-12 rounded-xl bg-black text-white'>
            <p>Googleでログイン</p>
        </button>
    </div>
  )
}

export default SignIn