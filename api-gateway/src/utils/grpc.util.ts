import { HttpStatus } from "@nestjs/common";

export const converGrpcToHtpp = (grpcStatus: String) => {
    switch (+grpcStatus) {
        case 0:
            return HttpStatus.OK;
        case 2:
            return HttpStatus.INTERNAL_SERVER_ERROR;
        case 3:
            return HttpStatus.BAD_REQUEST;
        case 5:
            return HttpStatus.NOT_FOUND;
        case 6:
            return HttpStatus.METHOD_NOT_ALLOWED;
        case 7 || 16:
            return HttpStatus.UNAUTHORIZED;
        case 13:
            return HttpStatus.INTERNAL_SERVER_ERROR;
        default:
            return HttpStatus.INTERNAL_SERVER_ERROR;
    }
};

// 0	OK
// 1	CANCELLED //show error
// 2	UNKNOWN
// 3	INVALID_ARGUMENT
// 4	DEADLINE_EXCEEDED
// 5	NOT_FOUND
// 6	ALREADY_EXISTS
// 7	PERMISSION_DENIED
// 8	RESOURCE_EXHAUSTED
// 9	FAILED_PRECONDITION
// 10	ABORTED
// 11	OUT_OF_RANGE
// 12	UNIMPLEMENTED
// 13	INTERNAL
// 14	UNAVAILABLE
// 15	DATA_LOSS
// 16	UNAUTHENTICATED
