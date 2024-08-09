export default function AddressInputs({
  addressProps,
  setAddressProps,
  disabled = false,
}) {
  const { phone, streetAddress, postalCode, city, country } = addressProps;
  return (
    <>
      <label>Phone</label>
      <input
        disabled={disabled}
        type="tel"
        value={phone || ""}
        onChange={(e) => setAddressProps("phone", e.target.value)}
        placeholder="Phone number"
      />
      <label>Street address</label>
      <input
        disabled={disabled}
        type="text"
        value={streetAddress || ""}
        onChange={(e) => setAddressProps("streetAddress", e.target.value)}
        placeholder="Street address"
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>Postal code</label>
          <input
            disabled={disabled}
            type="text"
            value={postalCode || ""}
            onChange={(e) => setAddressProps("postalCode", e.target.value)}
            placeholder="Postal code"
          />
        </div>
        <div className="">
          <label>City</label>
          <input
            disabled={disabled}
            type="text"
            value={city || ""}
            onChange={(e) => setAddressProps("city", e.target.value)}
            placeholder="City"
          />
        </div>
      </div>
      <label>Country</label>
      <input
        disabled={disabled}
        type="text"
        value={country || ""}
        onChange={(e) => setAddressProps("country", e.target.value)}
        placeholder="Country"
      />
    </>
  );
}
