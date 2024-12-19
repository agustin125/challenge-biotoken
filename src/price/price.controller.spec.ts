import { Test, TestingModule } from '@nestjs/testing';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';

describe('PriceController', () => {
  let priceController: PriceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PriceController],
      providers: [PriceService],
    }).compile();

    priceController = app.get<PriceController>(PriceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(priceController.getTokenPrice());
    });
  });
});
