import { applyDecorators, SetMetadata } from "@nestjs/common";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { UserType } from "src/app/users/enum/userType.enum";

export function Role(role: UserType) {
    return applyDecorators(
      SetMetadata('roles', role),
      ApiBearerAuth(),
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}