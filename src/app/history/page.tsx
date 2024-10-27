'use client'

import { HistoryContent, ReactQueryProvider } from '@/components'

const HistoryPage: React.FC = () => (
  <ReactQueryProvider>
    <HistoryContent />
  </ReactQueryProvider>
)

export default HistoryPage
