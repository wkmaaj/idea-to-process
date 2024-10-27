'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from './ui'

type BpmnVisualizerProps = {
  diagramXml: string
}

const BpmnVisualizer: React.FC<BpmnVisualizerProps> = ({ diagramXml }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadBpmnVisualization = async () => {
      if (typeof window !== 'undefined') {
        const { BpmnVisualization, FitType } = await import(
          'bpmn-visualization'
        )
        const container = document.getElementById('bpmn-container')
        if (container) {
          const bpmnVisualization = new BpmnVisualization({
            container: containerRef.current ?? container,
            navigation: { enabled: true }
          })
          try {
            bpmnVisualization.load(diagramXml, {
              fit: { type: FitType.Center }
            })
          } catch (error) {
            console.log(error)
            setError(
              'There was an issue loading the BPMN diagram. Please try again later.'
            )
          }
        }
      }
    }

    loadBpmnVisualization()
  }, [diagramXml])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-60 bg-red-100 border border-red-400 text-red-700 rounded p-4">
        <p className="text-center">{error}</p>
        <Button className="mt-4">Try Again</Button>
      </div>
    )
  }
  return (
    <div
      ref={containerRef}
      id="bpmn-container"
      style={{ width: '100%', height: '600px' }}
    />
  )
}

export default BpmnVisualizer
