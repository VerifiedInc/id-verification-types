// result type with the leaf data points of various IDV's data
export interface KYCData {
  address: string;
  dob: string;
  gender: string;
  fullName: string;
  docImage?: string; // base64 encoded image
  docType: string; // i.e. 'dl'
  docCountryId: string; // i.e. 'usa'
  fullFaceImage?: string; // base64 encoded image
  liveFace: string; // i.e. "yes"
  liveFaceConfidence: string; // i.e. "high"
  faceMatch: string; // i.e. "yes"
  faceMatchConfidence: string; // i.e. "high"
}

export interface HvConfidence {
  value: string; // i.e. "yes"
  confidence: string; // i.e. "high"
}

export interface HvFaceMatchData {
  responseResult: {
    result: {
      details: {
        match: HvConfidence
      };
    }
  }
}

export interface HvFaceData {
  fullFaceImagePath: string; // base64 encoded image
  responseResult: {
    result: {
      details: {
        liveFace: HvConfidence
      }
    }
  }
}

export interface HvDocField {
  value: string;
}

export interface HvDocFields {
  address: HvDocField;
  dateOfBirth: HvDocField; // value in the format "dD-mM-YYYY" as of 6/23/2022
  fullName: HvDocField;
  gender: HvDocField;
}

export interface HvDocData {
  docImagePath: string; // base64 encoded image
  documentId: string; // i.e. 'dl', really more of doc type
  responseResult: {
    result: {
      details: Array<{
        fieldsExtracted: HvDocFields
      }>
    }
  }
}

export interface HvDocScanData {
  faceMatchData: HvFaceMatchData;
  faceData: HvFaceData;
  docListData: Array<HvDocData>;
  selectedCountryId: string; // i.e. "usa"
}

/**
 * NEW HV TYPES
 */

// the demo's HypberVerge Service response, not directly from HV.
export interface HyperVergeResponse {
  userCode: string;
  dob: string;
}


export interface HvApiResponse {
  status: 'string'; // e.g. "success"
  statusCode: 200,
  metadate: {
    requestId: string,
    transactionId: string,
  },
  result: {
    results: HvResultModule[]
  }
}

export const isHVClientResponseSuccess = (response: HVClientResponse): response is HVClientResponseSuccess => {
  return response.status === 'auto_approved' || response.status === 'auto_declined' || response.status === 'needs_review';
};

export const isHVClientResponseCancelled = (response: HVClientResponse): response is HVClientResponseCancelled => {
  return response.status === 'user_cancelled';
};

export const isHVClientResponseError = (response: HVClientResponse): response is HVClientResponseError => {
  return response.status === 'error';
};

