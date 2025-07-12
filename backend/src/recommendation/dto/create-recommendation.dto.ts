import { ApiProperty } from '@nestjs/swagger';

export class CreateRecommendationDto {
  @ApiProperty({ example: 30, description: 'Age of the user (18-100)' })
  age: number;

  @ApiProperty({ example: 50000, description: 'Annual income in USD' })
  income: number;

  @ApiProperty({ example: 2, description: 'Number of dependents' })
  dependents: number;

  @ApiProperty({
    example: 'Medium',
    enum: ['Low', 'Medium', 'High'],
    description: 'Risk tolerance level',
  })
  riskTolerance: string;
}
