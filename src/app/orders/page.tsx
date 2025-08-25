'use client'

import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { Plus, Clock, User, Calendar, DollarSign } from 'lucide-react'
import Link from 'next/link'

import { AppLayout } from '@/components/layout/AppLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LoadingState } from '@/components/ui/loading-spinner'
import { useKanbanData, useUpdateWorkOrderStatus } from '@/services/work-order.service'
import { WorkOrderStatus, WorkOrderWithDetails, KANBAN_COLUMNS, ORDER_STATUS_MAP } from '@/types/work-order'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

interface KanbanColumnProps {
  title: string
  status: WorkOrderStatus
  orders: WorkOrderWithDetails[]
  onOrderClick: (order: WorkOrderWithDetails) => void
}

function KanbanColumn({ title, status, orders, onOrderClick }: KanbanColumnProps) {
  const statusConfig = ORDER_STATUS_MAP.find(s => s.value === status)
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-t-lg">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-white capitalize">
            {title}
          </h3>
          <Badge variant="secondary" className="text-xs">
            {orders.length}
          </Badge>
        </div>
      </div>
      
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-4 space-y-3 bg-gray-25 dark:bg-gray-900 min-h-[500px] transition-colors ${
              snapshot.isDraggingOver ? 'bg-blue-50 dark:bg-blue-900/20' : ''
            }`}
          >
            {orders.map((order, index) => (
              <Draggable key={order.id} draggableId={order.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`transition-all ${
                      snapshot.isDragging ? 'rotate-3 scale-105' : ''
                    }`}
                    onClick={() => onOrderClick(order)}
                  >
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-sm">{order.work_order_code}</h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {order.vehicleInfo}
                              </p>
                            </div>
                            <Badge 
                              variant={statusConfig?.class.includes('yellow') ? 'warning' : 
                                      statusConfig?.class.includes('blue') ? 'info' :
                                      statusConfig?.class.includes('green') ? 'success' : 'secondary'}
                              className="text-xs"
                            >
                              {statusConfig?.label}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{order.customerName}</span>
                            </div>
                            
                            {order.estimated_completion_date && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{formatDate(order.estimated_completion_date)}</span>
                              </div>
                            )}
                            
                            {order.total_quote_price && (
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                <span>{formatCurrency(order.total_quote_price)}</span>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{formatDate(order.created_at || '')}</span>
                            </div>
                          </div>
                          
                          {order.initial_notes && (
                            <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">
                              {order.initial_notes}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            
            {orders.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p className="text-sm">No orders in this stage</p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default function OrdersPage() {
  const [kanbanData, setKanbanData] = useState<Record<WorkOrderStatus, WorkOrderWithDetails[]>>()
  const { data, isLoading, error } = useKanbanData()
  const updateStatusMutation = useUpdateWorkOrderStatus()
  const { toast } = useToast()

  useEffect(() => {
    if (data) {
      setKanbanData(data)
    }
  }, [data])

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result


    if (!destination) return


    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const orderId = parseInt(draggableId)
    const newStatus = destination.droppableId as WorkOrderStatus

    try {

      if (kanbanData) {
        const newKanbanData = { ...kanbanData }
        const sourceOrders = [...newKanbanData[source.droppableId as WorkOrderStatus]]
        const destOrders = [...newKanbanData[destination.droppableId as WorkOrderStatus]]
        

        const [movedOrder] = sourceOrders.splice(source.index, 1)
        

        destOrders.splice(destination.index, 0, { ...movedOrder, status: newStatus })
        
        newKanbanData[source.droppableId as WorkOrderStatus] = sourceOrders
        newKanbanData[destination.droppableId as WorkOrderStatus] = destOrders
        
        setKanbanData(newKanbanData)
      }


      await updateStatusMutation.mutateAsync({ id: orderId, status: newStatus })
      
      toast({
        title: 'Order Updated',
        description: `Work order moved to ${newStatus.replace('_', ' ')}.`,
      })
    } catch (error) {

      if (data) {
        setKanbanData(data)
      }
      toast({
        title: 'Error',
        description: 'Failed to update work order status.',
        variant: 'destructive',
      })
    }
  }

  const handleOrderClick = (order: WorkOrderWithDetails) => {

    console.log('Order clicked:', order)
  }

  const getColumnTitle = (status: WorkOrderStatus) => {
    const statusMap: Record<WorkOrderStatus, string> = {
      pending: 'Pending',
      waiting_for_approval: 'Waiting for Approval', 
      in_progress: 'In Progress',
      ready_for_final_check: 'Ready for Final Check',
      completed: 'Completed',
      paid: 'Paid',
      rejected_by_customer: 'Rejected by Customer',
      paused: 'Paused',
    }
    return statusMap[status] || status
  }

  if (error) {
    return (
      <AppLayout>
        <div className="p-6">
          <div className="text-center py-12">
            <p className="text-red-600">Error loading work orders: {error.message}</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4">
          <Button asChild>
            <Link href="/orders/add">
              <Plus className="mr-2 h-4 w-4" />
              New Work Order
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <LoadingState message="Loading work orders..." />
        ) : kanbanData ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[calc(100vh-200px)]">
              {KANBAN_COLUMNS.map((status) => (
                <Card key={status} className="flex flex-col h-full">
                  <KanbanColumn
                    title={getColumnTitle(status)}
                    status={status}
                    orders={kanbanData[status] || []}
                    onOrderClick={handleOrderClick}
                  />
                </Card>
              ))}
            </div>
          </DragDropContext>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No work orders found.</p>
            <Button asChild className="mt-4">
              <Link href="/orders/add">Create Your First Work Order</Link>
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  )
}