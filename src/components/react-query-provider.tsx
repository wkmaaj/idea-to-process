'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

type ReactQueryProviderProps = {
  children: ReactNode
}

const queryClient = new QueryClient()

const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({
  children
}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

export default ReactQueryProvider
