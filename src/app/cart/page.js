"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import Sectionheaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useProfile } from "@/components/useProfile";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const { data: profileData } = useProfile();
  const [address, setAddress] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, postalCode, city, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        postalCode,
        city,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subTotal = 0;
  for (const p of cartProducts) {
    subTotal += cartProductPrice(p);
  }

  const handleAddressChange = (propName, value) => {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  };

  const proceedToCheckout = async (e) => {
    e.preventDefault();

    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: "Preparing your payment",
      success: "Redirecting to payment",
      error: "Something went wrong...Please try again later",
    });
  };

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <Sectionheaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <Sectionheaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div className="">No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct
                product={product}
                onRemove={removeCartProduct}
                cartProductPrice={cartProductPrice}
                index={index}
              />
            ))}
          <div className="py-2 pr-14 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal:
              <br />
              Delivery:
              <br />
              Total:
            </div>
            <div className="font-semibold pl-2 text-right">
              ${subTotal}
              <br />
              $5
              <br />${subTotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg h-[400px]">
          <h2 className="text-center text-lg font-semibold">Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay ${subTotal + 5}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
