'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Filter, ChevronDown } from 'lucide-react'
import { AppLayout } from '@/components/layout/AppLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { LoadingState } from '@/components/ui/loading-spinner'
import { useVehicles } from '@/services/vehicle.service'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { VehicleDetail, mockVehicleDetails } from '@/types/vehicle'

export default function VehiclesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilter, setShowFilter] = useState('All')
  const [showResults, setShowResults] = useState(5)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const pageSize = showResults

  const { data, isLoading, error } = useVehicles({
    page: currentPage,
    limit: pageSize,
    search: searchTerm,
  })

  const selectedVehicle = selectedVehicleId 
    ? mockVehicleDetails.find(v => v.id === selectedVehicleId) || null
    : null

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
  }

  const handleViewDetail = (vehicleId: number) => {
    setSelectedVehicleId(vehicleId)
    setIsDetailModalOpen(true)
  }

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false)
    setSelectedVehicleId(null)
  }

  if (error) {
    return (
      <AppLayout>
        <div className="p-6">
          <div className="text-center py-12">
            <p className="text-red-600">Error loading vehicles: {error.message}</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Show:</span>
              <div className="relative">
                <select 
                  value={showFilter}
                  onChange={(e) => setShowFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#DEE33E] focus:border-transparent"
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          
          <Button>
           <Link href="/vehicles/add">Add Your Vehicle</Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm theo biển số, chủ xe, số VIN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-2"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Lọc theo:</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#DEE33E] focus:border-transparent">
                <option>Tất cả</option>
                <option>Đang sửa chữa</option>
                <option>Hoàn thành</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {isLoading ? (
            <div className="p-8">
              <LoadingState message="Loading vehicles..." />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-medium text-gray-700 py-4">BIỂN SỐ</TableHead>
                      <TableHead className="font-medium text-gray-700 py-4">HÃNG XE & MẪU XE</TableHead>
                      <TableHead className="font-medium text-gray-700 py-4">CHỦ SỞ HỮU</TableHead>
                      <TableHead className="font-medium text-gray-700 py-4">GARA</TableHead>
                      <TableHead className="font-medium text-gray-700 py-4">NGÀY VÀO XƯỞNG</TableHead>
                      <TableHead className="font-medium text-gray-700 py-4">HÀNH ĐỘNG</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.data.map((vehicle, index) => (
                      <TableRow key={vehicle.vehicle_id || index} className="hover:bg-gray-50">
                        <TableCell className="font-medium py-4">
                          {vehicle.plate_number}
                        </TableCell>
                        <TableCell className="py-4">
                          <div>
                            <p className="font-medium text-gray-900">{vehicle.make} {vehicle.model}</p>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <span className="text-gray-900">Customer {vehicle.customer_id}</span>
                        </TableCell>
                        <TableCell className="py-4">
                          <span className="text-gray-900">Không rõ</span>
                        </TableCell>
                        <TableCell className="py-4">
                          <span className="text-gray-900">{vehicle.createdAt ? formatDate(vehicle.createdAt) : '21/01/1970'}</span>
                        </TableCell>
                        <TableCell className="py-4">
                          <button 
                            onClick={() => handleViewDetail(90)}
                            className="text-orange-500 hover:text-orange-600 font-medium cursor-pointer"
                          >
                            Detail
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {data?.data.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">
                    {searchTerm ? 'No vehicles found matching your search.' : 'No vehicles found.'}
                  </p>
                </div>
              )}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Show result:</span>
                  <div className="relative">
                    <select 
                      value={showResults}
                      onChange={(e) => setShowResults(Number(e.target.value))}
                      className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#DEE33E] focus:border-transparent"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "w-8 h-8 rounded-full text-sm font-medium transition-colors",
                        currentPage === page
                          ? "bg-black text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      {page}
                    </button>
                  ))}
                  <button 
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="w-8 h-8 rounded-full text-gray-600 hover:bg-gray-100 flex items-center justify-center"
                  >
                    ›
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  )
}