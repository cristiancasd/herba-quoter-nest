import { User } from "../../auth/entities/user.entity";
import { Product } from "../../products/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column('text', {
        unique: true,
    })
    title: string;

    @Column('text', {
        default:''
    })
    description: string;

    @Column('bool',{
        default: true,
    })
    isactive: boolean;
    

    @ManyToOne(
        ()=>User, 
        (user)=>user.categorie,
        {eager: true} //cargar automaticamente la relación, que en el fron muestre el
    )
    user: User

    @OneToMany(
        ()=>Product,
        (product)=>product,
    )
    product: Product;
}
