import { Category } from "../../categories/entities/category.entity";
import { Product } from "../../products/entities/product.entity";
import {OneToMany, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column('text',{
        unique: true
    })
    email: string;
    
    @Column('text',{
      //  select: false, //En find y querybuilder no se incluye
    })
    password: string;
    
    @Column('text')
    fullName: string;
    
    @Column('bool',{
        default: true,
    })
    isActive: boolean;
    
    @Column('text'
        ,{default: 'user'}
        //,{array: true, default: 'user'}
    )
    rol: string;

    @Column('text',{
        default: 'Colombia',
    })
    country: string;

    @Column('text',{
        default: '',
    })
    profilePhoto: string;

    @Column('text'    
        //,{default: 'supervisor',}
    )
    herbalifeLevel: string;



    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email=this.email.toLowerCase().trim();
        this.fullName=this.fullName.toUpperCase().trim();
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