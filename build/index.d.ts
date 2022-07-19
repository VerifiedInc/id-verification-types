export interface KYCData {
    address: string;
    age: string;
    dob: string;
    gender: string;
    fullName: string;
    idType: string;
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
//# sourceMappingURL=index.d.ts.map