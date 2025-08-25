'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

import { AppLayout } from '@/components/layout/AppLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useCreateVehicle } from '@/services/vehicle.service'
import { FormSection } from '@/components/forms/FormField'

const vehicleSchema = z.object({
  licensePlate: z.string().min(1, 'License plate is required'),
  vin: z.string().optional(),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
  color: z.string().optional(),
  lastMileage: z.number().min(0).optional(),
  ownerName: z.string().min(1, 'Owner name is required'),
  tenant: z.string().min(1, 'Tenant is required'),
})

type VehicleFormData = z.infer<typeof vehicleSchema>

export default function AddVehiclePage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const createVehicleMutation = useCreateVehicle()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
  })

  const onSubmit = async (data: VehicleFormData) => {
    setIsLoading(true)
    try {

      const vehicleData = {
        plate_number: data.licensePlate,
        vin_number: data.vin,
        make: data.make,
        model: data.model,
        year: data.year,
        color: data.color,
        last_mileage: data.lastMileage,
        tenant_id: 1, 
        customer_id: 1,
      }

      await createVehicleMutation.mutateAsync(vehicleData)

      toast({
        title: 'Vehicle Added',
        description: 'Vehicle has been successfully added to the system.',
      })

      router.push('/vehicles')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add vehicle. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AppLayout>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
              <CardDescription>
                Basic information about the vehicle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormSection title="">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="licensePlate">
                      License Plate <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register('licensePlate')}
                      id="licensePlate"
                      placeholder="e.g., 29A-123.45"
                      className={errors.licensePlate ? 'border-red-500' : ''}
                    />
                    {errors.licensePlate && (
                      <p className="text-sm text-red-600">{errors.licensePlate.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vin">VIN Number</Label>
                    <Input
                      {...register('vin')}
                      id="vin"
                      placeholder="17-digit VIN"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="make">
                      Make <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register('make')}
                      id="make"
                      placeholder="e.g., Toyota"
                      className={errors.make ? 'border-red-500' : ''}
                    />
                    {errors.make && (
                      <p className="text-sm text-red-600">{errors.make.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">
                      Model <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register('model')}
                      id="model"
                      placeholder="e.g., Camry 2.5Q"
                      className={errors.model ? 'border-red-500' : ''}
                    />
                    {errors.model && (
                      <p className="text-sm text-red-600">{errors.model.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      {...register('year', { valueAsNumber: true })}
                      id="year"
                      type="number"
                      placeholder="e.g., 2022"
                      min="1900"
                      max={new Date().getFullYear() + 1}
                    />
                    {errors.year && (
                      <p className="text-sm text-red-600">{errors.year.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      {...register('color')}
                      id="color"
                      placeholder="e.g., Black"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastMileage">Last Mileage</Label>
                    <Input
                      {...register('lastMileage', { valueAsNumber: true })}
                      id="lastMileage"
                      type="number"
                      placeholder="e.g., 12345"
                      min="0"
                    />
                  </div>
                </div>
              </FormSection>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Owner Information</CardTitle>
              <CardDescription>
                Information about the vehicle owner
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">
                    Owner Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('ownerName')}
                    id="ownerName"
                    placeholder="Full name"
                    className={errors.ownerName ? 'border-red-500' : ''}
                  />
                  {errors.ownerName && (
                    <p className="text-sm text-red-600">{errors.ownerName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tenant">
                    Garage <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('tenant')}
                    id="tenant"
                    placeholder="Select garage"
                    className={errors.tenant ? 'border-red-500' : ''}
                  />
                  {errors.tenant && (
                    <p className="text-sm text-red-600">{errors.tenant.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between gap-4">
            <Button variant="outline" asChild>
              <Link href="/vehicles">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                'Adding Vehicle...'
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Add Vehicle
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}