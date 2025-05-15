import { ApiProperty } from "@nestjs/swagger";

export class CustomerReadModel {
  @ApiProperty({
    description: 'Identificador único da cliente',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Nome da cliente',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Email da cliente',
    example: 'john_doe@email.com',
  })
  email: string;

@ApiProperty({
  description: 'CPF da cliente',
  example: '123.456.789-00',
})
cpf: string;

}
