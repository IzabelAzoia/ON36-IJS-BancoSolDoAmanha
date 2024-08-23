import { UserStatus } from '../../../domain/users/user.status.enum';
import { User } from '../../../domain/users/user.entity';
import { UserAuthentication } from '../../../users/models/user-authentication.model';
import { UserManager } from '../../../domain/users/user-manager.model';
import { UserType } from '../../../domain/users/user-types.enum';

describe('UserAuthentication', () => {
    let userAuth: UserAuthentication;
    let userManager: UserManager;
    const testPassword = 'password123';

    beforeEach(() => {
        // Criando o usuário com UserManager
        userManager = new UserManager(
            '1',
            'John Doe',
            '01-01-1990',
            '12345678900',
            '555-5555',
            '123 Main St',
            UserType.Manager,
            UserStatus.Active,
            testPassword
        );
    });

    test('should authenticate user with correct credentials', () => {
        expect(userManager.authenticateUser(testPassword)).toBe(true);
    });

    test('should not authenticate user with incorrect credentials', () => {
        expect(userManager.authenticateUser('wrongpassword')).toBe(false);
    });

    test('should not authenticate user with non-existent id', () => {
        // Verifica se o método retorna false para um ID não existente
        const nonExistentUserManager = new UserManager(
            '2',
            'Jane Doe',
            '02-02-1992',
            '09876543211',
            '555-5556',
            '456 Elm St',
            UserType.Client,
            UserStatus.Inactive,
            testPassword
        );
        expect(nonExistentUserManager.authenticateUser('password123')).toBe(false);
    });
});