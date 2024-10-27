'use client'

import { Button, HistoryTable } from '@/components'
import { IdeasDocumentType } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const fetchData = async (): Promise<IdeasDocumentType[]> => {
  const response = await fetch('/api/mongo')
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await response.json()
  return data.map((item: IdeasDocumentType) => ({
    ...item,
    createdAt: new Date(item.createdAt)
  }))
}

const HistoryContent: React.FC = () => {
  const router = useRouter()
  const { data, error, isLoading } = useQuery<IdeasDocumentType[]>({
    queryKey: ['fetchData'],
    queryFn: fetchData
  })

  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        Loading...
        <span className="px-1">
          <Loader2 className="size-10 animate-spin" />
        </span>
      </div>
    )
  }

  if (error) {
    return <div>Error loading data</div>
  }

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto mt-10">
      {data?.length === 0 ? (
        <p>No records present in database</p>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Historical Ideas</h2>
          <HistoryTable data={data ?? []} />
          <Button
            className="mt-4 bg-blue-500 text-white"
            onClick={() => router.push('/')}
          >
            Back to Home
          </Button>
        </>
      )}
    </div>
  )
}

export default HistoryContent
