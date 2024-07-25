"use client";
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import Sectionheaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setBestSellers(menuItems.slice(0, 3));
      });
    });
  }, []);
  return (
    <section className="">
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image
            src={"/sallad1.png"}
            alt="salad"
            width={109}
            height={189}
          ></Image>
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image
            src={"/sallad2.png"}
            alt="salad"
            width={107}
            height={195}
          ></Image>
        </div>
      </div>
      <div className="text-center mb-4">
        <Sectionheaders subHeader="check out" mainHeader="Our Best Sellers" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {bestSellers?.length > 0 &&
          bestSellers.map((item) => <MenuItem key={item._id} {...item} />)}
      </div>
    </section>
  );
}
