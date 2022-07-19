# UnumID Identity Verification Types
This project contains all of our shared TypeScript types for various IDVs Unum ID is using.
These types are self defined based on response bodies from various IDV partners.

Currently types are defined to service:
- **HyperVerge** document scans
- **Prove** PreFill & InstantLink APIs.

## Naming Conventions
- IDV-specific type names should be prefixed with the IDV provider, i.e. `HV` for HyperVerge, to avoid potential naming collisions. Most if not all of the types in this package should fall under this category. If a type is not idv-specific, it probably doesn't belong here.
- Types explicitly for network interfaces (usually HTTP, but may include other transports like websockets in the future) should be suffixed with `Dto`. Furthermore, if the DTO is different between different actions/methods/verbs, the type name should include the method.

## Organization
Types should be grouped in a way that makes the `index.d.ts` file easy to read. They are currently grouped into DTOs, API inputs, and other types. These particular groupings do not necessarily need to be followed, but if you decide to change them, please re-organize the existing types and update this readme to reflect the new organization.
