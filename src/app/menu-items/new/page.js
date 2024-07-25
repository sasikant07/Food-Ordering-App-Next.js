"use client";
import Left from "@/components/icons/Left";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function NewMenuItemPage() {
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

  if (loading) {
    return (
      <h4 className="flex justify-center items-center mt-8">Loading...</h4>
    );
  }

  if (!data.admin) {
    return (
      <h4 className="flex justify-center items-center mt-8">Not an admin</h4>
    );
  }

  const handleFormSubmit = async (e, data) => {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    toast.promise(savingPromise, {
      loading: "Saving this tasty item",
      success: "Saved",
      error: "Error",
    });

    setRedirectToItems(true);
  };

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm onSubmit={handleFormSubmit} menuItem={null} />
    </section>
  );
}
