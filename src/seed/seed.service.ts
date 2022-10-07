import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/category.entity';
import { AuthService } from '../auth/auth.service';
import { deleteImageCloudinary } from 'src/files/helpers/uploadImageCloudinary';


@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly authService: AuthService,

    @InjectRepository(User) //Inyectamos repositorio para poder borrar los usuarios
    private readonly userRepository: Repository<User>,

    @InjectRepository(Category) //Inyectamos repositorio para poder borrar los usuarios
    private readonly categorieRepository: Repository<Category>
  ){}


  async runSeed() {
    await this.deleteActualImagesCloudinary();
    await this.deleteTables();
    const users=await this.insertUsers();
    const categories=await this.insertCategories(users[1]);
    await this.insertNewProductsNutrition(users[1], categories[0]);
    await this.insertNewProductsDigestion(users[2], categories[1]);
    await this.insertNewProductsTeas(users[1], categories[2]);
    await this.insertNewProductsOthers(users[2], categories[3]);
    await this.insertImagesProducts(users);
    await this.insertImagesUsers();
    return `Seed Excuted`;
  }


  private async deleteActualImagesCloudinary(){
    const users=await this.authService.findAll({limit:100})
    const products=await this.productsService.findAll({limit:100});
    users.forEach(async (user)=>await deleteImageCloudinary(user.image));
    products.forEach(async (product)=>await deleteImageCloudinary(product.image));
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
      categories.push(this.categorieRepository.create({...category, user}))
    });
    const dbCategories=await this.categorieRepository.save(categories)
    return dbCategories
  }



  private async insertNewProductsNutrition(user: User, category: Category){
    await this.productsService.deleteAllProductos();
    const seedProducts=initialData.productsNutrition;
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


  private async insertNewProductsTeas(user: User, category: Category){
    const seedProducts=initialData.productsTeas;
    const insertPromises=[];
    seedProducts.forEach(seedProduct=>{
      seedProduct.categoryId=category.id;
      insertPromises.push(this.productsService.create(seedProduct, user, category.id));
    });
    await Promise.all(insertPromises)
    return true;
  }  


  private async insertNewProductsOthers(user: User, category: Category){
    const seedProducts=initialData.productsOthers;
    const insertPromises=[];
    seedProducts.forEach(seedProduct=>{
      seedProduct.categoryId=category.id;
      insertPromises.push(this.productsService.create(seedProduct, user, category.id));
    });
    await Promise.all(insertPromises)
    return true;
  }  


  private async insertImagesProducts(users){
    const products= await this.productsService.findAll({limit:100})
    let a=1;
    products.forEach(async (product) => {        
      const path=process.env.HOST_API+'/files/product/'+product.image
      a==1 ? a=2 :a=1
      await this.productsService.update(product.id, {image: path}, users[a])
    });
    return true;
  }


  private async insertImagesUsers(){
    const users= await this.authService.findAll({limit:100})
    let a=1;
    users.forEach(async (user) => {        
      const path=process.env.HOST_API+'/files/user/'+user.image
      a==1 ? a=2 :a=1
      await this.authService.update(user.id, {image: path})
    });
    return true;
  }
}