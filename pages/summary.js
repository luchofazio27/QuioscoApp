import Layout from "@/layout/Layout";
import useQuiosco from "@/hooks/useQuiosco";
import SummaryProduct from "@/components/SummaryProduct";

export default function Summary() {
  const { order } = useQuiosco();

  return (
    <Layout page="Summary">
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="text-2xl my-10">Revisa tu Pedido</p>

      {order.length === 0 ? (
        <p className="text-center text-2xl">No hay elementos en tu pedido</p>
      ) : (
        order.map((product) => (
          <SummaryProduct key={product.id} product={product} />
        ))
      )}
    </Layout>
  );
}
