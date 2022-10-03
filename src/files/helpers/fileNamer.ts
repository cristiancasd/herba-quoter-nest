import {v4 as uuid} from 'uuid'

// La función tiene la estructura para que se permitido usar en el FileInterceptor
export const fileNamer=
    (temporalName: string)=>
{
    const fileExtension=temporalName.split('.')[1];
    const fileName=`${uuid()}.${fileExtension}`
    return fileName;
}
