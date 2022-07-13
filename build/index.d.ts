import { BaseEntity, PublicKeyInfo, HolderOptions, PublicKeyInfoUpdateOptions, HolderDto, DID } from '@unumid/types';
/**
 * enumerates the different email providers we work with
 */
export declare enum EmailProvider {
    EWS = "EWS",
    GMAIL = "GMAIL"
}
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
 * Data transfer object for wallet EmailUser (verified email product user)
 */
export interface WalletEmailUserDto extends BaseEntity {
    connectedEmailProvider?: EmailProvider;
    isClassifying: boolean;
}
/**
 * Data transfer object for wallet User
 */
export interface WalletUserDto extends BaseEntity {
    email: string;
    challenge: string;
    did?: string;
    updateKey?: string;
    webauthnCredentials: WalletWebauthnCredentialDto[];
    signingKeyId?: string;
    signingKeyIds?: string[];
    encryptionKeyId?: string;
    encryptionKeyIds?: string[];
    isEmailVerified: boolean;
    referralCode: string;
    emailUser?: WalletEmailUserDto;
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
    issuerUuid: string;
    did: string;
}
/**
 * Interface to encapsulate user verification options
 */
export interface VerificationOptions {
    email: string;
    token: string;
    referralCode?: string;
}
/**
 * DTO containing the data necessary for the client to initiate the webauthn authentication flow
 */
export interface WalletWebauthnRequestDto {
    challenge: string;
    webauthnCredentials: WalletWebauthnCredentialDto[];
    userUuid: string;
    isEmailVerified: boolean;
}
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
    referredByCode?: string;
}
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
    };
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
    };
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
        };
    };
    isValid: boolean;
    user: WalletUserDto;
}
/**
 * The response from the wallet server when a user is authenticated with a webauthn assertion.
 */
export declare type WalletWebauthnAssertionAuthenticationResult = WalletWebauthnAuthenticationResult<'webauthnAssertion'>;
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
    publicKeyInfo: PublicKeyInfoUpdateOptions[];
    holderOptions: HolderOptions;
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
        };
    };
    user: WalletUserDto;
}
/**
 * Interface to encapsulate user VerificationStatus options amongst verified communication channels
 */
export interface VerificationStatusOptions {
    emailShowVerifiedStatus: boolean;
}
/**
 * Interface to encapsulate options for a Subject did association request for use for an issuer to associate a subject with a did (without a request flow).
 */
export interface SubjectDidAssociationOptions {
    did: DID;
    userCode: string;
    issuerDid: string;
}
//# sourceMappingURL=index.d.ts.map