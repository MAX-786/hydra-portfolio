"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "../contexts/ThemeContext"

const particles = [
  "Hi",
  "Yahallo!",
  "もしもし",
  "Bonjour",
  "Hola",
  "你好",
  "Ciao",
  "Olá",
  "Привет",
  "Hallo",
  "Salut",
  "Hej",
  "Γεια",
  "שלום",
  "مرحبا",
  "नमस्ते",
  "Merhaba",
  "Xin chào",
  "السلام عليكم",
  "Sawubona",
  "Jambo",
  "Dia dhuit",
  "Tere",
  "Sveiki",
  "Zdravo",
  "Ahoj",
  "Kamusta",
]

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let mouseX = 0
    let mouseY = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    class Particle {
      x: number
      y: number
      text: string
      speedX: number
      speedY: number
      angle: number
      rotationSpeed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.text = particles[Math.floor(Math.random() * particles.length)]
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.angle = 0
        this.rotationSpeed = (Math.random() - 0.5) *0.05
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.angle += this.rotationSpeed

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height

        const dx = this.x - mouseX
        const dy = this.y - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 100) {
          this.x += (dx / distance) * 2
          this.y += (dy / distance) * 2
        }
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.font =  window.innerWidth > 425 ? "16px Arial" : "12px Arial"
        ctx.fillStyle = theme === "light" ? "rgba(55, 61, 240, 0.8)" : "rgba(200, 200, 255, 0.8)"
        ctx.fillText(this.text, -ctx.measureText(this.text).width / 2, 0)
        ctx.restore()
      }
    }

    const particleInstances = Array.from({ length: 100 }, () => new Particle())

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const particle of particleInstances) {
        particle.update()
        particle.draw()
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouseX = event.touches[0].clientX
        mouseY = event.touches[0].clientY
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}

