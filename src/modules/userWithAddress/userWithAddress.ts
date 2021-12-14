import { User } from '../users/users';
import { Address } from '../addresses/addresses';

export interface UserWithAddresses{
    user: User;
    addresses : Address[]
}