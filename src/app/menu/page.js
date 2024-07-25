"use client";

import { useEffect, useState } from "react";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });

    fetch("/api/menu-items").then((res) => {
      res.json((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);
  return <section>menu items here with categories</section>;
}
