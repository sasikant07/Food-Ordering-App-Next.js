export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
}) {

    if (!hasSizesOrExtras) {
        return (
            null
        )
    }
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2"
    >
      {hasSizesOrExtras ? (
        <span>Add to cart (From ${basePrice})</span>
      ) : (
        <span>Add to cart ${basePrice}</span>
      )}
    </button>
  );
}
