import { GetOrderById } from "@/hooks/order/useOrder"
import { FaBox, FaMoneyBillWave, FaUser } from "react-icons/fa"
import { IoIosTime } from "react-icons/io"
import { useParams } from "react-router-dom"
import { Icon , Typography } from "@mui/material"

import { GetAllUsers } from "@/hooks/users/useUsers"
import { useContext,  useEffect , useMemo ,  useState } from "react"
import { GoldPricesContext } from "@/context/GoldPrices"
import type { Order } from "@/services/types/orders"
import type { LocalProduct } from "@/services/types/products"
import { useTranslation } from "react-i18next"

const OrderDetails = () => {   
    const { t } = useTranslation();
    const { orderId } = useParams();
    const {data : order} = GetOrderById(orderId || '');
    const { data : users } = GetAllUsers();
    const { goldPrices } = useContext(GoldPricesContext);
    
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
    }
    },[order])

      const { UserID , created_at , updated_at , Status , ShippingAddress } = orderInfo;

      const localProducts: LocalProduct[] = [
    { name: t('orderDetails.products.braceletLock'), price: getProductPriceByKarat(21), weight : 12 , karat : 21 , quantity: 1 },
    { name: t('orderDetails.products.chainLetterM'), price: getProductPriceByKarat(21), weight : 15,  karat: 21, quantity: 1 },
    { name: t('orderDetails.products.childrenEarrings'), price: getProductPriceByKarat(18), weight : 2, karat: 18, quantity: 1 },
    { name: t('orderDetails.products.ankletFrank'), price: getProductPriceByKarat(21), weight : 8,karat: 21, quantity: 1 },
    { name: t('orderDetails.products.heavyChain'), price: getProductPriceByKarat(21), weight : 45 , karat: 21, quantity: 1 },
  ]

      const totalAmount = useMemo(() => {
        return localProducts.reduce((acc,item) => {
            return acc + (item.price * item.quantity)
        },0)
    } , [localProducts])

    function getProductPriceByKarat (karat : 18 | 21 | 24) {
        const itemKaratMatched = goldPrices.find((item) => item.karat == karat);
        return itemKaratMatched?.price || 0;
    }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-red-100 text-red-800 border-red-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return t('orders.status.completed')
      case "pending":
        return t('orders.status.pending')
      case "cancelled":
        return t('orders.status.cancelled')
      default:
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

  return (
    <div>
        <Typography color="secondary" variant="h6" className="flex gap-2 !mb-3 !ms-2">
          <Icon>
            <FaBox size={'20'}/>
          </Icon>
          <span className="!-mt-[5px]">{t('orderDetails.title')}</span>
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
            <span className={`!px-3 !py-1 rounded-full text-sm font-medium border ${getStatusColor(Status)}`}>
              {getStatusLabel(Status)}
            </span>
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
                  <th className="!px-6 !py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-primary-main-200">
                    {t('orderDetails.table.productName')}
                  </th>
                  <th className="!px-6 !py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-primary-main-200">
                    {t('orderDetails.table.price')}
                  </th>
                  <th className="!px-6 !py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-primary-main-200">
                    {t('orderDetails.table.karat')}
                  </th>
                  <th className="!px-6 !py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-primary-main-200">
                    {t('orderDetails.table.quantity')}
                  </th>
                  <th className="!px-6 !py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-primary-main-200">
                    {t('orderDetails.table.total')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-primary-main">
                {localProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="!px-6 !py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="!px-6 !py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="font-semibold text-primary-main">{getProductPriceByKarat(product.karat)}</span>
                    </td>
                    <td className="!px-6 !py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="bg-primary-main text-white !px-2 !py-1 rounded-full text-xs font-medium">
                        {product.karat}K
                      </span>
                    </td>
                    <td className="!ps-12 !py-4 whitespace-nowrap text-sm text-gray-700">{product.quantity}</td>
                    <td className="!px-6 !py-4 whitespace-nowrap text-sm font-semibold text-primary-main">
                      ${(product.price * product.quantity).toFixed(3)}
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
    </div>
  )
}

export default OrderDetails