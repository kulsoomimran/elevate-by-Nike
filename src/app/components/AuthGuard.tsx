import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isSignedIn === false) {
            setIsLoading(false); 
        } else {
            setIsLoading(false);
        }
    }, [isSignedIn]);

    if (isLoading) return <p>Loading...</p>;

    if (!isSignedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-semibold text-gray-700">First Sign In</h2>
                    <p className="text-gray-600 mt-2">You need to sign in to add or view items in your cart.</p>
                    <button
                        onClick={() => router.push("/SignIn")}
                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;
