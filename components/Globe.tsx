"use client"
import { useRef, useMemo, useState, useCallback, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Instances, Instance, Text, Html } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import * as THREE from 'three'
import { Mesh, InstancedMesh } from 'three'
import { Button } from '@/components/ui/button'

const GLOBE_RADIUS = 2
const POINT_RADIUS = 0.03
const NUM_POINTS = 30
const BUTTON_DISPLAY_DURATION = 5000

export interface Project {
  day: number
  title: string
  description: string
  path: string
}

export const projects: Project[] = [
  {
    day: 1,
    title: "Countdown Timer",
    description: "A timer that counts down to a specific event with pause, resume and reset functionality.",
    path: "https://count-down-timer-iota-self.vercel.app"
  },
  {
    day: 2,
    title: "Weather Widget",
    description: "Real-time weather information display using weather API integration.",
    path: "https://weather-widget-app-three.vercel.app"
  },
  {
    day: 3,
    title: "Birthday Wishes",
    description: "Interactive birthday card creator with customizable messages and animations.",
    path: "https://birthday-wishes-app-3d-ti69.vercel.app"
  },
  {
    day: 4,
    title: "Number Guessing",
    description: "Interactive game where players guess a randomly generated number.",
    path: "https://number-guessing-game-6a7v.vercel.app"
  },
  {
    day: 5,
    title: "Calculator",
    description: "Basic arithmetic calculator with a clean, modern interface.",
    path: "https://simple-calculator-app-mocha.vercel.app"
  },
  {
    day: 6,
    title: "Digital Clock",
    description: "Real-time digital clock with multiple timezone support.",
    path: "https://digital-clock-app-alpha.vercel.app"
  },
  {
    day: 7,
    title: "Joke Generator",
    description: "Random joke generator using a jokes API.",
    path: "https://random-jokes-generator-app-b8qx.vercel.app"
  },
  {
    day: 8,
    title: "Color Picker",
    description: "Interactive color picker with RGB, HEX, and HSL support.",
    path: "https://color-picker-umz2.vercel.app"
  },
  {
    day: 9,
    title: "Tip Calculator",
    description: "Calculate tips and split bills among multiple people.",
    path: "https://tip-calculator-app-jade-pi.vercel.app"
  },
  {
    day: 10,
    title: "Password Generator",
    description: "Generate secure passwords with customizable parameters.",
    path: "https://password-generator-app-k3w8.vercel.app"
  },
  {
    day: 11,
    title: "BMI Calculator",
    description: "Calculate Body Mass Index with health recommendations.",
    path: "https://bmi-calculator-app-uowi.vercel.app"
  },
  {
    day: 12,
    title: "Unit Converter",
    description: "Convert between different units of measurement.",
    path: "https://unit-converter-apps--theta.vercel.app"
  },
  {
    day: 13,
    title: "HTML Previewer",
    description: "Live HTML and CSS code preview tool.",
    path: "https://13th-day-html-previewer-app.vercel.app"
  },
  {
    day: 14,
    title: "Pomodoro Timer",
    description: "Productivity timer following the Pomodoro Technique.",
    path: "https://14th-day-pomodoro-timer-app.vercel.app"
  },
  {
    day: 15,
    title: "Expense Tracker",
    description: "Track daily expenses and visualize spending patterns.",
    path: "https://15th-day-expense-tracker-app.vercel.app"
  },
  {
    day: 16,
    title: "Movie Search",
    description: "Search and explore movies using a movie database API.",
    path: "https://16th-day-movie-search-app.vercel.app"
  },
  {
    day: 17,
    title: "Meme Generator",
    description: "Create custom memes with text overlays.",
    path: "https://17th-day-meme-generator-app.vercel.app"
  },
  {
    day: 18,
    title: "Currency Converter",
    description: "Convert between different currencies using live exchange rates.",
    path: "https://18th-day-currency-converter-app.vercel.app"
  },
  {
    day: 19,
    title: "GitHub Profile",
    description: "View GitHub user profiles and repositories.",
    path: "https://19th-day-github-profile-viewer-app.vercel.app"
  },
  {
    day: 20,
    title: "Notes App",
    description: "Create, edit, and organize notes with local storage.",
    path: "https://20th-day-notes-app.vercel.app"
  },
  {
    day: 21,
    title: "Recipe Search",
    description: "Search for recipes by ingredients or cuisine type.",
    path: "https://21st-day-recipe-search-app.vercel.app"
  },
  {
    day: 22,
    title: "Word Counter",
    description: "Count words, characters, and paragraphs in text.",
    path: "https://22nd-day-word-counter-app.vercel.app"
  },
  {
    day: 23,
    title: "Image Slider",
    description: "Responsive image carousel with navigation controls.",
    path: "https://23rd-day-image-slider.vercel.app"
  },
  {
    day: 24,
    title: "Quiz App",
    description: "Interactive quiz with score tracking and results.",
    path: "https://24th-day-quiz-app.vercel.app"
  },
  {
    day: 25,
    title: "Stopwatch",
    description: "Precise stopwatch with lap timing functionality.",
    path: "https://25th-day-stopwatch-app.vercel.app"
  },
  {
    day: 26,
    title: "Snake Game",
    description: "Classic snake game with score tracking.",
    path: "https://26th-day-snake-game-app.vercel.app"
  },
  {
    day: 27,
    title: "URL Shortener",
    description: "Shorten long URLs with custom aliases.",
    path: "https://27th-day-url-shortnerr-app.vercel.app"
  },
  {
    day: 28,
    title: "Todo List",
    description: "Task management with categories and priorities.",
    path: "https://28th-day-todo-list-app.vercel.app"
  },
  {
    day: 29,
    title: "Random User",
    description: "Generate random user profiles for testing.",
    path: "https://29th-day-random-user-generator.vercel.app"
  },
  {
    day: 30,
    title: "Audio Player",
    description: "Custom audio player with playlist support.",
    path: "https://30th-day-audio-player-app.vercel.app"
  }
]


