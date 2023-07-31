import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity({ name: 'admin_admin_user' })
export class Admin {

  @PrimaryGeneratedColumn({ type: 'int', comment: '主键' })
  id: number

  @Column({ type: 'varchar', length: 15, comment: '账号' })
  username: string

  @Column({ type: 'varchar', length: 15, comment: '密码' })
  password: string

  @Column({ type: 'varchar', length: 15, comment: '昵称' })
  name: string

  @Column({ type: 'int', comment: '账号性质 1为超级管理员,2为普通管理员' })
  account: number //账号性质

  @Column({ type: 'varchar', length: 20, comment: '邮箱' })
  email: string  //电子邮箱

  @Column({ type: 'varchar', length: 18, comment: '上次登录时间' })
  updataTime: string
}
@Entity({ name: 'admin_admin_log' })
export class Login {
  @PrimaryGeneratedColumn({ type: 'int', comment: '主键' })
  id: number

  @Column({ type: 'varchar', length: 15, comment: '账号' })
  username: string

  @Column({ type: 'varchar', length: 15, comment: 'ip地址' })
  ip: string

  @Column({ type: 'varchar', length: 15, comment: '浏览器' })
  browser: string

  @Column({ type: 'varchar', length: 18, comment: '登录时间' })
  createTime: string
}