import { User } from "src/auth/entities/user.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    title: string;

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

    @OneToMany(
        ()=>Product,
        (product)=>product,
    )
    product: Product;
}