export interface HvResultModule {
  moduleId: string; // e.g. "module_id_card_validation"
  imageUrl: string; // e.g. ""https://prod-audit-portal-usa.s3.amazonaws.com/gkyc-us-east-1/readId/2022-10-07/f5q5lt/1665102190083-14fbeb04-0924-4374-addb-7b1a32440691/image.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAZRKK5ZMR5D7ZILGV%2F20221007%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221007T002344Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCmFwLXNvdXRoLTEiRjBEAiBb6GZIbOQ2HGFaJv23NQBNqae6uk8ODAUi4pLMNvx7%2BQIgRFWE4K6vuv4DvyqQGty7nAllBkwlqSnk3t0kAga9Pnoq2QQI9P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2NTU2NzY1MjUzNDciDCx6HC69tOTOQQ5t%2BSqtBPBUYiT3IqR7vgIJqu1UK9sXTr%2BWZTAwrC39NNtBVNFWkHlMQAqIgHA4euFeRRS9ssYz%2FL%2BYlEm82lqJs8dENJ9m6nDicIdYhxkaGjM1unH7g2qy6MCNW%2BtFLMffJ0%2BlSbweIsr2RP1oD56MTBM2eSkKmx9hbeXbgLPmGLDHrqNuSN%2BKKDWegWY%2BRXjXKTMeg7jQSifji9iTdBRbVCZ0tHNhdaz3lFT90SiPOF3QY3EojSuEB3fCTnyRgAivfczl2AzueIJoiF7zgevzKCqYXHwO1ho7RIQ%2BQY5ws%2FnKgtZ%2FASQvfWvN%2F4xgT5HW9B%2Bs0ZhAQlCk98FLujfdkjr3fq%2B9URBEIjrVeYz2ZAbU6Jo0GI6SX8uqH7tQswxrhfjpZ4Bcgnew3Dr50BRRL5B3NVFoOTgPgO6kZSp7PiCQwF8Xo1AoIlai22a%2BHYTFDPOIwpCS28oXpbbbbh3YQsgPgch5rCf3wVS%2FJbPi8Jg2LtXrtqUQriWdtvkOXkP2ePXHMbUkAv0RdjkkPom%2F5cvujXuYGszFJ04mrWymSjAjiFkqqHd6yDdBinv%2BQyDk%2FWohkWpThZKC7z7sISXQUFFIO5wZV6Pq53SqkMw9AD79EfktS1bKwNgMLIYeNP7XrjCUxH3qh5L2wyiu1SQIw13CWAdxPckprLE5yr5VqBIBCWwS2GYJHi8j6YhS7U%2BJ9vU4jtC13jSKC7QAxILMBpmMgM01UXuzV%2BMxm88damKaMJ7O%2FJkGOqoBK8rk9fRg%2BCQKtd1NOzMKhfrIj4UFN98IdHOA%2BjODDx3rq4ix1DK5PvTxww%2BLaVm79mBJHxLsbOd%2FOepyjK5%2B8GNZX8myPDJ%2F%2BLdOK9HbWKRfm6XgHT5o7xlrpP9G9gOgYagYedfkIRUY%2FFnYiPEnZ5I0JAbT8S7JW9yqC8MjfZhHKAXsUlJ1LIqkjms7Iw0QqEBS7Y%2FtvOPmvEFDwXHIeDx1HrTLjXXKDyo%3D&X-Amz-Signature=2bc24fd7272ec5ffa1c096bf3c5c87077254798e3dfdf4f83fea83db7586e0e6&X-Amz-SignedHeaders=host""
  countrySelected: string; // e.g. "usa"
  attempts: number; // e.g. 1
  apiResponse: HvResultsApiResponse;
}

export interface HvResultsApiResponse {
  applicationStatus: string;
  userDetails: HVDetails;
  result: {
    details: HvApiResponseResultDetails[],
    summary: {
      action: string, // e.g. "pass"
    }
  }
}

export interface HvApiResponseResultDetails {
  croppedImageUrl: string; // e.g. "https://prod-gkyc-logs-usa.s3.amazonaws.com/gkyc-aligned-images/2022-10-07/f5q5lt/1665102190083-14fbeb04-0924-4374-addb-7b1a32440691_alignedImage.jpeg?AWSAccessKeyId=ASIAZRKK5ZMR4KUIYTMX&Expires=1665103092&Signature=fNXZjaOjY10sEdSnE66Ukjg4wiE%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEEEaCXVzLWVhc3QtMSJHMEUCIC04X%2BYwua%2FBp9f7dtVB3r%2FpVpXDMWMgXAnobsFt9uIjAiEA76W5W9dWoGnPAruo0y1gyuz3xRKytmsBSEfsWNUkTSEq1QQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2NTU2NzY1MjUzNDciDNEcq%2BYiVxWPB3FdgCqpBBLsGhS3SkN%2FXLhMY081J8%2FPXff6xeQloSJOHzZ8I6dGSNI0%2B2yDIBQEV%2Bq87iOnPLWyywOuk6pDYAEERwtFTIu%2FcPxkdL9zVX%2FIKt0kSrtm%2BEpfYZm9vVND1QnVO2j21mtaBEoqy3R4grw%2BNcrzbd%2BRhsp7jcMc73KkuPdNSHynMxAuUKyCc2efO5OImmk%2F3P7p65Pel0fVN7kKwK6VVDs9ukToJM1Fpuv6IWkIrhD6CW%2F2PE7Han7dqFUVxkiTp63F9KTT1zaMjUDM9JrjrgLx1oC1JvQRkLsWZFn0zi8naCzCscGVqMRavf%2FmLdzFyPCO%2FckectT%2FLVb3ZLMSyoN8obXNqOoy%2FhBbCjaX%2BfOUI%2Ba7cy%2FiQDyBquCx8UzGv%2BL9rJuF%2FllUijPZbzPNAZr%2F3UxlOdvp86UMg%2Fl36%2FEFqg7fl7VGFuU3QWStOTpiXbGoDdHqmKqB3FYfg0kr%2BmIX3qHt%2FFSw4UeiyiuT4k1OYrOHDLWayi9ofjjffHi3Ah7NSYjthn7OEUzFD5rY%2Bp1yirobw5fTe%2B186iSuTQ%2FDPO3F5ZnsP4u7dZsUsZUceYnpAucbqAlE4FulXxfkqWf%2BpaCnDPFieYXZHohJKCGJi14NTK9fRHzZTwlN71ZCl3JL9MGgcEq94bHvWnClR6JdTJyyxDtuhBFOZbZB0z3SQVZmKjDwT9ihqTxwtpLWiz7X%2FHqwCvhEQoy3%2FlFrvst482Cr0YLJm2gwlN%2F9mQY6qQFcHowepzxDTzrwTyHXEXFOW1R2h8CiqXk7nT%2BMe7ZrchjG%2FD%2FvSpCeExKzh0ApTxoXf80oSuFKrJQuE4xTUbOmUwd2aLEXYTZPdmfcCQeixdmSAJd4s%2Fh96YK2e440%2FDou7A%2BCJtlzfTSQ2ipvVO%2BRS3579LCa0cnU0G90GxAvBzeymeg3JduDgvptvmFHXNYv2fbvIhbLMDKCXRPBHN1W1vtijQHAhvrK"
  idType: string; // e.g. "dl"
  fieldsExtracted: HvFieldsExtracted;
}

