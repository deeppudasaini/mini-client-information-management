import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    
     private prisma: PrismaService) {} 
     
  

  async findAll() {
    const user=await this.prisma.user.findMany();
    return user;
  }

async findOne(id: number) {
    const user= await this.prisma.user.findFirst({
      where:{
        id:id
      }
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const newUser= await this.prisma.user.findUnique({
      where:{
        id:id
      }
    });
    if(!newUser){
      throw new ForbiddenException(
        'User Doesnot Exists'
      )
    }
    return this.prisma.user.update({
      where:{
        id:id
      },
      data:{
        ...updateUserDto
      }
    })
  }

  async remove(id: number) {
    const user=await this.prisma.user.findUnique({
      where:{
        id:id
      }
    });
    if(!user){
      throw new ForbiddenException(
        'User Doesnot Exists'
      )
    }
    await this.prisma.user.delete({
      where:{
        id:id
      }
    })
  }
}