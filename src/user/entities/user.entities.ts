import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  OneToMany, ManyToOne, JoinColumn
} from "typeorm";

@Entity({ name: "admin_user_info" })
export class UserInfo {
  @PrimaryGeneratedColumn({ comment: '主键' })
  id: number

  @Column({
    type: "varchar", length: '100', comment: '用户头像',
    default: "https://wechat800.oss-cn-shanghai.aliyuncs.com/yume/3cb805be_E886042_a75650be.png"
  })
  avatar: string

  @Column({
    type: "varchar", length: '20', comment: '用户名称',
  })
  username: string

  @Column({ type: "int", comment: '用户性别' })
  sex: number


  @Column({ type: "varchar", comment: '用户性别' })
  address: string

  @Column({ comment: '创建时间', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', })
  createDate: string;


  // @OneToMany(type => UserOrder, userOrder => userOrder.orderUser)
  // joinOrder: UserOrder[]
}
@Entity({ name: "admin_user_order" })
export class UserOrder {
  @PrimaryGeneratedColumn({ comment: '主键' })
  id: number

  @Column({ name: 'user_id', type: "int", comment: '用户id' })
  // @ManyToOne(type => UserInfo, userinfo => userinfo.joinOrder)
  // @JoinColumn({ name: 'user_id' })
  orderUser: number

  @Column({ name: 'shop_id', type: "int", comment: '商品id' })
  orderShop: number

  @Column({ type: "varchar", comment: '订单编号' })
  orderNum: string

  @Column({ comment: '创建时间', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', })
  createDate: string;

  @Column({ type: 'varchar', length: '15', comment: '创建时间' })
  currentDate: string
}



@Entity({ name: "admin_user_logistics" })
export class Logistics {
  @PrimaryGeneratedColumn({ comment: '主键' })
  id: number

  @Column({ type: 'int', name: 'user_id', comment: '用户id' })
  userid: number

  @Column({ type: "varchar", comment: '发货地' })
  sendAddress: string


  @Column({ type: "varchar", comment: '收货地' })
  acceptAddress: string


  @Column({ type: "varchar", comment: '商品名称' })
  shopTitle: string

  @Column({ type: "varchar", comment: '订单编号' })
  orderNum: string

  @Column({ comment: '创建时间', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', })
  createDate: string;
}