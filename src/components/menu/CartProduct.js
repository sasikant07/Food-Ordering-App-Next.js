import Image from "next/image";
import Trash from "../icons/Trash";

export default function CartProduct({
  product,
  onRemove,
  cartProductPrice,
  index,
}) {
  return (
    <div key={product._id} className="flex items-center gap-4 border-b py-4">
      <div className="w-24">
        <Image
          src={product.image}
          alt={product.name}
          width={240}
          height={240}
        />
      </div>
      <div className="grow">
        <h3 className="font-semibold">{product.name}</h3>
        {product.size && (
          <div className="text-sm">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map((extra, index) => (
              <div key={index}>
                {extra.name} ${extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">${cartProductPrice(product)}</div>
      {!!onRemove && (
        <div className="ml-2">
          <button
            className="text-primary p-2"
            type="button"
            onClick={() => onRemove(index)}
          >
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}
