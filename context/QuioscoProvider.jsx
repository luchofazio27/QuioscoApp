import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoryCurrent, setCategoryCurrent] = useState({});
  const [product, setProduct] = useState({});
  const [modal, setModal] = useState(false);
  const [order, setOrder] = useState([]);
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const getCategories = async () => {
    const { data } = await axios("/api/categories");
    setCategories(data.categories);
  };
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setCategoryCurrent(categories[0]);
  }, [categories]);

  useEffect(() => {
    const newTotal = order.reduce(
      (total, product) => product.price * product.amount + total,
      0
    );
    setTotal(newTotal)
  }, [order]);

  const handleClickCategory = (id) => {
    const category = categories.filter((cat) => cat.id === id);
    setCategoryCurrent(category[0]);
    router.push("/");
  };

  const handleSetProduct = (product) => {
    setProduct(product);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAddOrder = ({ categoryId, ...product }) => {
    if (order.some((productState) => productState.id === product.id)) {
      // Actualizar la cantidad
      const orderUpdated = order.map((productState) =>
        productState.id === product.id ? product : productState
      );
      setOrder(orderUpdated);
      toast.success("Guardado correctamente");
    } else {
      setOrder([...order, product]);
      toast.success("Agregado al Pedido");
    }
    setModal(false);
  };

  const handleEditQuiantities = (id) => {
    const productUpdate = order.filter((product) => product.id === id);
    setProduct(productUpdate[0]);
    setModal(!modal);
  };

  const handleDeleteProduct = (id) => {
    const orderUpdate = order.filter((product) => product.id !== id);
    setOrder(orderUpdate);
  };

  const putOrder = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await axios.post('/api/orders', {order, name, total, date: Date.now().toString()})
      
      //Restet APP
      setCategoryCurrent(categories[0])
      setOrder([])
      setName('')
      setTotal(0)

      toast.success('Pedido Realizado Correctamente')

      setTimeout(() => {
        router.push('/')
      }, 3000)
      
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <QuioscoContext.Provider
      value={{
        categories,
        categoryCurrent,
        handleClickCategory,
        product,
        handleSetProduct,
        modal,
        handleChangeModal,
        handleAddOrder,
        order,
        handleEditQuiantities,
        handleDeleteProduct,
        name,
        setName,
        putOrder,
        total,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };
export default QuioscoContext;
