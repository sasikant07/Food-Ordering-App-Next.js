"use client";
import { CartContext } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import Sectionheaders from "@/components/layout/SectionHeaders";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState();
  const { id } = useParams();
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }

    if (id) {
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
        });
      });
    }
  }, []);

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <div className="text-center">
        <Sectionheaders mainHeader={"Your order"} />
        <div className="my-4">
          <p>Thanks for your order.</p>
          <p>We will call you when it will be on the way.</p>
        </div>
      </div>
      {order && (
        <div className="grid grid-cols-2 gap-16">
          <div>
            
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
