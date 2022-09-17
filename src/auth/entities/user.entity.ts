import { Category } from "src/categories/entities/category.entity";
import { Product } from "src/products/entities/product.entity";
import {OneToMany, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column('text',{
        unique: true
    })
    email: string;
    
    @Column('text')
    password: string;
    
    @Column('text')
    fullName: string;
    
    @Column('bool',{
        default: true,
    })
    isActive: boolean;
    
    @Column('text',{
        array: true,
        default: ['user']
    })
    roles: string[];

    @Column('text',{
        default: 'Colombia',
    })
    country: string;

    @Column('text',{
        default: '',
    })
    profilePhoto: string;

    @Column('text',{
        default: 'Supervisor',
    })
    herbalifeLevel: string;



    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email=this.email.toLowerCase().trim();
    }
    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert()
    }


    @OneToMany(
        ()=>Product,
        (product)=>product,
    )
    product: Product;

    @OneToMany(
        ()=>Category,
        (categorie)=>categorie,
    )
    categorie: Category;
}