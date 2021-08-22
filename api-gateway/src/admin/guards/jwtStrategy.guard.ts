import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { config } from "src/config";
import { AdminRepository } from "../repositories";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly adminRepository: AdminRepository,
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get(config.AD_SECRET_KEY),
        });
    }

    async validate(payload: any) {
        console.log({ payload });
        const { adminId, email, accessCode } = payload;
        const user = await this.adminRepository.findByToken(adminId, email, accessCode);
        console.log({ user });
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
