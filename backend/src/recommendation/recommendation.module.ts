import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';
import { Submission } from './entities/submission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Submission])],
  controllers: [RecommendationController],
  providers: [RecommendationService],
})
export class RecommendationModule {}
