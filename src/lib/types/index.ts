import { ColumnDef } from '@tanstack/react-table'
import { ObjectId } from 'mongodb'

export type AdditionalContextType = {
  question: string
  answer: string
}

export type CoreMessageType = {
  role: string
  content: string
}

export type HistoryItemType = {
  _id: string
  requirement: string
  category: 'To be implemented'
  version: number
  createdAt: Date
}

export type IdeasDocumentType = {
  _id?: ObjectId
  requirement: string
  category: string
  context: CoreMessageType[]
  bpmnXml: string
  version: number
  createdAt: Date
}

export type TableProps<T> = {
  data: T[]
  columns: ColumnDef<T, unknown>[]
  handleEditChange?: (
    data: T[],
    rowIndex: number,
    columnId: string,
    value: string
  ) => void
  editingRowIndex?: number | null
}

export type RequestBody = {
  context: { role: string; content: string }[]
  bpmnXml: string
}
