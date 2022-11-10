export interface KYCData {
    address: string;
    dob: string;
    gender: string;
    fullName: string;
    docImage?: string;
    docType: string;
    docCountryId: string;
    fullFaceImage?: string;
    liveFace: string;
    liveFaceConfidence: string;
    faceMatch: string;
    faceMatchConfidence: string;
}
export interface HvConfidence {
    value: string;
    confidence: string;
}
export interface HvFaceMatchData {
    responseResult: {
        result: {
            details: {
                match: HvConfidence;
            };
        };
    };
}
export interface HvFaceData {
    fullFaceImagePath: string;
    responseResult: {
        result: {
            details: {
                liveFace: HvConfidence;
            };
        };
    };
}
export interface HvDocField {
    value: string;
}
export interface HvDocFields {
    address: HvDocField;
    dateOfBirth: HvDocField;
    fullName: HvDocField;
    gender: HvDocField;
}
export interface HvDocData {
    docImagePath: string;
    documentId: string;
    responseResult: {
        result: {
            details: Array<{
                fieldsExtracted: HvDocFields;
            }>;
        };
    };
}
export interface HvDocScanData {
    faceMatchData: HvFaceMatchData;
    faceData: HvFaceData;
    docListData: Array<HvDocData>;
    selectedCountryId: string;
}
/**
 * NEW HV TYPES
 */
export interface HyperVergeResponse {
    userCode: string;
    dob: string;
}
export interface HvApiResponse {
    status: 'string';
    statusCode: 200;
    metadate: {
        requestId: string;
        transactionId: string;
    };
    result: {
        results: HvResultModule[];
    };
}
export declare const isHVClientResponseSuccess: (response: HVClientResponse) => response is HVClientResponseSuccess;
export declare const isHVClientResponseCancelled: (response: HVClientResponse) => response is HVClientResponseCancelled;
export declare const isHVClientResponseError: (response: HVClientResponse) => response is HVClientResponseError;
export interface HvResultModule {
    moduleId: string;
    imageUrl: string;
    countrySelected: string;
    attempts: number;
    apiResponse: HvResultsApiResponse;
}
export interface HvResultsApiResponse {
    applicationStatus: string;
    userDetails: HVDetails;
    result: {
        details: HvApiResponseResultDetails[];
        summary: {
            action: string;
        };
    };
}
export interface HvApiResponseResultDetails {
    croppedImageUrl: string;
    idType: string;
    fieldsExtracted: HvFieldsExtracted;
}
export interface HvFieldsExtracted {
    address: HvAddress;
    age: {
        value: string;
    };
    countryCode: {
        value: string;
    };
    dateOfBirth: {
        value: string;
    };
    dateOfExpirary: {
        value: string;
    };
    datOfIssue: {
        value: string;
    };
    gender: {
        value: string;
    };
    idNumber: {
        value: string;
    };
    firstName: {
        value: string;
    };
    lastName: {
        value: string;
    };
    middleName: {
        value: string;
    };
    fullName: {
        value: string;
    };
    type: {
        value: string;
    };
    yearOfBirth: {
        value: string;
    };
}
export interface HvAddress {
    value: string;
}
export interface HVLoginResult {
    token: string;
}
/**
 * Properties shared by all HyperVerge login responses
 */
export interface HVLoginBaseResponse {
    status: 'success' | 'failure';
    statusCode: '200' | '400' | '401' | '500';
}
/**
 * Success response from HyperVerge login
 */
export interface HVLoginSuccessResponse extends HVLoginBaseResponse {
    result: HVLoginResult;
    status: 'success';
    statusCode: '200';
}
/**
 * Error response from HyperVerge login
 */
export interface HVLoginErrorResponse extends HVLoginBaseResponse {
    status: 'failure';
    statusCode: '400' | '401' | '500';
    error: string;
}
export declare type HVLoginResponse = HVLoginSuccessResponse | HVLoginErrorResponse;
/**
 * Typeguard to check if an HVLoginResponse is an HVLoginSuccessResponse
 */
export declare const isHVLoginSuccessResponse: (response: HVLoginResponse) => response is HVLoginSuccessResponse;
/**
 * Typeguard to check if an HVLoginResponse is an HVLoginErrorResponse
 */