export default function Globe() {
  const router = useRouter()
  const globeRef = useRef<Mesh>(null)
  const pointsRef = useRef<InstancedMesh>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)
  const [isRotating, setIsRotating] = useState(true)

  const pointPositions = useMemo(() => {
    const positions = []
    for (let i = 0; i < NUM_POINTS; i++) {
      const phi = Math.acos(-1 + (2 * i) / NUM_POINTS)
      const theta = Math.sqrt(NUM_POINTS * Math.PI) * phi
      const x = GLOBE_RADIUS * Math.cos(theta) * Math.sin(phi)
      const y = GLOBE_RADIUS * Math.sin(theta) * Math.sin(phi)
      const z = GLOBE_RADIUS * Math.cos(phi)
      positions.push(new THREE.Vector3(x, y, z))
    }
    return positions
  }, [])

  useFrame((state) => {
    if (isRotating) {
      const t = state.clock.getElapsedTime()
      globeRef.current!.rotation.y = t * 0.1
      pointsRef.current!.rotation.y = t * 0.1
    }
  })

  const handlePointHover = useCallback((index: number | null) => {
    setHoverIndex(index)
    setIsRotating(index === null && clickedIndex === null)
  }, [clickedIndex])

  const handlePointClick = useCallback((index: number) => {
    setClickedIndex(index)
    setIsRotating(false)

    setTimeout(() => {
      setClickedIndex(null)
      setIsRotating(true)
    }, BUTTON_DISPLAY_DURATION)
  }, [])

  const navigateToDay = useCallback((index: number) => {
    const project = projects[index]
    if (project?.path) {
      window.open(project.path, '_blank')
    }
  }, [])

  return (
    <group scale={[0.9, 0.9, 0.9]}>
    <Sphere ref={globeRef} args={[GLOBE_RADIUS, 64, 64]}>
      <meshStandardMaterial color="#ffffff" wireframe />
    </Sphere>
    <Instances limit={NUM_POINTS} ref={pointsRef}>
      <sphereGeometry args={[POINT_RADIUS, 16, 16]} />
      <meshStandardMaterial color="#ffffff" />
      {pointPositions.map((position, index) => (
        <group key={index}>
          <Instance
            position={position}
            onClick={() => handlePointClick(index)}
            onPointerOver={() => handlePointHover(index)}
            onPointerOut={() => handlePointHover(null)}
          />
          <Text
            position={[position.x * 1.1, position.y * 1.1, position.z * 1.1]}
            fontSize={0.1}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {`Day ${index + 1}`}
          </Text>
          {(hoverIndex === index || clickedIndex === index) && (
  <Html position={[position.x * 1.2, position.y * 1.2, position.z * 1.2]}>
    <Button
      onClick={() => navigateToDay(index)}
      className="bg-white text-black hover:bg-gray-200"
    >
      {`Go to ${projects[index]?.title || `Day ${index + 1}`}`}
    </Button>
  </Html>
)}

        </group>
      ))}
    </Instances>
  </group>
  )
}