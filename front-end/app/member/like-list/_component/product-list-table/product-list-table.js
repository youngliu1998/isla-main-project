import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useWishProduct } from '@/hook/use-wish-with-product'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table'
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import Image from "next/image"
import Link from 'next/link'
import { useClientToken } from '@/hook/use-client-token.js'
import { useAuth } from '@/hook/use-auth.js'

export default function WishProductListTable() {
  const { user, isLoading: isAuthLoading } = useAuth()
  const token = useClientToken()
  const [globalFilter, setGlobalFilter] = useState('');
  const router = useRouter();

  const {data: product, isLoading ,isError} = useWishProduct(token)
  console.log(product)


  const columns = useMemo(() => [
    {
      accessorKey: 'image',
      header: '',
      cell: ({ row }) => (
        <Image
          src={`https://isla-image.chris142852145.workers.dev/${row.original.images[0]}`}
          alt={row.original.name}
          width={48}
          height={48}
          className="rounded"
        />
      )
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <button
          className="btn btn-link p-0 text-decoration-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          收藏商品名稱
          {column.getIsSorted() === "asc" ? <BsArrowUpCircle className="ms-2" />
            : column.getIsSorted() === "desc" ? <BsArrowDownCircle className="ms-2" />
              : <BsArrowDownCircle className="ms-2" />}
        </button>
      ),
      cell: ({ row }) => (
        <div>
          <Link href={`http://localhost:3000/product/${row.original.product_id}`} passHref><div className="fw-bold">{row.original.name}</div></Link>
          <div className="text-muted small">{row.original.category_name}</div>
        </div>
      ),
    },
    {
      accessorKey: 'brand',
      header: ({ column }) => (
        <button
          className="btn btn-link p-0 text-decoration-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          品牌
          {column.getIsSorted() === "asc" ? <BsArrowUpCircle className="ms-2" />
            : column.getIsSorted() === "desc" ? <BsArrowDownCircle className="ms-2" />
              : <BsArrowDownCircle className="ms-2" />}
        </button>
      ),
      cell: ({ row }) => <span className="fw-semibold">{row.original.brand_name}</span>
    },
    {
      accessorKey: 'price',
      header: ({ column }) => (
        <button
          className="btn btn-link p-0 text-decoration-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          價格
          {column.getIsSorted() === "asc" ? <BsArrowUpCircle className="ms-2" />
            : column.getIsSorted() === "desc" ? <BsArrowDownCircle className="ms-2" />
              : <BsArrowDownCircle className="ms-2" />}
        </button>
      ),
      cell: ({ row }) => (
        <span className="fw-semibold">NT$ {row.original.final_price.toLocaleString()}</span>
      ),
    },
  ], []);

  const table = useReactTable({
    data: product ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="card w-100">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          {/*<thead className="table-light">*/}
          {/*{table.getHeaderGroups().map((headerGroup) => (*/}
          {/*  <tr key={headerGroup.id}>*/}
          {/*    {headerGroup.headers.map((header) => (*/}
          {/*      <th key={header.id}>*/}
          {/*        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}*/}
          {/*      </th>*/}
          {/*    ))}*/}
          {/*  </tr>*/}
          {/*))}*/}
          {/*</thead>*/}
          <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4 text-muted">
                查無商品資料
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