export declare const isHVLoginErrorResponse: (response: HVLoginResponse) => response is HVLoginErrorResponse;
export interface HVDetails {
    address: string;
    country: string;
    dateOfBirth: string;
    faceMatchAction: string;
    firstName: string;
    fullName: string;
    idNumber: string;
    idType: string;
    id_back_imagePath: string;
    livenessAction: string;
    lastName: string;
}
export interface HVClientResponseBase {
    status: 'user_cancelled' | 'auto_approved' | 'auto_declined' | 'needs_review' | 'error';
    transactionId: string;
}
export interface HVClientResponseSuccess extends HVClientResponseBase {
    status: 'auto_approved' | 'auto_declined' | 'needs_review';
    details: HVDetails;
}
export interface HVClientResponseCancelled extends HVClientResponseBase {
    status: 'user_cancelled';
    latestModule: string;
}
export interface HVClientResponseError extends HVClientResponseBase {
    status: 'error';
    errorCode: number;
    errorMessage: string;
    latestModule: string;
}
export declare type HVClientResponse = HVClientResponseSuccess | HVClientResponseCancelled | HVClientResponseError;
/**
 * The HyperKycConfig object from the HyperVerge JS SDK
 */
export interface HVHyperKycConfigInstance {
    accessToken: string;
    allowedStatusCodes: number[];
    apiFailureLottie: string;
    apiProcessingLottie: string;
    autoCaptureDuration: number;
    baseUrl: string;
    cancelledTag: string;
    chooseDocumentCaptureOption: boolean;
    configNumber: number;
    configUrl: string;
    countriesButton: string;
    countriesDesc: string;
    countriesSearchText: string;
    countriesTitle: string;
    countryListPopupId: string;
    countryListSelectId: string;
    countryListSelectPopupId: string;
    docPickerDesc: string;
    docPickerTitle: string;
    docTextConfig: Record<string, string>;
    docUIConfig: Record<string, string>;
    docUrl: string;
    documentHeaders: Record<string, string>;
    documentParams: Record<string, string>;
    documentResult: Array<any>;
    documentSelectId: string;
    documentSelectPopupId: string;
    documentSides: Array<string>;
    documentType: string;
    exitConditions: Array<string>;
    faceAutoCapture: boolean;
    faceMatchResult: Array<any>;
    faceTextConfig: Record<string, string>;
    faceUIConfig: Record<string, string>;
    faceUrl: string;
    failureTag: string;
    flow: Record<string, string>;
    footerShield: string;
    footerText: string;
    formModulePopupId: string;
    formModuleUIConfig: Record<string, string>;
    globals: Record<string, string>;
    handleDocRetries: boolean;
    handleFaceRetries: boolean;
    imageBackArrow: string;
    imageClose: string;
    inputs: Record<string, string>;
    kycWorkflow: Array<any>;
    languageSource: string;
    languageUsed: null;
    livenessHeaders: Record<string, string>;
    livenessParams: Record<string, string>;
    livenessResult: Array<any>;
    livenessThreshold: number;
    qrChoicePopupId: string;
    qrGetApprovedFaster: string;
    qrPhoneCameraIsBetter: string;
    qrPopupId: string;
    qrTextConfig: Record<string, string>;
    qrWaitingForResultsPopupId: string;
    regionName: string;
    resultStatus: Record<string, string>;
    shouldShowDocInstructionPage: boolean;
    shouldShowDocReviewScreen: boolean;
    shouldShowFaceInstructionPage: boolean;
    successTag: string;
    supportedLanguages: Array<string>;
    textConfig: Record<string, string>;
    totalConfigs: number;
    transactionId: string;
    userWorkflow: Record<string, string>;
    videoRecording: boolean;
    videoRecordingDuration: number;
    workflowId: string;
}
/**
 * Constructor for the HyperKycConfig object added to window by the HyperVerge JS SDK
 */
export interface HVHyperKycConfigConstructor {
    new (accessToken: string, workflowId: string, transactionId: string): HVHyperKycConfigInstance;
}
/**
 * The HyperKycModule added to window by the HyperVerge JS SDK
 */
export interface HVHyperKycModule {
    launch: (config: HVHyperKycConfigInstance, handler: (result: HVClientResponse) => void) => void;
}
//# sourceMappingURL=index.d.ts.map