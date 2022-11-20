import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http:HttpClient) { }
 //////////////////////////////// Upload Files ///////////////////////////////
 uploadFiles(f) {
  const formData:FormData = new FormData()
  console.log(f)
  for (let i = 0; i < f.files.length; i++) {
    formData.append('files['+i+']',f.files[i])
  }

  return this.http.post(`${environment.endpoint}/files/upload`,formData)
}
 ////////////////////////////////Category/////////////////////////////////////

  allCategories() {
    return this.http.get(`${environment.endpoint}/categories/all`)
  }

  addCategory(f) {
      const formData:FormData = new FormData()
      console.log(f)
      formData.append('name',f.name)
      formData.append('image',f.image)
      return this.http.post(`${environment.endpoint}/admin/category/create`,formData)
  }

  editCategory(f) {
      console.log('ss',f)
      const formData:FormData = new FormData()
      formData.append('name',f.name)
      formData.append('category_id',f.category_id) 
      if(f.image!=null){
        formData.append('image',f.image)
      }
      return this.http.post(`${environment.endpoint}/admin/category/update`,formData)
  }

  deleteCategory(category_id){
      console.log(category_id)
      const forms:FormData = new FormData();
      return this.http.delete(`${environment.endpoint}/admin/category/delete?category_id=${category_id}`)
  }

  //category details
  getCategoryById(category_id){
      return this.http.get(`${environment.endpoint}/category/show?category_id=${category_id}`)
   }

  //////////////////////////// SubCategory /////////////////////////////////
  
  addSubCategory(f){
      const formData:FormData = new FormData()
      formData.append('name',f.name)
      formData.append('category_id',f.category_id)
      return this.http.post(`${environment.endpoint}/admin/subcategory/create`,formData)
  }

  editSubCategory(f){
      const formData:FormData = new FormData()
      formData.append('name',f.name)
      formData.append('sub_category_id',f.sub_category_id)
      return this.http.post(`${environment.endpoint}/admin/subcategory/update`,f)
  }

  deleteSubCategory(sub_category_id){
      return this.http.delete(`${environment.endpoint}/admin/subcategory/delete?sub_category_id=${sub_category_id}`)
  }

  getSubcategoryByCategoryId(category_ids:any){
     const formData:FormData = new FormData()
      for (let i = 0; i < category_ids.length; i++) {
        formData.append('category_ids['+i+']',category_ids[i])
      }
      return this.http.post(`${environment.endpoint}/subcategories/all`,formData)
      // return this.http.get(`${environment.endpoint}/subcategories/all?category_id=${category_ids}`)
  }
  /////////////////////////Brands//////////////////////////////////
  getBrands(){
    return this.http.get(`${environment.endpoint}/brands/all`)
  }

  addBrand(f){
    const formdata:FormData = new FormData();
    formdata.append('logo_image',f.logo_image)
    formdata.append('name',f.name)
    formdata.append('description',f.description)
   
    return this.http.post(`${environment.endpoint}/admin/brand/create`,formdata)
  }

  editBrand(f){
     console.log("####",f.logo_image)
      const formData:FormData = new FormData();
       formData.append('name',f.name);
       formData.append('description',f.description);
       formData.append('brand_id',f.brand_id);
        if(f.logo_image!=null){
         formData.append('logo_image',f.logo_image);
        }
     
    return this.http.post(`${environment.endpoint}/admin/brand/update`,formData)
  }

  deleteBrand(brand_id){
   return this.http.delete(`${environment.endpoint}/admin/brand/delete?brand_id=${brand_id}`)
  }

  /////////////////////////Models//////////////////////////////////

  getModelsByBrandId(brand_ids){
    // return this.http.get(`${environment.endpoint}/models/all?brand_id=${brand_id}`)
   
    const formData:FormData = new FormData()
    for (let i = 0; i < brand_ids.length; i++) {
      formData.append('brand_ids['+i+']',brand_ids[i])
    }
    return this.http.post(`${environment.endpoint}/models/all`,formData)
  }

  addModels(f){
    const formdata:FormData = new FormData();
    formdata.append('brand_id',f.brand_id);
    formdata.append('name',f.name)
  
    return this.http.post(`${environment.endpoint}/admin/model/create`,formdata)
  }

  editModels(f){
      const formData:FormData = new FormData();
      formData.append('model_id',f.model_id);
      formData.append('name',f.name);
   
    return this.http.post(`${environment.endpoint}/admin/model/update`,formData)
  }

  deleteModels(model_id){
   return this.http.delete(`${environment.endpoint}/admin/model/delete?model_id=${model_id}`)
  }
  
