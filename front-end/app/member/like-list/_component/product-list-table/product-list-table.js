import React, { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation' // Import useRouter
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table'


export default function WishProductListTable() {
  // const [data, setProducts] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedProductForDialog, setSelectedProductForDialog] = useState(null);
  const router = useRouter();
  const data = useState([
    {
      id: 1,
      name: '保濕精華液',
      category: '精華液',
      brand: 'ISLA',
      price: 1280,
      stock: 45,
      status: 'active',
      images: ['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop'], // Now an array
      description: '深層保濕，適合乾性肌膚使用。採用天然成分，溫和無刺激，能有效鎖住肌膚水分，改善乾燥粗糙，使肌膚水潤飽滿。',
      updatedAt: '2024-01-20',
      sale_price: null,       // New field
      sale_start_date: null, // New field (e.g., "2025-06-01")
      sale_end_date: null     // New field (e.g., "2025-06-15")
    },
  ])



  const columns = useMemo(() => [
    {
      accessorKey: 'image',
      header: '商品圖片',
      cell: ({ row }) => (
        <Image src={row.original.image}
               alt={row.original.name}
               width={48}
               height={48}
               className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform cursor-pointer"
        />
      )
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-medium text-left"
        >
          商品名稱
          {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" />
            : column.getIsSorted() === "desc" ? <ArrowDown className="ml-2 h-4 w-4" />
              : <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-sm text-gray-500">{row.original.category}</div>
        </div>
      ),
    },
    {
      accessorKey: 'brand',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-medium text-left"
        >
          品牌
          {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" />
            : column.getIsSorted() === "desc" ? <ArrowDown className="ml-2 h-4 w-4" />
              : <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.original.brand}</div>
    },
    {
      accessorKey: 'price',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-medium text-left"
        >
          價格
          {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" />
            : column.getIsSorted() === "desc" ? <ArrowDown className="ml-2 h-4 w-4" />
              : <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">NT$ {row.original.price.toLocaleString()}</div>,
    },
    {
      accessorKey: 'stock',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0 font-medium text-left"
        >
          庫存
          {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" />
            : column.getIsSorted() === "desc" ? <ArrowDown className="ml-2 h-4 w-4" />
              : <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="font-medium">{row.original.stock} 件</div>
          {getStockTag(row.original.stock)}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: '狀態',
      cell: ({ row }) => getStatusTag(row.original.status)
    },
  ], []);
  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    initialState: { pagination: { pageSize: 10 } }, // Adjusted pageSize
  });


  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]"> {/* Added min-w for better responsiveness */}
          <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" // Adjusted styling
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap"> {/* Adjusted styling */}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-10 text-center text-gray-500">
                查無商品資料
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  )






}

