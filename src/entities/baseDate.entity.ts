import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseDateEntity extends BaseEntity {
  @UpdateDateColumn({ comment: '수정시간' })
  modifyDate: Date;

  @CreateDateColumn({ comment: '작성 시간' })
  createDate: Date;
}
