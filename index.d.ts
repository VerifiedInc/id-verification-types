import {
  BaseEntity,
  PublicKeyInfo,
  HolderOptions,
  PublicKeyInfoUpdateOptions,
  HolderDto
} from '@unumid/types';

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
  browserName?: string;
  deviceOs?: string;
  deviceModel?: string;
}

/**
 * Data transfer object for wallet User
 */
export interface WalletUserDto extends BaseEntity {
  email: string;
  challenge: string;
  did?: string;
  updateKey?: string;
  webauthnCredentials: WalletWebauthnCredentialDto[]
  signingKeyId?: string; // TODO: remove once singular key ids are no longer used by the client
  signingKeyIds?: string[];
  encryptionKeyId?: string; // TODO: remove once singular key ids are no longer used by the client
  encryptionKeyIds?: string[];
  isEmailVerified: boolean;
  referralCode: string;
}

/**
 * Enriched data transfer object for wallet User, including a newly created holder object from the saas
 */
export interface WalletUserEnrichedDto {
  user: WalletUserDto;
  holder: HolderDto;
}

/**
 * dto representing the user who referred the current user.
 * Only contains relevant attributes that will be displayed.
 */
export interface WalletReferringUserDto {
  email: string;
  referralCode: string;
}

/**
 * Data transfer object for wallet Issuer
 */
export interface WalletIssuerDto extends BaseEntity {
  name: string;
  customerUuid: string;
  issuerUuid: string
  did: string;
}

/**
 * Interface to encapsulate user verification options
 */
export interface VerificationOptions {
  email: string;
  token: string;
}

/**
 * DTO containing the data necessary for the client to initiate the webauthn authentication flow
 */
export interface WalletWebauthnRequestDto {
  challenge: string;
  webauthnCredentials: WalletWebauthnCredentialDto[];
  userUuid: string; // needed in case the user is not registered with webauthn
}

// Web Wallet Server Inputs

/**
 * Interface encapsulating options for creating a WebauthnCredential
 */
export interface WalletWebauthnCredentialCreateOptions {
  encodedCredential: WalletEncodedAttestationCredential;
  userUuid: string;
  browserName?: string;
  deviceOs?: string;
  deviceModel?: string;
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
  email: string;
  referralCode?: string;
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
 * with a webauthn assertion
 */
export interface WalletWebauthnAssertionAuthenticationOptions {
  strategy: 'webauthnAssertion';
  assertion: WalletEncodedAssertionCredential;
}

/**
 * Interface encapsulation options for authenticating the wallet client to the server
 * with a webauthn attestation
 */
export interface WalletWebauthnAttestationAuthenticationOptions {
  strategy: 'webauthnAttestation';
  attestation: WalletEncodedAttestationCredential;
  userUuid: string;
  holderOptions: HolderOptions;
}

/**
 * Interface encapsulating the base response from the wallet server when a user is authenticated with webauthn
 */
export interface WalletWebauthnAuthenticationResult<T extends string> {
  accessToken: string;
  authentication: {
    strategy: T;
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

/**
 * The response from the wallet server when a user is authenticated with a webauthn assertion.
 */
export type WalletWebauthnAssertionAuthenticationResult = WalletWebauthnAuthenticationResult<'webauthnAssertion'>;

/**
 * The response from the wallet server when a user is authenticated with a webauthn attestation.
 * Includes the newly saved WebauthnCredential
 */
export interface WalletWebauthnAttestationAuthenticationResult extends WalletWebauthnAuthenticationResult<'webauthnAttestation'> {
  webauthnCredential: WalletWebauthnCredentialDto;
}

/**
 * An interface to encapsulate the client passing new public key information from new key pairs created on the client. The HolderOptions in this case is Browser info where the keys are stored in WebAuthn.
 */
 export interface HolderPublicKeyInfoUpdateOptions {
  publicKeyInfo: PublicKeyInfoUpdateOptions[]; // keys to update/add
  holderOptions: HolderOptions; // metadata options for creating a new Holder, if keys are being added
}

/**
 * Options for authenticating a wallet client to the server via email verification
 */
export interface WalletEmailVerificationAuthenticationOptions extends VerificationOptions {
  strategy: 'emailVerification';
}

/**
 * The response from the wallet server when a user is authenticated with email verification
 */
export interface WalletEmailVerificationAuthenticationResult {
  accessToken: string;
  authentication: {
    strategy: 'emailVerification';
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
  user: WalletUserDto;
}
