import { SetMetadata } from "@nestjs/common";

export const UnProtected = () => SetMetadata( "unprotected", true );

export const META_UNPROTECTED = "unprotected";