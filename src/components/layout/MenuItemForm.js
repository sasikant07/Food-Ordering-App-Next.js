import { useState } from "react";
import EditableImage from "./EditableImage";
import Trash from "../icons/trash";
import Plus from "../icons/Plus";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState([]);

  const addSize = () => {
    setSizes((oldSizes) => {
      return [...oldSizes, { name: "", price: 0 }];
    });
  };

  const editSize = (e, index, prop) => {
    const newValue = e.target.value;

    setSizes((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  };

  const removeSize = (indexToRemove) => {
    setSizes((prev) => prev.filter((v, index) => index !== indexToRemove));
  };

  return (
    <form
      className="mt-8 max-w-md mx-auto"
      onSubmit={(e) => onSubmit(e, { image, name, description, basePrice })}
    >
      <div
        className="grid items-start gap-4"
        style={{ gridTemplateColumns: "0.3fr 0.7fr" }}
      >
        <div className="mt-5">
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
          />
          <div className="bg-gray-200 p-2 rounded-md mb-2">
            <label>Sizes</label>
            {sizes?.length > 0 &&
              sizes.map((size, index) => (
                <div className="flex items-end gap-2" key={index}>
                  <div>
                    <label>Size name</label>
                    <input
                      type="text"
                      placeholder="Size name"
                      value={size.name}
                      onChange={(e) => editSize(e, index, "name")}
                    />
                  </div>
                  <div>
                    <label>Extra price</label>
                    <input
                      type="text"
                      placeholder="Extra price"
                      value={size.price}
                      onChange={(e) => editSize(e, index, "price")}
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeSize(index)}
                      className="bg-white text-red-500 mb-2 px-2"
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              ))}
            <button
              type="button"
              onClick={addSize}
              className="bg-white items-center"
            >
              <Plus className="w-5 h-5" />
              <span>Add item size</span>
            </button>
          </div>
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
