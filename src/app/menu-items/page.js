"use client";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import Link from "next/link";

export default function MenuItemsPage() {
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
  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button flex" href={"/menu-items/new"}>
          <span>Create new menu item</span> <Right />
        </Link>
      </div>
    </section>
  );
}
