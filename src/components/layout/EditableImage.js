import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
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
              setLink(link.imgUrl);
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
    <>
      {link && (
        <Image
          className="rounded-lg w-full h-[86px] mb-1"
          src={link}
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
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
          Change image
        </span>
      </label>
    </>
  );
}
