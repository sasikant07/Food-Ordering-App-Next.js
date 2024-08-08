"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import Sectionheaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }

    if (id) {
      setLoadingOrder(true);
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
          setLoadingOrder(false);
        });
      });
    }
  }, []);

  let subTotal = 0;

  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subTotal += cartProductPrice(product);
    }
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <div className="text-center">
        <Sectionheaders mainHeader={"Your order"} />
        <div className="mt-4 mb-8">
          <p>Thanks for your order.</p>
          <p>We will call you when it will be on the way.</p>
        </div>
      </div>
      {loadingOrder && <div>Loading order...</div>}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map((product) => (
              <CartProduct
                product={product}
                cartProductPrice={cartProductPrice}
              />
            ))}
            <div className="text-right  py-2 text-gray-500">
              Subtotal:&nbsp;
              <span className="text-black font-bold inline-block w-8">
                ${subTotal}
              </span>
              &nbsp;
              <br />
              Delivery:&nbsp;
              <span className="text-black font-bold inline-block w-8">$5</span>
              <br />
              Total:&nbsp;
              <span className="text-black font-bold inline-block w-8">
                ${subTotal + 5}
              </span>
              &nbsp;
              <br />
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs disabled={true} addressProps={order} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
