import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Query('limit') limit: number, @Query('offset') offset: number) {
    return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns coffee number ${id}`
  }

  @Post()
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body){
    return `This action updates coffee ${id}`
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return `This action deletes coffee ${id}`
  }
}