export interface HvFieldsExtracted {
  address: HvAddress;
  age: {
    value: string;
  },
  countryCode: {
    value: string;
  },
  dateOfBirth: {
    value: string;
  },
  dateOfExpirary: {
    value: string;
  },
  datOfIssue: {
    value: string;
  },
  gender: {
    value: string;
  },
  idNumber: {
    value: string;
  },
  firstName: {
    value: string; 
  },
  lastName: {
    value: string;
  },
  middleName: {
    value: string;
  },
  fullName: {
    value: string;
  },
  type: {
    value: string; // e.g. "DL"
  },
  yearOfBirth: {
    value: string;
  }
}

// contains other empty fields in the response body, which is why has it own type
export interface HvAddress {
  value: string;
}

// HV Login types
/**
 * Options object for logging in to HyperVerge
 */
export interface HVLoginOptions {
  appId: string;
  appKey: string;
  expiry: number;
}

export interface HVLoginResult {
  token: string;
}

/**
 * Properties shared by all HyperVerge login responses
 */
export interface HVLoginBaseResponse {
  status: 'success' | 'failure'; // e.g. "success"
  statusCode: '200' | '400' | '401' | '500'; // these are just the status codes I've seen, but there may be more
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

// a union type of all possible Hyperverge login responses
export type HVLoginResponse = HVLoginSuccessResponse | HVLoginErrorResponse;

/**
 * Typeguard to check if an HVLoginResponse is an HVLoginSuccessResponse
 */
export const isHVLoginSuccessResponse = (response: HVLoginResponse): response is HVLoginSuccessResponse => {
  return response.status === 'success';
};

/**
 * Typeguard to check if an HVLoginResponse is an HVLoginErrorResponse
 */
export const isHVLoginErrorResponse = (response: HVLoginResponse): response is HVLoginErrorResponse => {
  return response.status === 'failure';
};

// HV Web SDK types
export interface HVDetails {
  address: string;
  country: string;
  dateOfBirth: string;
  faceMatchAction: string;
  firstName: string;
  fullName: string;
  idNumber: string;
  idType: string;
  // eslint-disable-next-line camelcase
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
};

export interface HVClientResponseCancelled extends HVClientResponseBase {
  status: 'user_cancelled';
  latestModule: string; // the last module that was executed before the user cancelled the flow
};

export interface HVClientResponseError extends HVClientResponseBase {
  status: 'error';
  errorCode: number;
  errorMessage: string;
  latestModule: string; // the last module that was executed before the error occurred
}

export type HVClientResponse = HVClientResponseSuccess | HVClientResponseCancelled | HVClientResponseError;

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
  new(accessToken: string, workflowId: string, transactionId: string): HVHyperKycConfigInstance
}

/**
 * The HyperKycModule added to window by the HyperVerge JS SDK
 */
export interface HVHyperKycModule {
  launch: (config: HVHyperKycConfigInstance, handler: (result: HVClientResponse) => void) => void;
}
