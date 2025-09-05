import { GetOrderById } from "@/hooks/order/useOrder"
import { FaBox, FaMoneyBillWave, FaUser } from "react-icons/fa"
import { IoIosTime } from "react-icons/io"
import { useParams } from "react-router-dom"
import { Icon , Typography } from "@mui/material"

import type { LocalProduct } from "@/services/types/products"
import { GetAllUsers } from "@/hooks/users/useUsers"
import { useContext, useMemo, useEffect , useState } from "react"
import { GoldPricesContext } from "@/context/GoldPrices"

const OrderDetails = () => {   
    const { orderId } = useParams();
    const {data : order} = GetOrderById(orderId || '');
    const { data : users } = GetAllUsers();
    const { goldPrices } = useContext(GoldPricesContext);
    
    const [orderInfo , setOrderInfo] = useState<{userid : number , orderDate : string , status : string}>({
        userid : order?.userid || 0,
        orderDate : order?.orderDate || '',
        status : order?.status || ''
    });

    useEffect(() => {
      if(order) {
      setOrderInfo({
        userid : order.userid,
        orderDate : order.orderDate,
        status : order.status,
      })
    }
    },[order])

      const { userid , orderDate , status} = orderInfo;

    function getProductPriceByKarat (karat : 18 | 21 | 24) {
        const itemKaratMatched = goldPrices.find((item) => item.karat == karat);
        return itemKaratMatched?.price || 0;
    }

  const localProducts: LocalProduct[] = [
    { name: "أسوارة موديل قفل", price: getProductPriceByKarat(21), weight : 12 , karat : 21 , quantity: 1 },
    { name: "سلسال حرف M", price: getProductPriceByKarat(21), weight : 15,  karat: 21, quantity: 1 },
    { name: "حلق أذن للأطفال", price: getProductPriceByKarat(18), weight : 2, karat: 18, quantity: 1 },
    { name: "خلخال موديل فرانك", price: getProductPriceByKarat(21), weight : 8,karat: 21, quantity: 1 },
    { name: "سنارة زرد تقيلة", price: getProductPriceByKarat(21), weight : 45 , karat: 21, quantity: 1 },
  ]

      const totalAmount = useMemo(() => {
        return localProducts.reduce((acc,item) => {
            return acc + (item.price * item.quantity)
        },0)
    } , [localProducts])


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


  function getUserName (userId : number | string) {
    const user = users?.find(user => user.id === userId);
    return user?.name  || '--';
  }

  return (
    <div>
        <Typography color="secondary" variant="h6" className="flex gap-2 !mb-3 !ms-2">
          <Icon>
            <FaBox size={'20'}/>
          </Icon>
          <span className="!-mt-[5px]">Order Details</span>
        </Typography>

      {/* Basic Info Card */}
      <div className="bg-white rounded-lg shadow-md !p-6 !mb-6 border border-primary-light">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <FaUser className="text-primary-main" />
            <span className="font-medium">User Name:</span>
            <span className="font-bold text-primary-main">{getUserName(userid)}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <IoIosTime className="text-primary-main" />
            <span className="font-medium">Order Date:</span>
            <span className="font-bold text-primary-main">{orderDate.slice(0,10)}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <span className="font-medium">Status:</span>
            <span className={`!px-3 !py-1 rounded-full text-sm font-medium border ${getStatusColor(status)}`}>
              {status}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <FaMoneyBillWave className="text-primary-main" />
            <span className="font-medium">Total Amount:</span>
            <span className="font-bold text-primary-main text-lg">${totalAmount}</span>
          </div>
        </div>
      </div>

      {/* Products Table */}
      {localProducts && localProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow-md border border-primary-light overflow-hidden">
            <p className="!p-2 !text-lg font-bold text-secondary-main">Order Products</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary-main">
                <tr>
                  <th className="!px-6 !py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-primary-main-200">
                    Product Name
                  </th>
                  <th className="!px-6 !py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-primary-main-200">
                    Price
                  </th>
                  <th className="!px-6 !py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-primary-main-200">
                    Karat
                  </th>
                  <th className="!px-6 !py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-primary-main-200">
                    Quantity
                  </th>
                  <th className="!px-6 !py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-primary-main-200">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-primary-main">
                {localProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="!px-6 !py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="!px-6 !py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="font-semibold text-primary-main">${product.price.toFixed(3)}</span>
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
      <div className="!mt-6 bg-yellow-200 rounded-lg !p-2 text-secondary-main">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Grand Total:</span>
          <span className="text-2xl font-bold">${totalAmount}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
