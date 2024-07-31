"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import Sectionheaders from "@/components/layout/SectionHeaders";
import { useProfile } from "@/components/useProfile";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const { data: profileData } = useProfile();
  const [address, setAddress] = useState({});

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
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address,
        cartProducts,
      }),
    });
    window.location = await response.json();
  };

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
              <div
                key={index}
                className="flex items-center gap-4 border-b py-4"
              >
                <div className="w-24">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={240}
                    height={240}
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm">
                      Size: <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {product.extras.map((extra, index) => (
                        <div key={index}>
                          {extra.name} ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  ${cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    className="text-primary p-2"
                    type="button"
                    onClick={() => removeCartProduct(index)}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
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
