import { TransactionService } from '../../../transactions/services/transaction.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from '../../../transactions/controllers/transaction.controller';

describe('TransactionsController', () => {
  let controller: TransactionController;
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [TransactionService],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
