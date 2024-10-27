import { TableProps } from '@/lib'
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Input } from './ui'

const GenericTable = <T,>({
  data,
  columns,
  handleEditChange,
  editingRowIndex
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: { _id: false }
    }
  })

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left px-4 py-2 font-medium text-gray-700"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-2 text-gray-600"
                >
                  {editingRowIndex &&
                  handleEditChange &&
                  editingRowIndex === row.index &&
                  cell.column.id === 'content' ? (
                    <Input
                      type="text"
                      value={cell.getValue() as string}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleEditChange(
                          data,
                          row.index,
                          cell.column.id,
                          e.target.value
                        )
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GenericTable
