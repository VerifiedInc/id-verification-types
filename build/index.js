"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHVLoginErrorResponse = exports.isHVLoginSuccessResponse = exports.isHVClientResponseError = exports.isHVClientResponseCancelled = exports.isHVClientResponseSuccess = void 0;
const isHVClientResponseSuccess = (response) => {
    return response.status === 'auto_approved' || response.status === 'auto_declined' || response.status === 'needs_review';
};
exports.isHVClientResponseSuccess = isHVClientResponseSuccess;
const isHVClientResponseCancelled = (response) => {
    return response.status === 'user_cancelled';
};
exports.isHVClientResponseCancelled = isHVClientResponseCancelled;
const isHVClientResponseError = (response) => {
    return response.status === 'error';
};
exports.isHVClientResponseError = isHVClientResponseError;
/**
 * Typeguard to check if an HVLoginResponse is an HVLoginSuccessResponse
 */
const isHVLoginSuccessResponse = (response) => {
    return response.status === 'success';
};
exports.isHVLoginSuccessResponse = isHVLoginSuccessResponse;
/**
 * Typeguard to check if an HVLoginResponse is an HVLoginErrorResponse
 */
const isHVLoginErrorResponse = (response) => {
    return response.status === 'failure';
};
exports.isHVLoginErrorResponse = isHVLoginErrorResponse;
;
;
//# sourceMappingURL=index.js.map