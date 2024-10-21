'use client'

import { useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ColDef } from 'ag-grid-community'
import { PropertyDetailsType } from '@/app/types'

// Import styles directly from @ag-grid-community/styles
import '@/styles/ag-grid.css'
import '@/styles/ag-theme.css'

type PropertyGridProps = {
  properties: PropertyDetailsType[]
  onRowClick: (property: PropertyDetailsType) => void
}

export function PropertyGrid({ properties, onRowClick }: PropertyGridProps) {
  const columnDefs: ColDef[] = useMemo(() => [
    { field: 'address', headerName: 'Address' },
    { field: 'price', headerName: 'Price' },
    { field: 'status', headerName: 'Status', valueGetter: () => 'In Progress' }
  ], [])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
  }), [])

  const onRowClicked = (event: any) => {
    onRowClick(event.data)
  }

  return (
    <div className="ag-theme-alpine-dark" style={{ height: 'calc(100vh - 200px)', width: '100%' }}>
      <AgGridReact
        rowData={properties}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onRowClicked={onRowClicked}
      />
    </div>
  )
}
