import { useAuth } from '@clerk/clerk-react'

export default function ExternalDataPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth()

  const fetchExternalData = async () => {
    const token = await getToken()

    // Fetch data from an external API
    const response = await fetch('https://api.example.com/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.json()
  }

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>
  }

  return (
    <div>
      <button onClick={fetchExternalData}>Fetch Data</button>
    </div>
  )
}

// 'use client'
// import { useAuth } from "@clerk/nextjs";

// export default function Users() {
//   const { userId, user } = useAuth();

//   if (!userId) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold">Please log in to access this page.</h1>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
//       <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
//         <h1 className="text-3xl font-extrabold mb-4">Welcome, {user?.username || user?.firstName || "User"}!</h1>
//         <p className="mb-6">You are successfully logged in. Explore your dashboard and enjoy your experience!</p>
//         <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
//           Go to Dashboard
//         </button>
//       </div>
//     </div>
//   );
// }