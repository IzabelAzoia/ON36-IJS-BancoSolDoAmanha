import { ClientAuth } from '../../../domain/clients/services/client-auth.model';

describe('ClientAuth', () => {
  test('should create a new ClientAuth instance', () => {
      const clientAuth = new ClientAuth('João');
      expect(clientAuth).toBeDefined();
  });
});


