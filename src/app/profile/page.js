"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";

export default function () {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data?.user?.name);
      setImage(session.data.user.image);
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  if (status === "loading" || !profileFetched) {
    return <p className="flex justify-center items-center mt-8">Loading...</p>;
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const handleProfileInfoUpdate = async (e) => {
    e.preventDefault();
    
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
          name: userName,
          image,
          phone,
          streetAddress,
          city,
          postalCode,
          country,
        }),
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Profile saving failed!",
    });
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => {
          if (response.ok) {
            return response.json().then((link) => {
              /* For S3 image Upload */
              // setImage(link);

              /* For cloudinary upload */
              setImage(link.imgUrl);
            });
          }
        })
        .catch((error) => {
          throw new Error(error);
        });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete!",
        error: "Upload failed!",
      });
    }
  };

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-md mx-auto mt-8">
        <div className="flex gap-4">
          <div className="">
            <div className="p-2 rounded-lg relative max-w-[120px]">
              {image && (
                <Image
                  className="rounded-lg w-full h-[86px] mb-1"
                  src={image}
                  width={256}
                  height={266}
                  alt="avatar"
                />
                /* For s3 Image */
                // <img
                //   className="rounded-lg w-full h-full mb-1"
                //   src={image}
                //   width={256}
                //   height={256}
                //   alt="avatar"
                // />
              )}
              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
                  Edit
                </span>
              </label>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <label>First and ast name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="First & Last Name"
            />
            <label>Email</label>
            <input
              type="email"
              disabled={true}
              value={session.data?.user?.email}
              placeholder="email"
            />
            <label>Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
            />
            <label>Street address</label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              placeholder="Street address"
            />
            <div className="flex gap-2">
              <div className="">
                <label>Postal code</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Postal code"
                />
              </div>
              <div className="">
                <label>City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                />
              </div>
            </div>
            <label>Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
