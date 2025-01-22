export default function Notfound(){
    return(
        <div className="h-screen flex flex-col items-center justify-center bg-gray-300">
        <h1 className="text-8xl text-left font-bold text-red-700">404</h1>
        <p className="text-2xl text-green-700 mt-4">Oops! Page Not Found</p>
        <p className="text-lg text-green-700 text-center ">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      </div>
    )
}