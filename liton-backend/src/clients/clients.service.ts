// src/clients/clients.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { clientSchema } from './schema/client-schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async create(clientData: Partial<Client>): Promise<Client> {
    await clientSchema.validate(clientData, { abortEarly: false });

    if (clientData.email) {
      const existingClient = await this.clientRepository.findOne({
        where: { email: clientData.email },
      });
      if (existingClient) {
        throw new ConflictException(
          `Client with email ${clientData.email} already exists`,
        );
      }
    }

    if (clientData.password) {
      const saltRounds = 10;
      clientData.password = await bcrypt.hash(clientData.password, saltRounds);
    }

    const client = this.clientRepository.create(clientData);
    return this.clientRepository.save(client);
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async findByEmail(email: string): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { email } });

    if (!client?.id) {
      throw new NotFoundException(`Client with email ${email} not found`);
    }
    return client;
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    return client;
  }

  async update(id: number, clientData: Partial<Client>): Promise<Client> {
    await this.clientRepository.update(id, clientData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
