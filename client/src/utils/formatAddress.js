export default function formatAddress(address) {
  if (!address) throw Error('An address is required in order to format.');
  return {
    street: `${address[0].long_name} ${address[1].long_name}`,
    city: address[3].long_name,
    state: address[5].long_name,
    zip: address[7].long_name
  };
}
