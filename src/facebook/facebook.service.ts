import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFacebookDto } from './dto/create-facebook.dto';
import { UpdateFacebookDto } from './dto/update-facebook.dto';

@Injectable()
export class FacebookService {
  constructor(private prisma: PrismaService) {} 
 async create(createFacebookDto: CreateFacebookDto) {
  const facebook= await this.prisma.facebook.create({
    data:{
      ...createFacebookDto
    }
  });


   return {
     message:"Facebook Added Successfully",
     data:facebook
   };
  }

  async findAll() {
    const facebook=await this.prisma.facebook.findMany();
    return facebook;
  }

  async findOne(id: number) {
    const face= await this.prisma.facebook.findFirst({
      where:{
        id:id
      }
    });
    return face;
  }

  async update(id: number, updateFacebookDto: UpdateFacebookDto) {
    const newAnn= await this.prisma.facebook.findUnique({
      where:{
        id:id
      }
    });
    if(!newAnn){
      throw new ForbiddenException(
        'Facebook Doesnot Exists'
      )
    }
    return this.prisma.facebook.update({
      where:{
        id:id
      },
      data:{
        ...updateFacebookDto
      }
    })
  }

  async remove(id: number) {
    const face=await this.prisma.facebook.findUnique({
      where:{
        id:id
      }
    });
    if(!face){
      throw new ForbiddenException(
        'Facebook Doesnot Exists'
      )
    }
    await this.prisma.facebook.delete({
      where:{
        id:id
      }
    })
  }
}
