import { User } from 'src/auth/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import {Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    title: string;

    @Column('int')
    pricePublic:number;

    @Column('int')
    price15:number;

    @Column('int')
    price25:number;

    @Column('int')
    price35:number;

    @Column('int')
    price42:number;

    @Column('int')
    price50:number;

    @Column({
        type: 'text',
        default:''
    })
    description: string;    

    @Column({
        type: 'text',
        default:''
    })
    image: string;    

    @Column('bool',{
        default: true,
    })
    isActive: boolean;


    @ManyToOne(
        ()=>User,
        (user)=>user.product,
        {eager: true} //cargar automaticamente la relación, que en el fron muestre el
    )
    user: User

    @ManyToOne(
        ()=>Category,
        (categorie)=>categorie.product,
        {eager: true} //cargar automaticamente la relación, que en el fron muestre el
    )
    categorie: Category
}

