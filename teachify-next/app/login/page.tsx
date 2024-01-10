'use client';

// import { supabase } from "../../util/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";

// Documentation: https://supabase.com/docs/guides/auth/auth-helpers/nextjs#client-components

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    // const handleSignUp = async () => {
    //     const res = await supabase.auth.signUp({
    //         email,
    //         password,
    //         options: {
    //             emailRedirectTo: `${location.origin}/auth/callback`,
    //         },
    //     });
    //     if (res.error) {
    //         setError(res.error.toString());
    //     } else {
    //         router.push("/");
    //     }
    // };

    // const handleSignIn = async () => {
    //     setLoading(true);
    //     const res = await supabase.auth.signInWithPassword({
    //         email,
    //         password,
    //     });

    //     if (res.error) {
    //         setError(res.error.toString());
    //     } else {
    //         router.push("/");
    //     }
    //     setLoading(false);
    // };

    // const handleSignUpWithGoogle = async () => {
    //     setLoading(true);
    //     const res = await supabase.auth.signInWithOAuth({
    //         provider: "google",
    //     });
    // };

    return (
        <>
            {/* <Navbar /> */}
            <section className="">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="flex items-center space-x-2">
                        <a href="/" className="text-blue-700 flex items-center justify-center h-full w-full text-2xl font-semibold text-gray-900">
                            Rekruit
                        </a>
                    </div>
                    {loading && <LoadingIndicator />}
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign in to your account
                            </h1>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        placeholder="yourname@youremail.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                                                required
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-dark-custom-blue hover:underline"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <button
                                    className="w-full text-white bg-dark-custom-blue hover:bg-custom-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Sign in
                                </button>
                                <button
                                    type="button"
                                    className="w-full text-white bg-dark-custom-blue hover:bg-custom-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center text-center inline-flex items-center justify-between"
                                >
                                    <svg
                                        className="mr-2 -ml-1 w-4 h-4"
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fab"
                                        data-icon="google"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 488 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                                        ></path>
                                    </svg>
                                    Sign in with Google
                                    <div></div>
                                </button>
                                <button
                                    className="w-full text-white bg-dark-custom-blue hover:bg-custom-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Create Account with Email
                                </button>
                                {error !== "" && (
                                    <p className="mt-4 text-gray-500">Try Again: {error}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}