//////////////////////////// Manufacture Date /////////////////////////////
allYears(){
  return this.http.get(`${environment.endpoint}/manufacture-dates/all`);
}

addYear(f){
  const formData:FormData = new FormData();
  formData.append('date',f.date);
  return this.http.post(`${environment.endpoint}/admin/manufacture-date/create`, formData);
}

editYear(f){
  const formData:FormData = new FormData();
  formData.append('date',f.date);
  formData.append('manufacture_date_id',f.manufacture_date_id);
  return this.http.post(`${environment.endpoint}/admin/manufacture-date/update`, formData);
}

deleteYear(manufacture_date_id){
  return this.http.delete(`${environment.endpoint}/admin/manufacture-date/delete?manufacture_date_id=${manufacture_date_id}`);
}
////////////////////////////////Products ///////////////////////////////
  
  filterProduct(form) {
    const formData:FormData = new FormData()
      let notNullValue;
    // let i=0;
     for(let prop in form) {
       //console.log(i);
       if(form[prop].length!=0){
        // i++;
         notNullValue = {[prop]: form[prop]}
         //console.log(notNullValue)
         console.log("prop", prop ,...form[prop] )
         formData.append(prop +'['+0+']',form[prop])
       }
     }
      return this.http.post(`${environment.endpoint}/products/filter`,formData)
  }

  addProducts(f){
    const formData:FormData = new FormData()
    console.log("sf",f.subcategories)
    console.log("mf",f.models)
    // debugger;
    console.log(f)
    formData.append('image',f.image)
    formData.append('name',f.name)
    formData.append('description',f.description)
    formData.append('price',f.price)
    formData.append('discount_percent',f.discount_percent)
    formData.append('piece_number',f.piece_number)
    formData.append('manufacture_place',f.manufacture_place)
    formData.append('manufacture_date_id',f.manufacture_date_id)

    formData.append('subcategory_ids',f.subcategories)
    formData.append('model_ids',f.models)
    
    // description_images
    for (let i = 0; i < f.desc_images.length; i++) {
      formData.append('description_images['+i+']',f.desc_images[i])
      }

    // categories
    for (let i = 0; i < f.categories.length; i++) {
        formData.append('category_ids['+i+']',f.categories[i])
      }
 
    //brands
    for (let i = 0; i < f.brands.length; i++) {
      formData.append('brand_ids['+i+']',f.brands[i])
    }
 
    //product_compatibles_model_ids
       for (let i = 0; i < f.product_compatibles.length; i++) {
        formData.append('product_compatibles_model_ids['+i+']',f.product_compatibles[i])
      }
     
    //product_compatibles_manufacture_date 
      for (let i = 0; i < f.product_compatibles_date.length; i++) {
        formData.append('product_compatibles_manufacture_date_ids['+i+']',f.product_compatibles_date[i])
      }

    return this.http.post(`${environment.endpoint}/admin/product/create`,formData)
  } 

  editProducts(f){
    const formData:FormData = new FormData()
    console.log("sf",f.subcategories)
    console.log("mf",f.models)
    // debugger;
    console.log(f)
    formData.append('image',f.image)
    formData.append('product_id',f.product_id)
    formData.append('name',f.name)
    formData.append('description',f.description)
    formData.append('price',f.price)
    formData.append('discount_percent',f.discount_percent)
    formData.append('piece_number',f.piece_number)
    formData.append('manufacture_place',f.manufacture_place)
    formData.append('manufacture_date_id',f.manufacture_date_id)

    formData.append('subcategory_ids',f.subcategories)
    formData.append('model_ids',f.models)
    
    // description_images
    if(f.desc_images.length!=0){
      for (let i = 0; i < f.desc_images.length; i++) {
        formData.append('description_images['+i+']',f.desc_images[i])
        }
    }
    
    // categories
    for (let i = 0; i < f.categories.length; i++) {
        formData.append('category_ids['+i+']',f.categories[i])
      }
 
    //brands
    for (let i = 0; i < f.brands.length; i++) {
      formData.append('brand_ids['+i+']',f.brands[i])
    }
 
    //product_compatibles_model_ids
       for (let i = 0; i < f.product_compatibles.length; i++) {
        formData.append('product_compatibles_model_ids['+i+']',f.product_compatibles[i])
      }
     
    //product_compatibles_manufacture_date 
      for (let i = 0; i < f.product_compatibles_date.length; i++) {
        formData.append('product_compatibles_manufacture_date_ids['+i+']',f.product_compatibles_date[i])
      }
      return this.http.post(`${environment.endpoint}/admin/product/update`,formData)
  }
  
  deleteProducts(product_id){
    return this.http.delete(`${environment.endpoint}/admin/product/delete?product_id=${product_id}`);
  }
  ////////////////////////////////SCAR Products ///////////////////////////////



 //////////////////////////////////Cities //////////////////////////////////
    allSubCategories(){
      return this.http.get(`${environment.endpoint}/secondary-specialists`)
    }
    allCities(){
      return this.http.get(`${environment.endpoint}/city`)
    }
    
    addCity(f){
      return this.http.post(`${environment.endpoint}/city/create`,f)
    }
    editCity(f){
      return this.http.post(`${environment.endpoint}/city/update`,f)
    }
    deleteCity(city_id){
      return this.http.get(`${environment.endpoint}/city/delete?city_id=${city_id}`)
    }

    //banners

    allBanners(){
      return this.http.get(`${environment.endpoint}/banners`)
    }
    addBanner(f){
      const formData:FormData = new FormData()


      formData.append('image',f.image)
      return this.http.post(`${environment.endpoint}/banners/create`,formData)
    }
    editBanner(f){
      console.log(f)
      const formData:FormData = new FormData()
     
      formData.append('banner_id',f.banner_id)

      formData.append('image',f.image)
      return this.http.post(`${environment.endpoint}/banners/edit`,formData)
    }
    deleteBanner(banner_id){
      console.log(banner_id)
      return this.http.get(`${environment.endpoint}/banners/delete?banner_id=${banner_id}`)
    }

 
    allProducts(){
      return this.http.get(`${environment.endpoint}/products`)
    }


    //All Users
  allUsers(active){
    return this.http.get(`${environment.endpoint}/users?type=1&active=${active}`)
  }
 
  changeUserStatus(user_id,active_id){
    // const formData:FormData = new FormData()
    // formData.append('user_id',user_id)
    // formData.append('active_id',active_id)
    console.log('hello fro change',user_id,active_id)
    // ${environment.endpoint}/users?type=2&active=${active}
    return this.http.get(`${environment.endpoint}/users/active?user_id=${user_id}&active=${active_id}`)
  }
  //////////////////////////Taxes /////////////////////////////////
  editTaxes(f){
    return this.http.post(`${environment.endpoint}/settings/update`,f)
  }
  AllTaxes(){
    return this.http.get(`${environment.endpoint}/settings`)
  }
 

  // Exposed Questions
  questionsList() {
    return this.http.get(`${environment.endpoint}/frequent-questions`);
  }
  addQuestion(questionData) {
    return this.http.post(`${environment.endpoint}/frequent-questions/create`, questionData);
  }
  updateQuestion(questionObj) {
    return this.http.post(`${environment.endpoint}/frequent-questions/update`, questionObj);
  }
  deleteQuestion(question_id) {
    return this.http.get(`${environment.endpoint}/frequent-questions/delete?question_id=${question_id}`);
  }

  // Add Model
  addModel(modelData) {
    return this.http.post(`${environment.endpoint}/types/create`, modelData);
  }
  allModels() {
    return this.http.get(`${environment.endpoint}/types`);
  }
  updateModel(updatedModel) {
    return this.http.post(`${environment.endpoint}/types/update`, updatedModel);
  }
  deleteModel(model_id) {
    return this.http.get(`${environment.endpoint}/types/delete?type_id=${model_id}`);
  }

  //clients 
  getClients(){
    return this.http.get(`${environment.endpoint}/clients`);

  }
  //maintainers
  getMaintainers(active_status){
    return this.http.get(`${environment.endpoint}/maintainers?active=${active_status}`);

  }
  changeMaintainerStatus(id,active){

    return this.http.get(`${environment.endpoint}/maintainers/active?maintainer_id=${id}&active=${active}`);

  }
  //deliveries 
  getDeliveries(status){
   
    return this.http.get(`${environment.endpoint}/deliveries?active=${status}`);

  }
  changeDeliveriesStatus(id,active){

    return this.http.get(`${environment.endpoint}/deliveries/active?delivery_user_id=${id}&active=${active}`);

  }
  addSubCategoryValue(f){
    return this.http.post(`${environment.endpoint}/secondary-specialists-values/create`, f);

  }
  deletesubcatvalue(id){
    return this.http.get(`${environment.endpoint}/secondary-specialists-values/delete?secondary_specialist_value_id=${id}`);

  }
 
 
