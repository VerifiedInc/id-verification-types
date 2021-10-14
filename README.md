# UnumID Web Wallet Types
This project contains all of our shared TypeScript types specific to the Web Wallet.
These types are intended to be used internally by Unum ID for the Web Wallet. If a type needs to be made available publically (i.e. so that it can be used by customers), it should be moved to the public [types](https://github.com/UnumID/types) package or exported from another public package such as an SDK.

## Naming Conventions
- Wallet-specifig type names should be prefixed with `Wallet` to avoid potential naming collisions. Most if not all of the types in this package should fall under this category. If a type is not wallet-specific, it probably doesn't belong here.
- Types explicitly for network interfaces (usually HTTP, but may include other transports like websockets in the future) should be suffixed with `Dto`. Furthermore, if the DTO is different between different actions/methods/verbs, the type name should include the method.

## Organization
Types should be grouped in a way that makes the `index.d.ts` file easy to read. They are currently grouped into DTOs, API inputs, and other types. These particular groupings do not necessarily need to be followed, but if you decide to change them, please re-organize the existing types and update this readme to reflect the new organization.
