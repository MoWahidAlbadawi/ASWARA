import { GetOrderById, UpdateOrderStatus } from "@/hooks/order/useOrder"
import { FaMoneyBillWave, FaUser } from "react-icons/fa"
import { IoIosTime } from "react-icons/io"
import { useNavigate ,  useParams } from "react-router-dom"
import { Box, Chip, LinearProgress, Button , MenuItem, Select, Typography } from "@mui/material"

import { GetAllUsers } from "@/hooks/users/useUsers"
import { useContext,  useEffect , useMemo ,  useState } from "react"
import { GoldPricesContext } from "@/context/GoldPrices"
import type { Order, OrderStatus } from "@/services/types/orders"
import type { LocalProduct } from "@/services/types/products"
import { useTranslation } from "react-i18next"
import toast from "react-hot-toast"

const OrderDetails = () => {   
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { orderId } = useParams();
    const {data : order , isLoading , refetch} = GetOrderById(orderId || '');
    const { data : users } = GetAllUsers();
    const { goldPrices } = useContext(GoldPricesContext);

    const [status , setStatus]  = useState(order?.Status || 'pending');
    const { mutate : mutateStatus } = UpdateOrderStatus(orderId || '');
    
    const [orderInfo , setOrderInfo] = useState<Order>({
        UserID : order?.UserID || 0,
        OrderID : order?.OrderID || 0,
        created_at : order?.created_at || '',
        updated_at : order?.created_at || '',
        Status : order?.Status || 'pending',
        TotalAmount : order?.TotalAmount || 0,
        ShippingAddress : order?.ShippingAddress || '',
         PaymentMethod : order?.PaymentMethod || '',
        order_detials : order?.order_detials || [],
    });

    useEffect(() => {
      if(order) {
      setOrderInfo({
        UserID : order?.UserID || 0,
        OrderID : order?.OrderID || 0,
        created_at : order?.created_at || '',
        updated_at : order?.created_at || '',
        Status : order?.Status || 'pending',
        TotalAmount : order?.TotalAmount || 0,
        ShippingAddress : order?.ShippingAddress || '',
         PaymentMethod : order?.PaymentMethod || '',
        order_detials : order?.order_detials || [],
      })
      setStatus(order.Status || 'pending')
    }
    },[order])

      const { UserID , created_at , updated_at , Status , ShippingAddress } = orderInfo;

      const localProducts: LocalProduct[] = [
    { name: t('orderDetails.products.braceletLock'), price: getProductPriceByKarat(21), weight : 12 , karat : 21 , quantity: 1 },
    { name: t('orderDetails.products.chainLetterM'), price: getProductPriceByKarat(21), weight : 15,  karat: 21, quantity: 1 },
    { name: t('orderDetails.products.childrenEarrings'), price: getProductPriceByKarat(18), weight : 2, karat: 18, quantity: 2 },
    { name: t('orderDetails.products.ankletFrank'), price: getProductPriceByKarat(21), weight : 8,karat: 21, quantity: 1 },
    { name: t('orderDetails.products.heavyChain'), price: getProductPriceByKarat(21), weight : 45 , karat: 21, quantity: 1 },
  ]

      const totalAmount = useMemo(() => {
        return localProducts.reduce((acc,item) => {
            return acc + (item.price * item.weight * item.quantity)
        },0)
    } , [localProducts])

    function getProductPriceByKarat (karat : 18 | 21 | 24) {
        const itemKaratMatched = goldPrices.find((item) => item.karat == karat);
        return itemKaratMatched?.price || 0;
    }

    // Change Order Status
const orderStatus = [
          { value: "pending", label: "Pending", color: "warning" },
          { value: "processing", label: "Processing", color: "info" },
          { value: "shipped", label: "Shipped", color: "success" },
          { value: "delivered", label: "Delivered", color: "secondary" },
          { value: "cancelled", label: "Cancelled", color: "error" },
     ];

  function getStatusColor (status : OrderStatus) {
    switch(status)  {
      case 'pending' :
        return 'warning'
        case 'processing' : 
        return 'info' 
        case 'shipped' : 
        return 'success' 
        case 'delivered' : 
        return 'secondary'
        case 'cancelled' :
          return 'error'
          default : 
          return 'warning'
    }
  } 
  
  function getStatusText (status : OrderStatus) {
    switch(status)  {
      case 'pending' :
        return 'Pending'
        case 'processing' : 
        return 'Processing' 
        case 'shipped' : 
        return 'Shipped' 
        case 'delivered' : 
        return 'Delivered'
        case 'cancelled' :
          return 'Cancelled'
          default : 
          return status
    }
  } 
  

  function getUserName (UserID : number | string) {
    const user = users?.find(user => user.id === UserID);
    return user?.name  || '--';
  }

  // Safe date formatting function
  function formatDate(dateString: string): string {
    if (!dateString || typeof dateString !== 'string') {
      return '--';
    }
    try {
      return dateString.slice(0, 10);
    } catch (error) {
      return '--';
    }
  }


    const handleStatusChange = (e: any) => {
        const newStatus = e.target.value as OrderStatus;
        setStatus(newStatus);
        mutateStatus({ Status: newStatus }, {
            onSuccess: () => {
                refetch();
                toast.success('تم تعديل حالة الطلبية بنجاح')
            },
            onError: (error) => {
                console.error("Failed to update status:", error);
                setStatus(Status);
            }
        });
    };

    if(isLoading) return <Box>
       <Typography color="secondary" variant="h6" className="flex gap-2 !mb-3 !ms-2">
          <span>{t('orderDetails.title')}</span>
        </Typography>

      <LinearProgress color="primary"/>
    </Box>
    

  return (
    <div>
        <Typography color="secondary" variant="h6" className="flex gap-2 !mb-3 !ms-2">
          <span>تعديل حالة الطلبية</span>
        </Typography>
        <Select value={status} onChange={handleStatusChange} className="w-[40%] !-mt-2"
        disabled={status === 'delivered' || status === 'cancelled' }>
        {orderStatus.map((item) => {
          const isDisabled = status === 'delivered' || status === 'cancelled';
          return <MenuItem  key={item.value} value={item.value}>
            <Chip
                  label={item.label}
                  size="small"
                  color={item.color as any}
                  className="!rounded-[6px] !p-4 !text-[15px]"
                  sx={{
                  ...(isDisabled && {
                    opacity: 0.6,
                    color: 'rgba(0, 0, 0, 0.38)', 
                    backgroundColor: 'rgba(0, 0, 0, 0.12)', 
                  }),
          }}
                      />
          </MenuItem>
        })}
        </Select>
        <Typography color="secondary" variant="h6" className="flex gap-2 !mb-3 !ms-2">
          <span className="!mt-5">{t('orderDetails.title')}</span>
        </Typography>

      {/* Basic Info Card */}
      <div className="bg-white rounded-lg shadow-md !p-6 !mb-6 border border-primary-light">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <FaUser className="text-primary-main" />
            <span className="font-medium">{t('orderDetails.userName')}:</span>
            <span className="font-bold text-primary-main">{getUserName(UserID)}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <IoIosTime className="text-primary-main" />
            <span className="font-medium">{t('orderDetails.shippingAddress')}:</span>
            <span className="font-bold text-primary-main">{ShippingAddress}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <span className="font-medium">{t('orderDetails.status')}:</span>
            <Chip label={getStatusText(Status)} color={getStatusColor(Status)}/>
          </div>

    
          <div className="flex items-center gap-2 text-gray-700">
            <FaMoneyBillWave className="text-primary-main" />
            <span className="font-medium">{t('orderDetails.totalAmount')}:</span>
            <span className="font-bold text-primary-main text-lg">${totalAmount}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <IoIosTime className="text-primary-main" />
            <span className="font-medium">{t('orderDetails.createdAt')} : </span>
            <span className="font-bold text-primary-main">{formatDate(created_at)}</span>
          </div>

           <div className="flex items-center gap-2 text-gray-700">
            <IoIosTime className="text-primary-main" />
            <span className="font-medium">{t('orderDetails.updatedAt')}:</span>
            <span className="font-bold text-primary-main">{formatDate(updated_at)}</span>
          </div>
        </div>
      </div>

      {/* Products Table */}
      {localProducts && localProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow-md border border-primary-light overflow-hidden">
            <p className="!p-2 !text-lg font-bold text-secondary-main">{t('orderDetails.orderProducts')}</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary-main">
                <tr>
                  <th className="!px-6 !py-3 !text-start text-xs font-medium text-white uppercase tracking-wider border-b border-primary-main-200">
                    {t('orderDetails.table.productName')}
                  </th>
                  <th className="!px-6 !py-3 !text-start text-xs font-medium text-white uppercase tracking-wider border-b border-primary-main-200">
                    {t('orderDetails.table.weight')}
                  </th>
                  <th className="!px-6 !py-3 !text-start text-xs font-medium text-white uppercase tracking-wider border-b border-primary-main-200">
                    {t('orderDetails.table.price')}
                     <span className="text-secondary-main capitalize !ms-1 !text-[10px] text-normal">1g</span>
                  </th>
                  <th className="!px-6 !py-3 !text-start text-xs font-medium text-white uppercase tracking-wider border-b border-primary-main-200">
                    {t('orderDetails.table.karat')}
                  </th>
                  <th className="!px-6 !py-3 !text-start text-xs font-medium text-white uppercase tracking-wider border-b border-primary-main-200">
                    {t('orderDetails.table.quantity')}
                  </th>
                  <th className="!px-6 !py-3 !text-start text-xs font-medium text-white uppercase tracking-wider border-b border-primary-main-200">
                    {t('orderDetails.table.total')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-primary-main">
                {localProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="!px-6 !py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="!px-10 !py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="font-semibold">{product.weight}</span>
                    </td>
                    <td className="!px-6 !py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="font-semibold text-primary-main">{getProductPriceByKarat(product.karat)}
                      </span>
                    </td>
                    <td className="!px-6 !py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="bg-primary-main text-white !px-2 !py-1 rounded-full text-xs font-medium">
                        {product.karat}K
                      </span>
                    </td>
                    <td className="!ps-12 !py-4 whitespace-nowrap text-sm text-gray-700">{product.quantity}</td>
                    <td className="!px-6 !py-4 whitespace-nowrap text-sm font-semibold text-primary-main">
                      ${(product.price * product.weight * product.quantity).toFixed(3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="!mt-6 bg-primary-light rounded-lg !p-2 text-secondary-main">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">{t('orderDetails.grandTotal')}:</span>
          <span className="text-2xl font-bold">${totalAmount}</span>
        </div>
      </div>
      {/* Cancel */}
      <div className="flex justify-end items-center !mt-5">
        <Button color="error" variant="contained" 
        onClick={() => navigate('/orders')} className="!capitalize">Cancel</Button>
      </div>
    </div>
  )
}

export default OrderDetails