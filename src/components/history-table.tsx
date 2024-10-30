'use client'

import { IdeasDocumentType, TableProps } from '@/lib'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import BpmnModal from './bpmn-modal'
import GenericTable from './generic-table'
import { Button } from './ui'

const HistoryTable: React.FC<Omit<TableProps<IdeasDocumentType>, 'columns'>> = (
  props
) => {
  const [selectedRow, setSelectedRow] = useState<IdeasDocumentType | null>(null)

  const openModal = (row: IdeasDocumentType) => {
    setSelectedRow(row)
  }

  const closeModal = () => {
    setSelectedRow(null)
  }

  const historyItemColumns: ColumnDef<IdeasDocumentType>[] = [
    { header: 'ID', accessorKey: '_id' },
    { header: 'Requirement', accessorKey: 'requirement' },
    {
      header: 'Category',
      accessorKey: 'category'
    },
    { header: 'Version', accessorKey: 'version' },
    {
      header: 'Created At',
      accessorKey: 'createdAt',
      cell: ({ getValue }) => new Date(getValue() as Date).toISOString()
    },
    {
      header: 'View',
      accessorKey: 'view',
      cell: ({ row }) => (
        <Button
          className="bg-green-600 font-semibold text-white px-4 py-2 rounded items-center"
          onClick={() => openModal(row.original)}
        >
          View
        </Button>
      )
    }
  ]

  return (
    <>
      <GenericTable
        {...props}
        data={props.data}
        columns={historyItemColumns}
      />
      {selectedRow && (
        <BpmnModal
          diagramXml={selectedRow.bpmnXml}
          messages={[
            { role: 'user', content: selectedRow.requirement },
            ...selectedRow.context
          ]}
          isModalOpen={Boolean(selectedRow)}
          setIsModalOpen={closeModal}
          showHeading={false}
          buttonColor="bg-green-600"
          buttonText="View"
          closeOnOutClick={true}
          category={selectedRow.category}
          isHistoryPage={true}
        />
      )}
    </>
  )
}

export default HistoryTable
