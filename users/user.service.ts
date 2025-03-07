import { Repository } from 'typeorm';
import { AppDataSource } from '../helpers/db';
import { Customer } from './user.entity';
import { Room } from './user.entity';
import { Reservation } from './user.entity';

export class CustomerService {
    private customerRepository: Repository<Customer> = AppDataSource.getRepository(Customer);

    async getAll() {
        return this.customerRepository.find({ select: ['id', 'email', 'phoneNumber', 'address', 'firstName', 'lastName'] });
    }  
    async getById(id: number) {
        return this.customerRepository.findOneBy({ id });
    }
 
    async create(data: Partial<Customer>) {
        if (await this.customerRepository.findOneBy({ email: data.email })) {
            throw new Error(`Email ${data.email} is already registered`);
        }

        const customer = this.customerRepository.create(data);
        return this.customerRepository.save(customer);
    }

    async update(id: number, data: Partial<Customer>) {
        const customer = await this.getById(id);
        if (!customer) throw new Error('Customer cant be found');

        Object.assign(customer, data);
        return this.customerRepository.save(customer);
    }

    async delete(id: number) {
        const customer = await this.getById(id);
        if (!customer) throw new Error('Customer cant be found');

        return this.customerRepository.remove(customer);
    }
}