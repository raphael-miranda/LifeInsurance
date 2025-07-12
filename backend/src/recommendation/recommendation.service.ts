import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { Submission } from './entities/submission.entity';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>,
  ) {}

  async create(createRecommendationDto: CreateRecommendationDto) {
    const { age, income, dependents, riskTolerance } = createRecommendationDto;

    let baseCoverage = 10 * income;
    let term: number | null = 30;
    let type = 'Term Life';

    if (age >= 40 && age < 60) {
      term = 20;
    } else if (age >= 60) {
      type = 'Whole Life';
      term = null;
    }

    if (riskTolerance === 'High') {
      baseCoverage *= 1.2;
    } else if (riskTolerance === 'Low') {
      baseCoverage *= 0.8;
    }

    const additionalCoverage = dependents * 100000;
    const totalCoverage = baseCoverage + additionalCoverage;

    const recommendation = term
      ? `${type} – $${totalCoverage.toFixed(2)} for ${term} years`
      : `${type} – $${totalCoverage.toFixed(2)}`;
    const explanation = `Based on your age (${age}), income ($${income.toFixed(2)}), number of dependents (${dependents}), and risk tolerance (${riskTolerance}), we recommend this policy to ensure your family's financial security.`;

    const submission = this.submissionRepository.create({
      age,
      income,
      dependents,
      riskTolerance,
      recommendation,
      explanation,
    });

    try {
      await this.submissionRepository.save(submission);
      return { recommendation, explanation };
    } catch (error) {
      console.error('Error saving submission:', error);
      throw new InternalServerErrorException('Failed to save recommendation');
    }
  }
}
