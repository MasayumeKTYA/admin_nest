import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
export class shopList {
  @PrimaryGeneratedColumn({ type: 'int', comment: '主键id' })
  id: number

  @Column({ type: "varchar", length: '50', comment: '商品名称' })
  shopTitle: string

  @Column({ type: "varchar", length: '20', comment: '商品分类名称' })
  shopClassify: string

  @Column({ type: "int", comment: '价格' })
  price: number
}

export class shopClassify {
  @PrimaryGeneratedColumn({ type: 'int', comment: '主键id' })
  id: number

  @Column({ type: "varchar", length: '20', comment: '分配标题' })
  title: string
}