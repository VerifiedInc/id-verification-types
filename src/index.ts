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
