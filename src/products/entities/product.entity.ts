import { User } from 'src/auth/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm'

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    title: string;

    @Column('int')
    pricepublic:number;

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

    @Column({
        type: 'text',
        unique:true,
    })
    sku: string;   

    @Column('bool',{
        default: true,
    })
    isactive: boolean;

    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.sku=this.sku.toUpperCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert()
    }

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

