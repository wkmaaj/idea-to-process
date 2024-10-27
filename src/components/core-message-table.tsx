import { CoreMessageType, TableProps } from '@/lib'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import GenericTable from './generic-table'
import { Button } from './ui'

const CoreMessageTable: React.FC<
  Omit<TableProps<CoreMessageType>, 'columns'> & {
    onDataUpdate: (updatedData: CoreMessageType[]) => void
  }
> = (props) => {
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null)

  const coreMessageColumns: ColumnDef<CoreMessageType>[] = [
    {
      header: 'Role',
      accessorKey: 'role',
      cell: (info) => info.getValue()
    },
    {
      header: 'Content',
      accessorKey: 'content',
      cell: (info) => info.getValue()
    },
    {
      header: 'Edit',
      id: 'edit',
      cell: ({ row }) =>
        row.original.role === 'user' && (
          <Button
            variant={'default'}
            size={'sm'}
            className="bg-yellow-500 font-semibold"
            onClick={() => {
              setEditingRowIndex(row.index)
            }}
          >
            Edit
          </Button>
        )
    }
  ]

  const handleEditChange = (
    data: CoreMessageType[],
    rowIndex: number,
    columnId: string,
    value: string
  ) => {
    const updatedData = [...data]
    updatedData[rowIndex] = {
      ...updatedData[rowIndex],
      [columnId]: value
    }
    props.onDataUpdate(updatedData)
  }

  return (
    <GenericTable
      {...props}
      data={props.data}
      columns={coreMessageColumns}
      handleEditChange={handleEditChange}
      editingRowIndex={editingRowIndex}
    />
  )
}

export default CoreMessageTable
