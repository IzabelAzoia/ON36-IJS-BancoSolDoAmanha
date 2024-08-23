import { UserInterface } from '../users/user.interface';
import { ClientDetailsInterface } from './client-details.interface';
import { AccountOperationsInterface } from '../accounts/account-operations.interface';

export interface ClientInterface extends UserInterface, ClientDetailsInterface, AccountOperationsInterface {}
