//import * as bcrypt from 'bcrypt';
import {hashSync} from 'bcrypt'

interface SeedCategory {
    title: string,
    description: string
}

interface SeedProduct {
    title: string;
    pricepublic:number;
    price15:number;
    price25:number;
    price35:number;
    price42:number;
    price50:number;
    description: string;    
    image: string;    
    sku: string;   
    pv: number;
    categoryId:string;



   // type: ValidTypes;
    //gender: 'men'|'women'|'kid'|'unisex'
}

type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats';


interface SeedUser{
    
    email: string;
    password: string;
    fullname: string;
    rol: string;
    country: string;
    //profilephoto: string;
    herbalifelevel: string;
}

interface SeedData {
    users: SeedUser[];
    categories: SeedCategory[];
    products: SeedProduct[];
    productsBatidos: SeedProduct[];
    productsDigestivos: SeedProduct[];
}


export const initialData: SeedData = {

    users:[
        {
            email: 'user@test.com',
            fullname: 'Jaime Test',
            password: hashSync('Abc123',10),
            rol: 'user',
            country: 'Colombia',
            herbalifelevel: 'distribuidor-35'
        },
        {
            email: 'admin@test.com',
            fullname: 'Sofia admin Test',
            password: hashSync('Abc123',10),
            rol: 'admin',
            country: 'Italia',
            herbalifelevel: 'distribuidor-42'
        },
        {
            email: 'super-admin@test.com',
            fullname: 'Camilo super-admin test',
            password: hashSync('Abc123',10),
            rol: 'super-admin',
            country: 'Inglaterra',
            herbalifelevel: 'supervisor'
        },
    ],

    categories:[
        {
            title: 'Batidos Nutricionales',
            description: 'Ricas y saludables malteadas saludables'
        },
        {
            title: 'Salud Digestiva',
            description: 'Productos que te ayudaran a mejorar tu digestión'
        },
    ],
    products:[
        {
            title: 'Batido de Fresa',
            pricepublic: 132000,
            price15:114624,
            price25:103041,
            price35:91457,
            price42:83349,
            price50:74082,
            description: 'Con sabor a Fresas naturales',    
            image: 'enlace de imagen de batido de fresa',
            pv: 23.95,
            sku: 'ABC1', 
            categoryId:''

        },

        {
            title: 'Batido de Cookies',
            pricepublic: 132000,
            price15:114624,
            price25:103041,
            price35:91457,
            price42:83349,
            price50:74082,
            description: 'Con sabor a Galletas',    
            image: 'enlace de imagen de batido de galletas',
            pv: 23.95,
            sku: 'ABC2', 
            categoryId:''
        },

        {
            title: 'Batido de Banano',
            pricepublic: 132000,
            price15:114624,
            price25:103041,
            price35:91457,
            price42:83349,
            price50:74082,
            description: 'Con sabor a Bananos naturales',    
            image: 'enlace de imagen de batido de Banano',
            pv: 23.95,
            sku: 'ABC3', 
            categoryId:''
        },

        {
            title: 'Fibra Activa',
            pricepublic: 110000,
            price15:95521,
            price25:85868,
            price35:76215,
            price42:69458,
            price50:61735,
            description: 'Ayuda a tu transido digestivo',    
            image: 'enlace de imagen Fibra',
            pv: 22.95,
            sku: 'ABC4', 
            categoryId:''
        },

        {
            title: 'Herbal Aloe',
            pricepublic: 134000,
            price15:116361,
            price25:104602,
            price35:92844,
            price42:84612,
            price50:75205,
            description: 'Beneficios de la sabila para salud del colon',    
            image: 'enlace de imagen de Aloe',
            pv: 24.95,
            sku: 'ABC5', 
            categoryId:''
        },
    ],

    productsBatidos:[
        {
            title: 'Batido de Fresa',
            pricepublic: 132000,
            price15:114624,
            price25:103041,
            price35:91457,
            price42:83349,
            price50:74082,
            description: 'Con sabor a Fresas naturales',    
            image: 'enlace de imagen de batido de fresa',
            pv: 23.95,
            sku: 'ABC1', 
            categoryId:''

        },

        {
            title: 'Batido de Cookies',
            pricepublic: 132000,
            price15:114624,
            price25:103041,
            price35:91457,
            price42:83349,
            price50:74082,
            description: 'Con sabor a Galletas',    
            image: 'enlace de imagen de batido de galletas',
            pv: 23.95,
            sku: 'ABC2', 
            categoryId:''
        },

        {
            title: 'Batido de Banano',
            pricepublic: 132000,
            price15:114624,
            price25:103041,
            price35:91457,
            price42:83349,
            price50:74082,
            description: 'Con sabor a Bananos naturales',    
            image: 'enlace de imagen de batido de Banano',
            pv: 23.95,
            sku: 'ABC3', 
            categoryId:''
        },
    ],



    productsDigestivos:[
   

        {
            title: 'Fibra Activa',
            pricepublic: 110000,
            price15:95521,
            price25:85868,
            price35:76215,
            price42:69458,
            price50:61735,
            description: 'Ayuda a tu transido digestivo',    
            image: 'enlace de imagen Fibra',
            pv: 22.95,
            sku: 'ABC4', 
            categoryId:''
        },

        {
            title: 'Herbal Aloe',
            pricepublic: 134000,
            price15:116361,
            price25:104602,
            price35:92844,
            price42:84612,
            price50:75205,
            description: 'Beneficios de la sabila para salud del colon',    
            image: 'enlace de imagen de Aloe',
            pv: 24.95,
            sku: 'ABC5', 
            categoryId:''
        },
    ],
}