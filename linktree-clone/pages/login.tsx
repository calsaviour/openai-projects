import supabase from "@/utils/supabaseClient";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const router = useRouter();
    async function signInWithEmail() {
      try {
        if (email && password) {
          const resp = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
          if (resp.error) throw resp.error;
          const userId = resp.data.user?.id;
          console.log("userId:", userId);
          router.push("/calvin");
        }
      } catch (error) {
        console.log("error:", error)
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

        <button
          type="button"
          className="rounded-md bg-indigo-600 py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
          onClick={signInWithEmail}
        >
          Login
        </button>
      </div>
    )
  }