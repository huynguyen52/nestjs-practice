import { Module } from '@nestjs/common';
import Post from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostsController from './post.controller';
import PostsService from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
