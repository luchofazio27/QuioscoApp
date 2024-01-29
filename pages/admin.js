import useSWR from "swr"
import axios from "axios"
import AdminLayout from "@/layout/AdminLayout"
import Order from "@/components/Order"

export default function Admin() {

    const fetcher = () => axios('/api/orders').then(datos => datos.data)
    const { data, error, irLoading } = useSWR('/api/orders', fetcher, {refreshInterval: 100})

  return (
    <AdminLayout page={'Admin'}>
      <h1 className="text-4xl font-black">Panel de Administración</h1>
      <p className="text-2xl my-10">Administra las ordenes</p>

      {data && data.length ? data.map(order =>
      <Order key={order.id} order={order}/> 
      ) : <p>No hay ordenes pendientes</p>}
    </AdminLayout>
  )
}

