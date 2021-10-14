import { BaseEntity, PublicKeyInfo } from '@unumid/types';

// Web Wallet DTOs

/**
 * Data transfer object for WebauthnCredential
 */
export interface WalletWebauthnCredentialDto extends BaseEntity {
  id: string;
  publicKeyPEM: string;
  type: string;
  attestationObject: string;
  clientDataJSON: string;
  user: string;
}

/**
 * Data transfer object for wallet User
 */
export interface WalletUserDto extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  challenge: string;
  did?: string;
  updateKey?: string;
  webauthnCredentials: WalletWebauthnCredentialDto[]
}

// Web Wallet Server Inputs

/**
 * Interface encapsulating options for creating a WebauthnCredential
 */
export interface WalletWebauthnCredentialCreateOptions {
  encodedCredential: WalletEncodedAttestationCredential;
  userUuid: string;
}

/**
 * Interface encapsulating options for registering a wallet User as a Subject
 */
export interface WalletSubjectCreateOptions {
  publicKeyInfo: PublicKeyInfo[];
  userUuid: string;
}

/**
 * Interface encapsulating options for creating a wallet User
 */
export interface WalletUserCreateOptions {
  name: string;
  email: string;
  phone: string;
}

// Other shared types

/**
 * Interface encapsulating data from a webauthn PublicKeyAttestationCredential,
 * with most fields encoded as base64 strings
 */
export interface WalletEncodedAttestationCredential {
  id: string;
  rawId: string;
  type: string;
  response: {
    attestationObject: string;
    clientDataJSON: string;
  }
}

/**
 * Interface encapsulating data from a webauthn PublicKeyAssertionCredential,
 * with most fields encoded as base64 strings
 */
export interface WalletEncodedAssertionCredential {
  id: string;
  rawId: string;
  type: string;
  response: {
    authenticatorData: string;
    clientDataJSON: string;
    signature: string;
    userHandle: string | null;
  }
}
