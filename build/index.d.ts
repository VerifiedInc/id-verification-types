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
export interface HyperVergeResponse {
    userCode: string;
}
export interface HVDetails {
    dateOfBirth: string;
    firstName: string;
    fullName: string;
    id_back_imagePath: string;
    idNumber: string;
    lastName: string;
    middleName: string;
}
export interface HvClientResponse {
    status: string;
    transactionId: string;
    details: HVDetails;
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
//# sourceMappingURL=index.d.ts.map