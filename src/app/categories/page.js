"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const { loading:profileLoading, data:profileData } = useProfile();

  if (profileLoading) {
    return (
      <h4 className="flex justify-center items-center mt-8">
        Loading user info...
      </h4>
    );
  }

  if (!profileData.admin) {
    return (
      <h4 className="flex justify-center items-center mt-8">Not an admin</h4>
    );
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
    </section>
  );
}
