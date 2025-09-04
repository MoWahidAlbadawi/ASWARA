// import { useQuery } from "react-query";
// import type { ApiResponseGetMetalPrice } from '@/services/types/home'
// import api from "@/services/axios"
// import { METAL_PRICE_API } from  "@/services/endpoints"

// get all prices
// export const GetMetalPrices = () => {
//     return useQuery('metal_prices',() => {
//         return api.get<ApiResponseGetMetalPrice>(`https://api.metals.dev/v1/latest?api_key=${METAL_PRICE_API}&currency=USD&unit=toz`)
//         .then(res => res.data);  
//     })
// }

// NOte : for parameters
// base usd (dollar)
// currencies x for high metal then code , like xag mean silver and xau mean gold