//////////////////////////Band ///////////////////////////
addBand(f){
  return this.http.post(`${environment.endpoint}/secondary-specialists-values/create`, f);
}
///////////////////////////Color/////////////////////////////
addColor(f){
  return this.http.post(`${environment.endpoint}/colors/create`, f);
}
allColors(){
  return this.http.get(`${environment.endpoint}/colors`);  
}
deleteColor(id){
 return this.http.get(`${environment.endpoint}/colors/delete?color_id=${id}`);
}
////////////////////////////////Terms Of Conditions //////////////////////////////////////
addTermsFiles(f){
  return this.http.post(`${environment.endpoint}/settings/update-files`, f);
}
//////////////////////////////////Prices ///////////////////////////
allPrices(){
  return this.http.get(`${environment.endpoint}/prices`); 
}
editPrices(f){
  return this.http.post(`${environment.endpoint}/prices/edit`, f);
}
/////////////////////////////////////////////////////////////////
getMainSpecialistByBrandId(ids){
  return this.http.get(`${environment.endpoint}/main-specialists?brands[0]=${ids}`);
}
/////////////////////////////////////////////////////////
 
getAllFiles(){
   return this.http.get(`${environment.endpoint}/settings`); 
}
 


/////////////////////////////////////////////////////////

  //All orders
  allOrders(type){
    return this.http.get(`${environment.endpoint}/orders?status_id=${type}`)
   }
