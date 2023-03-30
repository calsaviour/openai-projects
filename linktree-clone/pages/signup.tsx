import supabase from "@/utils/supabaseClient";
import { useState } from "react";

export default function SignUp() {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [username, setUsername] = useState<string | undefined>();

    async function signUpWithEmail() {
      try {
        if (email && password) {
          const resp = await supabase.auth.signUp({
            email: email,
            password: password,
          });
          if (resp.error) throw resp.error;
          const userId = resp.data.user?.id;
          if (userId) {
            await createUser(userId);
          }
          console.log("userId:", userId);
        }
      } catch (error) {
        console.log("error:", error)
      }
    }

    async function createUser(userId: string) {
      try {
        const { error } = await supabase
          .from("users")
          .insert({
              id: userId,
              username: username
          });
        if (error) throw error;
      } catch (error) {
        console.log("error: ", error)
      }
    }
    return (
      <div className="flex flex-col w-full justify-center items-center">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email
        </label>
        <div className="mt-2">
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 mt-4">
          Password
        </label>
        <div className="mt-2">
          <input
            type="password"
            name="password"
            id="password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 mt-4">
          Username
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="username"
            id="username"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="rounded-md bg-indigo-600 py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
          onClick={signUpWithEmail}
        >
          Sign Up
        </button>
      </div>
    )
  }