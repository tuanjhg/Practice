'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Save, Calculator } from 'lucide-react'
import Link from 'next/link'

import { AppLayout } from '@/components/layout/AppLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { useCreateWorkOrder } from '@/services/work-order.service'
import { ORDER_STATUS_MAP, WorkOrderStatus } from '@/types/work-order'

const workOrderSchema = z.object({
  work_order_code: z.string().min(1, 'Work order code is required'),
  tenant_id: z.string().min(1, 'Garage is required'),
  vehicle_id: z.string().min(1, 'Vehicle is required'),
  customer_id: z.string().min(1, 'Customer is required'),
  status: z.enum(['pending', 'waiting_for_approval', 'in_progress', 'ready_for_final_check', 'completed', 'paid', 'rejected_by_customer', 'paused']),
  initial_notes: z.string().optional(),
  estimated_completion_date: z.string().optional(),
  total_quote_price: z.number().min(0).optional(),
  total_paid_amount: z.number().min(0).optional(),
  created_by_user_id: z.string().min(1, 'Created by user is required'),
})

type WorkOrderFormData = z.infer<typeof workOrderSchema>

export default function AddWorkOrderPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0)
  const router = useRouter()
  const { toast } = useToast()
  const createWorkOrderMutation = useCreateWorkOrder()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<WorkOrderFormData>({
    resolver: zodResolver(workOrderSchema),
    defaultValues: {
      status: 'pending',
      total_paid_amount: 0,
    }
  })

  const watchedStatus = watch('status')
  const watchedQuotePrice = watch('total_quote_price')

  const onSubmit = async (data: WorkOrderFormData) => {
    setIsLoading(true)
    try {
      const workOrderData = {
        work_order_code: data.work_order_code,
        tenant_id: parseInt(data.tenant_id),
        vehicle_id: parseInt(data.vehicle_id),
        customer_id: parseInt(data.customer_id),
        status: data.status as WorkOrderStatus,
        initial_notes: data.initial_notes || null,
        estimated_completion_date: data.estimated_completion_date || null,
        total_quote_price: data.total_quote_price || null,
        total_paid_amount: data.total_paid_amount || 0,
        created_by_user_id: parseInt(data.created_by_user_id),
      }

      await createWorkOrderMutation.mutateAsync(workOrderData)

      toast({
        title: 'Work Order Created',
        description: 'Work order has been successfully created.',
      })

      router.push('/orders')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create work order. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const calculateEstimatedPrice = () => {
    
    const basePrice = 500000
    const complexityMultiplier = Math.random() * 2 + 1 
    const estimated = Math.round(basePrice * complexityMultiplier)
    setCalculatedPrice(estimated)
    setValue('total_quote_price', estimated)
    
    toast({
      title: 'Price Calculated',
      description: `Estimated price: ${new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(estimated)}`,
    })
  }

  return (
    <AppLayout>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
              <CardDescription>
                Basic information about the work order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="work_order_code">
                    Work Order Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('work_order_code')}
                    id="work_order_code"
                    placeholder="e.g., #RO-1027"
                    className={errors.work_order_code ? 'border-[#DEE33E]' : ''}
                  />
                  {errors.work_order_code && (
                    <p className="text-sm text-red-600">{errors.work_order_code.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">
                    Status <span className="text-red-500">*</span>
                  </Label>
                  <Select value={watchedStatus} onValueChange={(value) => setValue('status', value as WorkOrderStatus)}>
                    <SelectTrigger className={errors.status ? 'border-[#DEE33E]' : ''}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {ORDER_STATUS_MAP.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-sm text-red-600">{errors.status.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tenant_id">
                    Garage <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={(value) => setValue('tenant_id', value)}>
                    <SelectTrigger className={errors.tenant_id ? 'border-[#DEE33E]' : ''}>
                      <SelectValue placeholder="Select garage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Auto Gara Cầu Giấy</SelectItem>
                      <SelectItem value="2">Gara Minh Tâm</SelectItem>
                      <SelectItem value="3">Gara An Phát</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.tenant_id && (
                    <p className="text-sm text-red-600">{errors.tenant_id.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicle_id">
                    Vehicle <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={(value) => setValue('vehicle_id', value)}>
                    <SelectTrigger className={errors.vehicle_id ? 'border-[#DEE33E]' : ''}>
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">30H-123.45 - Toyota Camry</SelectItem>
                      <SelectItem value="102">29C-987.65 - Ford Ranger</SelectItem>
                      <SelectItem value="103">51K-456.78 - Honda CR-V</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.vehicle_id && (
                    <p className="text-sm text-red-600">{errors.vehicle_id.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer_id">
                    Customer <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={(value) => setValue('customer_id', value)}>
                    <SelectTrigger className={errors.customer_id ? 'border-[#DEE33E]' : ''}>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="201">Nguyễn Văn An</SelectItem>
                      <SelectItem value="202">Trần Thị Bích</SelectItem>
                      <SelectItem value="203">Lê Hoàng Dũng</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.customer_id && (
                    <p className="text-sm text-red-600">{errors.customer_id.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="created_by_user_id">
                    Created By <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={(value) => setValue('created_by_user_id', value)}>
                    <SelectTrigger className={errors.created_by_user_id ? 'border-[#DEE33E]' : ''}>
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">Mechanic 1</SelectItem>
                      <SelectItem value="8">Mechanic 2</SelectItem>
                      <SelectItem value="9">Service Advisor</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.created_by_user_id && (
                    <p className="text-sm text-red-600">{errors.created_by_user_id.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
              <CardDescription>
                Details about the service to be performed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="initial_notes">Initial Notes</Label>
                  <Textarea
                    {...register('initial_notes')}
                    id="initial_notes"
                    placeholder="Describe the customer's request and initial assessment..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimated_completion_date">Estimated Completion Date</Label>
                  <Input
                    {...register('estimated_completion_date')}
                    id="estimated_completion_date"
                    type="date"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing Information</CardTitle>
              <CardDescription>
                Quote and payment information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="total_quote_price">Total Quote Price (VND)</Label>
                  <div className="flex gap-2">
                    <Input
                      {...register('total_quote_price', { valueAsNumber: true })}
                      id="total_quote_price"
                      type="number"
                      placeholder="0"
                      min="0"
                    />
                    <Button type="button" variant="outline" onClick={calculateEstimatedPrice}>
                      <Calculator className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="total_paid_amount">Total Paid Amount (VND)</Label>
                  <Input
                    {...register('total_paid_amount', { valueAsNumber: true })}
                    id="total_paid_amount"
                    type="number"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

            </CardContent>
          </Card>

          <div className="flex justify-between gap-4">
            <Button variant="outline" asChild>
              <Link href="/orders">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                'Creating Order...'
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create Work Order
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}