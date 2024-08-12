import { UserInterface } from '../../users/interfaces/user.interface';
import { ClientDetailsInterface } from './client-details.interface';
import { AccountOperationsInterface } from '../../accounts/interfaces/account-operations.interface';

export interface ClientInterface extends UserInterface, ClientDetailsInterface, AccountOperationsInterface {}
