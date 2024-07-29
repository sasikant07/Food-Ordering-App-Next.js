export default function AddressInputs({ addressProps, setAddressProps }) {
  const { phone, streetAddress, postalCode, city, country } = addressProps;
  return (
    <>
      <label>Phone</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setAddressProps("phone", e.target.value)}
        placeholder="Phone number"
      />
      <label>Street address</label>
      <input
        type="text"
        value={streetAddress}
        onChange={(e) => setAddressProps("streetAddress", e.target.value)}
        placeholder="Street address"
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>Postal code</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setAddressProps("postalCode", e.target.value)}
            placeholder="Postal code"
          />
        </div>
        <div className="">
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setAddressProps("city", e.target.value)}
            placeholder="City"
          />
        </div>
      </div>
      <label>Country</label>
      <input
        type="text"
        value={country}
        onChange={(e) => setAddressProps("country", e.target.value)}
        placeholder="Country"
      />
    </>
  );
}