//////////////////////


editMaintain(f){}
addMaintain(f){}
getComp(type){}


  }

    //models
  //   for (let index = 0; index < f.models.length; index++) {
  //     // const element = array[index];
  //  //   console.log(f.models[index])
  //   formData.append('model_ids['+f.models[index][0]+']['+index+']', f.models[index][1])
      
  //   }

  
    // for(var i = 0; i < f.models.length; i++) {
    //   var cube = f.models[i];
    //   for(var j = 0; j < cube.length; j++) {
    //     formData.append('model_ids['+i+']['+j+']',cube[j])
    //   }
    // }
     
  // }

  

     
      ////////////////////////////////////////////////////////////////////////////////////////
   
    // subcategories
    // for (let index = 0; index < f.subcategories.length; index++) {
    // formData.append('subcategory_ids['+f.subcategorie=s[index][0]+']['+index+']', f.subcategories[index][1])  
    // }

    // for(var i = 0; i < f.subcategories.length; i++) {
    //   var cube = f.subcategories[i];
    //   for(var j = 0; j < cube.length; j++) {
    //     formData.append('subcategory_ids['+i+']['+j+']',cube[j])
    //   }
    // }
    // var array1 = [false, 0, "Juice", -1],
    // array2 = ["35", "17", "21", "99"],
    // result = [],
    // s ;
   
    // for(var i=0 ; i<f.subcategories.length; i++ ) {
      
    // }

// for ( var i = 0; i < f.subcategories.length; i++ ) {
//   if( f.subcategories[i].cat== f.subcategories[i+1]?.cat && f.subcategories.length!=0){
//     result.push( [ f.subcategories[i].sub ,1] );
//   }
//   else if( f.subcategories[i].cat!= f.subcategories[i+1]?.cat && i==0){
//     result.push( [ f.subcategories[i].sub ,1] );
//   }

// }
 
// for(var i = 0; i < result.length; i++) {
//   var cube = result[i];
//   for(var j = 0; j < cube.length; j++) {
//     s= cube[j]
//     console.log("cube[" + (i) + "][" + (j) + "] = " , s);

//   }

// }
 
  //   for(var i = 0; i < f.categories.length; i++) {
  
  //     for(var j = 0; j < f.subcategories.length; j++) {
  //       if( f.subcategories[i]?.cat == f.subcategories[i+1]?.cat ){
  //       formData.append('subcategory_ids['+i+']['+j+']',f.subcategories[i].sub)
  //       console.log("equal" )
  //      }
  //      else {
  //       formData.append('subcategory_ids['+i+']['+j+']',f.subcategories[i].sub)
  //       console.log("not equal" )
  //       break;
        
  //      }
       
  //    } 
  // }
 