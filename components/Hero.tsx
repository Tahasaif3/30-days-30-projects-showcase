'use client'

import { useState } from 'react'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Globe from './Globe'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const [showGlobe, setShowGlobe] = useState(false)

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-black-500 to-gray-800 text-white overflow-hidden relative">
      {/* Text and Button Section */}
      <div
        className={`transition-all duration-1000 ease-out ${
          showGlobe ? 'opacity-0 pointer-events-none' : 'opacity-100 z-10'
        } z-10 flex flex-col items-center`}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          30 Days of 30 Projects
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-8 text-center max-w-xl px-4">
          Build 30 exciting projects in 30 days using the latest tech stack
        </p>
        <Button
          className="mt-6 px-6 py-3 text-lg font-medium rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
          onClick={() => setShowGlobe(true)}
        >
          Begin Your Journey
        </Button>
      </div>

      {/* Globe Canvas Section */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          showGlobe ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} />
            <Globe />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}


// 'use client'

// import { useState } from 'react'
// import { Suspense } from 'react'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import Globe from './Globe'
// import { Button } from '@/components/ui/button'

// export default function Hero() {
//   const [showGlobe, setShowGlobe] = useState(false)

//   return (
//     <section className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-orange-600 to-orange-900 text-white overflow-hidden relative">
//       {/* Text and Button Section */}
//       <div
//         className={`transition-opacity duration-1000 ease-in-out ${
//           showGlobe ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'
//         } z-10 flex flex-col items-center`}
//       >
//         <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
//           30 Days of 30 Projects
//         </h1>
//         <p className="text-lg md:text-2xl text-gray-300 mb-8 text-center max-w-xl px-4">
//           Build 30 exciting projects in 30 days using the latest tech stack
//         </p>
//         <Button
//           className="mt-6 px-6 py-3 text-lg font-medium rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
//           onClick={() => setShowGlobe(true)}
//         >
//           Begin Your Journey
//         </Button>
//       </div>

//       {/* Globe Canvas Section */}
//       <div
//         className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//           showGlobe ? 'opacity-100' : 'opacity-0 pointer-events-none'
//         }`}
//       >
//         <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
//           <Suspense fallback={null}>
//             <ambientLight intensity={0.6} />
//             <pointLight position={[10, 10, 10]} />
//             <Globe />
//             <OrbitControls enableZoom={false} enablePan={false} />
//           </Suspense>
//         </Canvas>
//       </div>
//     </section>
//   )
// }
