"use client";
import DeleteButton from "@/components/DeleteButton";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  };

  if (profileLoading) {
    return (
      <h4 className="flex justify-center items-center mt-8">Loading...</h4>
    );
  }

  if (!profileData.admin) {
    return (
      <h4 className="flex justify-center items-center mt-8">Not an admin</h4>
    );
  }

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditedCategory(null);
      if (response.ok) {
        resolve();
      } else {
        reject();
      }

      await toast.promise(creationPromise, {
        loading: editedCategory
          ? "Updating category..."
          : "Creating new category...",
        success: editedCategory ? "Category updated" : "Category created",
        error: "Error, sorry...",
      });
    });
  };

  const handleDeleteClick = async (_id) => {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Category deleted!",
      error: "Error",
    });

    fetchCategories();
  };

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? "Update category" : "New category name"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories:</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              key={c._id}
              className="bg-gray-100 rounded-xl p-2 flex gap-1 mb-1 items-center"
            >
              <div className="grow">{c.name}</div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                >
                  Edit
                </button>
                <DeleteButton
                  label="Delete"
                  onDelete={() => handleDeleteClick(c._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
