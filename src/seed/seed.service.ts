import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/category.entity';


@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,

    @InjectRepository(User) //Inyectamos repositorio para poder borrar los usuarios
    private readonly userRepository: Repository<User>,

    @InjectRepository(Category) //Inyectamos repositorio para poder borrar los usuarios
    private readonly categorieRepository: Repository<Category>
  ){}


  async runSeed() {
    await this.deleteTables();
    const users=await this.insertUsers();
    const categories=await this.insertCategories(users[1]);
    await this.insertNewProductsBatidos(users[1], categories[0]);
    await this.insertNewProductsDigestion(users[2], categories[1]);
    
    return `Seed Excuted`;
  }

  private async deleteTables(){
    await this.productsService.deleteAllProductos();
    await this.categoriesService.deleteAllCategories();
    //En userRepository no está implementado borrar todos los users, lo implementamos aquí
    const queryBuilder=this.userRepository.createQueryBuilder()
    await queryBuilder
      .delete()
      .where({}) // Borra todo
      .execute()
  }

  private async insertUsers(){
    const seedUsers=initialData.users;
    const users: User[]=[];
    seedUsers.forEach(user=>{
      users.push(this.userRepository.create(user))
    });
    const dbUsers=await this.userRepository.save(seedUsers)
    return dbUsers
  }

  private async insertCategories(user: User){
    const seedCategories=initialData.categories;
    const categories: Category[]=[];
    seedCategories.forEach(category=>{
      console.log('category')
      categories.push(this.categorieRepository.create({...category, user}))
    });
    console.log('seedCategories ...', seedCategories)
    const dbCategories=await this.categorieRepository.save(categories)
    return dbCategories
  }



  private async insertNewProductsBatidos(user: User, category: Category){
    await this.productsService.deleteAllProductos();
    const seedProducts=initialData.productsBatidos;
    const insertPromises=[];
    seedProducts.forEach(seedProduct=>{
      seedProduct.categoryId=category.id;
      insertPromises.push(this.productsService.create(seedProduct, user, category.id));
    });
    await Promise.all(insertPromises)
    return true;
  }  


  private async insertNewProductsDigestion(user: User, category: Category){
    const seedProducts=initialData.productsDigestivos;
    const insertPromises=[];
    seedProducts.forEach(seedProduct=>{
      seedProduct.categoryId=category.id;
      insertPromises.push(this.productsService.create(seedProduct, user, category.id));
    });
    await Promise.all(insertPromises)
    return true;
  }  
}