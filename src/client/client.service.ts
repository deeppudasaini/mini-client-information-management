import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {} 
  async create(createClientDto: CreateClientDto) {
    const client= await this.prisma.client.create({
      data:{
       ...createClientDto
      }
    });

     return {
       message:"Client Created Successfully",
       data:client
     };
  }

  async findAll() {
    const client=await this.prisma.client.findMany();
    return client;
  }

async findOne(id: number) {
    const client= await this.prisma.client.findFirst({
      where:{
        id:id
      }
    });
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const newClient= await this.prisma.client.findUnique({
      where:{
        id:id
      }
    });
    if(!newClient){
      throw new ForbiddenException(
        'Client Doesnot Exists'
      )
    }
    return this.prisma.client.update({
      where:{
        id:id
      },
      data:{
        ...updateClientDto
      }
    })
  }

  async remove(id: number) {
    const client=await this.prisma.client.findUnique({
      where:{
        id:id
      }
    });
    if(!client){
      throw new ForbiddenException(
        'Client Doesnot Exists'
      )
    }
    await this.prisma.client.delete({
      where:{
        id:id
      }
    })
  }
}
