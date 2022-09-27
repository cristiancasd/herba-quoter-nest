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
    fullname: string;
    
    @Column('bool',{
        default: true,
    })
    isactive: boolean;
    
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
    profilephoto: string;

    @Column('text'    
        //,{default: 'supervisor',}
    )
    herbalifelevel: string;



    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email=this.email.toLowerCase().trim();
        this.fullname=this.fullname.toUpperCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert()
    }
    
    @OneToMany(
        ()=>Category,
        (categorie)=>categorie,
        //{eager: true} //cargar automaticamente la relación, que en el fron muestre el

    )
    categorie: Category;

    @OneToMany(
        ()=>Product,
        (product)=>product,
    )
    product: Product;

    
}