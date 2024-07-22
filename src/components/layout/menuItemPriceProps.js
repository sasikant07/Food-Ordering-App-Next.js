import { useState } from "react";
import ChevronDown from "../icons/ChevronDown";
import Plus from "../icons/Plus";
import Trash from "../icons/Trash";
import ChevronUp from "../icons/ChevronUp";

export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const addProp = () => {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  };

  const editProp = (e, index, prop) => {
    const newValue = e.target.value;

    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  };

  const removeProp = (indexToRemove) => {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  };
  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex p-1 border-0 justify-start"
        type="button"
      >
        {isOpen ? <ChevronUp /> : <ChevronDown />}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div className="flex items-end gap-2" key={index}>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={size.name}
                  onChange={(e) => editProp(e, index, "name")}
                />
              </div>
              <div>
                <label>Extra price</label>
                <input
                  type="text"
                  placeholder="Extra price"
                  value={size.price}
                  onChange={(e) => editProp(e, index, "price")}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeProp(index)}
                  className="bg-white text-red-500 mb-2 px-2"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
      </div>

      <button type="button" onClick={addProp} className="bg-white items-center">
        <Plus className="w-5 h-5" />
        <span>{addLabel}</span>
      </button>
    </div>
  );
}
