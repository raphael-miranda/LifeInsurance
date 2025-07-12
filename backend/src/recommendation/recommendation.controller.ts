import { Controller, Post, Body } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from './pipes/joi-validation.pipe';
import * as Joi from 'joi';

const recommendationSchema = Joi.object({
  age: Joi.number().integer().min(18).max(100).required().messages({
    'number.base': 'Age must be a number',
    'number.integer': 'Age must be an integer',
    'number.min': 'Age must be at least 18',
    'number.max': 'Age must be at most 100',
    'any.required': 'Age is required',
  }),
  income: Joi.number().min(0).required().messages({
    'number.base': 'Income must be a number',
    'number.min': 'Income cannot be negative',
    'any.required': 'Income is required',
  }),
  dependents: Joi.number().integer().min(0).required().messages({
    'number.base': 'Dependents must be a number',
    'number.integer': 'Dependents must be an integer',
    'number.min': 'Dependents cannot be negative',
    'any.required': 'Dependents is required',
  }),
  riskTolerance: Joi.string()
    .valid('Low', 'Medium', 'High')
    .required()
    .messages({
      'string.base': 'Risk tolerance must be a string',
      'any.only': 'Risk tolerance must be one of Low, Medium, or High',
      'any.required': 'Risk tolerance is required',
    }),
});

@ApiTags('recommendation')
@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Post()
  @ApiOperation({ summary: 'Generate a life insurance recommendation' })
  @ApiResponse({
    status: 201,
    description: 'Recommendation generated and saved',
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(
    @Body(new JoiValidationPipe(recommendationSchema))
    createRecommendationDto: CreateRecommendationDto,
  ) {
    return this.recommendationService.create(createRecommendationDto);
  }
}
