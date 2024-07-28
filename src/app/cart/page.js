"use client";
import { CartContext } from "@/components/AppContext";
import Sectionheaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import { useContext } from "react";

export default function CartPage() {
  const { cartProducts } = useContext(CartContext);

  return (
    <section className="mt-8">
      <div className="text-center">
        <Sectionheaders mainHeader="Cart" />
      </div>
      <div className="mt-4 grid gap-4 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div className="">No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center gap-4 mb-2 border-b py-2"
              >
                <div className="w-24">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={240}
                    height={240}
                  />
                </div>
                <div className="">
                  <h3>{product.name}</h3>
                  {product.size && (
                    <div>
                      Size: <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div>
                      Extras:{" "}
                      <span>
                        {product.extras.map((extra, index) => (
                          <div key={index}>
                            {extra.name} ${extra.price}
                          </div>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div>Right</div>
      </div>
    </section>
  );
}
