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

/**
 * DTO containing the data necessary for the client to initiate the webauthn authentication flow
 */
export interface WalletWebauthnRequestDto {
  challenge: string;
  credentialIds: string[];
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

/**
 * Interface encapsulating options for authenticating the wallet client to the server
 * with webauthn
 */
export interface WalletWebauthnAuthenticationOptions {
  strategy: 'webauthn';
  assertion: WalletEncodedAssertionCredential;
}

/**
 * Interface encapsulating the response from the wallet server when a user is authenticated with webauthn
 */
export interface WalletWebauthnAuthenticationResult {
  accessToken: string;
  authentication: {
    strategy: 'webauthn';
    accessToken: string;
    payload: {
      aud: string;
      exp: number;
      iat: number;
      iss: string;
      jti: string;
      sub: string;
    }
  };
  isValid: boolean;
  user: WalletUserDto;
}
