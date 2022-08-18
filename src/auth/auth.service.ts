import { ForbiddenException, Injectable } from '@nestjs/common';
import { prisma } from '@prisma/client';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';
import { AuthDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt:JwtService,
        private config:ConfigService
    ){}
    async register(dto:RegisterDto)
    {

        const hashedPassword=await argon.hash(dto.password);
        try{
            const userToRegister=await this.prisma.user.create({
                data:{
                    first_name:dto.first_name,        
                    last_name:dto.last_name,         
                    username           : dto.username,
                    password          : hashedPassword,
                    
                    role          :dto.role

                }
            })
            
            return this.signJwtToken(userToRegister.id,userToRegister.username);
            
        }
        catch(e){
            console.log(e);
            if (
                e instanceof
                PrismaClientKnownRequestError
              ) {
            if(e.code==='P2002'){
                throw new ForbiddenException('Credentials Already Taken');
            }
        }
        throw e;
        }
    }
    async login(dto:AuthDto)
    {
        const user=await this.prisma.user.findUnique({
            where:{
                username:dto.username
            }
        });
        if(!user){
            throw new ForbiddenException(
                'Incorrect Credentials'
            );
        }
        const pswdMtch=await argon.verify(
            user.password,
            dto.password
        );
        if(!pswdMtch)
        {
            throw new ForbiddenException('Credentials Incorrect');
        }
        return this.signJwtToken(user.id,user.username);
        

    }
    async signJwtToken(userId:number, username:string)
    {
        const payload={
            sub:userId,
            username
        }
        const secret_key=this.config.get('JWT_SECRET');
        const token =this.jwt.signAsync(
            payload,
            {
                expiresIn:'30m',
                secret:secret_key
            }
        );
        return token;
    }

    
}
