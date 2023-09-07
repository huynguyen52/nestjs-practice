import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreatePostDto } from './dto/createPost.dto';
import Post from './post.entity';

@Injectable()
export default class PostsService {
  private lastPostId = 0;
  private posts: Post[] = [];
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async testQuery() {
    const startYear = 2021;
    const startQuarter = 3;
    const endYear = 2023;
    const endQuarter = 1;
    const startDate = `${startYear}-${startQuarter * 3 - 2}-01`;
    const endDate = `${endYear}-${endQuarter * 3 - 2}-01`;
    const response = await this.postsRepository
      .createQueryBuilder('post')
      .where(
        `to_date(post.year || '-' || (post.quarter * 3 - 2) || '-01', 'YYYY-MM-DD') >= :startDate`,
        { startDate },
      )
      .andWhere(
        `to_date(post.year || '-' || (post.quarter * 3 - 2) || '-01', 'YYYY-MM-DD') <= :endDate`,
        { endDate },
      )
      .orderBy('post.year, post.quarter')
      .getManyAndCount();
    console.log({ response });
    return response;
  }

  getAllPosts() {
    return this.postsRepository.find();
  }

  async createPost(post: CreatePostDto) {
    const newPost = await this.postsRepository.create(post);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
