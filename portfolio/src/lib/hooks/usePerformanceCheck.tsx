'use client'

import { useState, useEffect } from 'react'

// Custom hook to check device capabilities
export function usePerformanceCheck() {
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkDevicePerformance = () => {
      try {
        const hardwareConcurrency = navigator.hardwareConcurrency || 2
        const deviceMemory = (navigator as any).deviceMemory || 4 // Fallback to 4GB
        const connection = (navigator as any).connection?.effectiveType || '4g'

        const thresholds = {
          minCores: 2,
          minMemory: 4, // GB
          minNetwork: '3g'
        }

        const isUnderpowered = 
          hardwareConcurrency < thresholds.minCores ||
          deviceMemory < thresholds.minMemory ||
          (connection === 'slow-2g' || connection === '2g')

        setIsLowEndDevice(isUnderpowered)
      } catch (error) {
        console.error('Performance check failed:', error)
        // Fallback to safe assumption
        setIsLowEndDevice(true)
      } finally {
        setIsChecking(false)
      }
    }

    checkDevicePerformance()
  }, [])

  return { isLowEndDevice, isChecking }
}
