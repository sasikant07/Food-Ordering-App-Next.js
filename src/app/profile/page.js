"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function () {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { status } = session;
  const userImage = session.data?.user?.image;

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data?.user?.name);
    }
  }, [session, status]);

  if (status === "loading") {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const handleProfileInfoUpdate = async (e) => {
    e.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ name: userName }),
    });

    setIsSaving(false);

    if (response.ok) {
      setSaved(true);
    }
  };

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <div className="max-w-md mx-auto">
        {saved && (
          <h2 className="text-center bg-green-100 p-4 rounded-lg border border-green-300">
            Profile saved!
          </h2>
        )}
        {isSaving && (
          <h2 className="text-center bg-blue-100 p-4 rounded-lg border border-blue-300">
            Saving...
          </h2>
        )}
        <div className="flex gap-4 items-center">
          <div className="">
            <div className="p-2 rounded-lg">
              <Image
                className="rounded-lg w-full h-full mb-1"
                src={userImage}
                width={256}
                height={256}
                alt="avatar"
              />
              <button type="button">Edit</button>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="First & Last Name"
            />
            <input
              type="email"
              disabled={true}
              value={session.data?.user?.email}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
