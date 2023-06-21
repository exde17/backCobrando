import { InternalServerErrorException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiInternalServerErrorResponse } from "@nestjs/swagger";


export const getUser = createParamDecorator(
    (data, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const user = req.user

        if(!user){
            throw new InternalServerErrorException('comunicate con el admin de DB');
        }
        return (!data)? user : user[data];
    }
) 