'use client'
import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useProductManage } from '@/hook/use-product-manage.js'
import { useAuth } from '@/hook/use-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LoadingLottie from '@/components/loading/lottie-loading.js'
import { toast } from 'react-toastify'

export default function AdminProductTable() {
  const router = useRouter()
  const { user, isAuth, logout } = useAuth()
  const user_id = user?.id || '錯誤'
  const nickname = user?.nickname || '錯誤'
  const email = user?.email || '錯誤'

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  useEffect(() => {
    if (!isAuth) {
      toast.error('請先登入！')
      logout()
      router.push('/member/login')
    }
  }, [isAuth, router])

  const { products, total, isLoading } = useProductManage(
    {},
    { pageSize, pageIndex }
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: 'product_id',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: '商品名稱',
      },
      {
        accessorKey: 'brand_name',
        header: '品牌',
      },
      {
        accessorKey: 'category_name',
        header: '分類',
      },
      {
        accessorKey: 'status',
        header: '狀態',
        cell: ({ row }) => (
          <span
            className={
              row.original.status === 'active'
                ? 'text-green-500'
                : 'text-gray-400'
            }
          >
            {row.original.status}
          </span>
        ),
      },
      {
        header: '操作',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleEdit(row.original)}>
              編輯
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(row.original)}
            >
              刪除
            </Button>
          </div>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data: products,
    columns,
    pageCount: Math.ceil(total / pageSize),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === 'function'
          ? updater({ pageIndex, pageSize })
          : updater
      setPageIndex(next.pageIndex)
      setPageSize(next.pageSize)
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  })
  if (!isAuth) return null
  if (isLoading)
    return (
      <div className="loading-container flex items-center justify-center flex-col h-full w-full">
        <LoadingLottie />
        <h1 className="text-2xl font-bold mb-4 text-stone-500">
          載入商品資料中...
        </h1>
      </div>
    )

  return (
    <Card>
      <CardContent className="p-4">
        <table className="w-full text-sm border">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 border-b">
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
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 border-b">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between mt-4">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            上一頁
          </Button>
          <span>
            頁數 {table.getState().pagination.pageIndex + 1} /{' '}
            {table.getPageCount()}
          </span>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            下一頁
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function handleEdit(product) {
  console.log('編輯商品：', product)
  // 實作導向編輯頁或 modal
}

function handleDelete(product) {
  if (confirm(`確定要刪除商品「${product.name}」？`)) {
    console.log('刪除商品：', product)
    // 實作刪除 API 呼叫
  }
}
