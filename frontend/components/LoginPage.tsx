import React from 'react';
import Image from 'next/image';
import { FaGoogle } from "react-icons/fa"; // Assuming you have an IconGoogle component for the Google logo
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="login">
      <div id="header" className="flex items-center ml-5 mt-5">
        <Image src="https://bookface-images.s3.amazonaws.com/small_logos/56ef3ec5ae83019ddb5d6898272fd3b9d1089c62.png" className="rounded-full" alt="Mem0 Logo" width={40} height={40} />
        <span className="ml-2 text-xl font-bold">mem0</span>
      </div>
      <div id="content" className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold">Welcome to Mem0.ai!</h1>
        <p className="text-lg mt-2">Sign in to your account</p>
        <button onClick={() => signIn("google")} className="flex items-center mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          <FaGoogle className="mr-2" />
          Continue with Google
        </button>
        <p className="text-sm text-center mt-4">
          By continuing, you agree to Mem0's
          <a href="/terms" className="text-blue-500 underline"> Terms of Service</a> and 
          <a href="/privacy" className="text-blue-500 underline"> Privacy Policy</a>, 
          and to receive periodic emails with updates.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;