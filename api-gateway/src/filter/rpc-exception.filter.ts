import { Catch, ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Response } from "express";
import { throwError } from "rxjs";
import { converGrpcToHtpp } from "src/utils/grpc.util";

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const err = exception.getError();
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const code = converGrpcToHtpp(err["code"]);

        console.log("er=>", err, code, err["details"]);
        response.status(code).json({
            statusCode: code,
            message: err["details"],
        });
    }
}
