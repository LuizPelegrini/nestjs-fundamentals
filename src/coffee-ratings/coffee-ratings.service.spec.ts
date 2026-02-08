import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeRatingsService } from './coffee-ratings.service';

describe('CoffeeRatingsService', () => {
  let service: CoffeeRatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeeRatingsService],
    }).compile();

    service = module.get<CoffeeRatingsService>(CoffeeRatingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
