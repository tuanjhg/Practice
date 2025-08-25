'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Edit, Trash2, Calendar, Settings, History } from 'lucide-react'

import { AppLayout } from '@/components/layout/AppLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { LoadingState } from '@/components/ui/loading-spinner'
import { useVehicle } from '@/services/vehicle.service'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function VehicleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const vehicleId = parseInt(params.id as string)

  const { data: vehicle, isLoading, error } = useVehicle(vehicleId)

  if (error) {
    return (
      <AppLayout>
        <div className="p-6">
          <div className="text-center py-12">
            <p className="text-red-600">Error loading vehicle: {error.message}</p>
            <Button asChild className="mt-4">
              <Link href="/vehicles">Back to Vehicles</Link>
            </Button>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="p-6">
          <LoadingState message="Loading vehicle details..." />
        </div>
      </AppLayout>
    )
  }

  if (!vehicle) {
    return (
      <AppLayout>
        <div className="p-6">
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Vehicle not found</p>
            <Button asChild className="mt-4">
              <Link href="/vehicles">Back to Vehicles</Link>
            </Button>
          </div>
        </div>
      </AppLayout>
    )
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'In Service': { variant: 'warning' as const },
      'Awaiting Parts': { variant: 'info' as const },
      'Ready for Pickup': { variant: 'success' as const },
      'Completed': { variant: 'success' as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || { variant: 'secondary' as const }
    return <Badge variant={config.variant}>{status}</Badge>
  }

  return (
    <AppLayout>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/vehicles">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {vehicle.plate_number} • Owner: {vehicle.ownerName}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/vehicles/${vehicle.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button variant="outline">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      License Plate
                    </label>
                    <p className="font-semibold">{vehicle.plate_number}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      VIN Number
                    </label>
                    <p className="font-mono text-sm">{vehicle.vin || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Make & Model
                    </label>
                    <p className="font-semibold">{vehicle.make} {vehicle.model}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Year
                    </label>
                    <p>{vehicle.year}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Color
                    </label>
                    <p>{vehicle.color}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Engine Type
                    </label>
                    <p>{vehicle.engineType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Current Mileage
                    </label>
                    <p>{vehicle.mileage}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Entry Date
                    </label>
                    <p>{formatDate(vehicle.entryDate)}</p>
                  </div>
                </div>
                
                {vehicle.notes && (
                  <div className="mt-4 pt-4 border-t">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Notes
                    </label>
                    <p className="mt-1 text-sm">{vehicle.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Repair History
                </CardTitle>
                <CardDescription>
                  Previous maintenance and repair records
                </CardDescription>
              </CardHeader>
              <CardContent>
                {vehicle.repairHistory.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Technician</TableHead>
                          <TableHead className="text-right">Cost</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vehicle.repairHistory.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell>{record.date}</TableCell>
                            <TableCell>{record.service}</TableCell>
                            <TableCell>{record.technician}</TableCell>
                            <TableCell className="text-right font-medium">
                              {formatCurrency(record.cost)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">
                      No repair history available
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    {getStatusBadge(vehicle.status.label)}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Owner
                    </label>
                    <p className="font-semibold">{vehicle.ownerName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Entry Date
                    </label>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(vehicle.entryDate)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vehicle Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <img
                    src={vehicle.images.main}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  Create Work Order
                </Button>
                <Button className="w-full" variant="outline">
                  Schedule Maintenance
                </Button>
                <Button className="w-full" variant="outline">
                  Update Status
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}