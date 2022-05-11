import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http:HttpClient) { }



  //All orders
  allOrders(type){
    return this.http.get(`${environment.endpoint}/orders?status_id=${type}`)
  }

    // Category

    allCategories(){
      return this.http.get(`${environment.endpoint}/main-specialists`)
    }
    addCategory(f){
      const formData:FormData = new FormData()
      console.log(f)
      formData.append('affect_brand',f.affect_brand)
      formData.append('name_ar',f.name_ar)
      formData.append('name_en',f.name_en)
      formData.append('image',f.image)
        for (let i = 0; i < f.brands.length; i++) {
          formData.append('brands['+i+']',f.brands[i].id)
        }
      return this.http.post(`${environment.endpoint}/main-specialists/create`,formData)
    }
    editCategory(f){
      console.log('ss',f)
      const formData:FormData = new FormData()
      // formData.append('image',f.image)
      formData.append('name_ar',f.name_ar)
      formData.append('name_en',f.name_en)
      formData.append('main_specialist_id',f.main_specialist_id)
      formData.append('affect_brand',f.affect_brand)
      for (let i = 0; i < f.brands.length; i++) {
      //  formData.append('brands['+i+']',f.brands[i].id)
        formData.append('brands['+i+']',f.brands[i].brand_id)
      }
      // formData.append('name_en',f.name_en)
      // console.log('hello form',...formData)
      return this.http.post(`${environment.endpoint}/main-specialists/update`,formData)
    }
    deleteCategory(category_id){
      console.log(category_id)
      const forms:FormData = new FormData();
      forms.append('main_specialist_id',category_id)
      return this.http.get(`${environment.endpoint}/main-specialists/delete?main_specialist_id=${category_id}`)
    }
    getCategoryById(id){
      return this.http.get(`${environment.endpoint}/main-specialists/show?main_specialist_id=${id}`)

    }

    //////////////////////////// SubCategory /////////////////////////////////

    allSubCategories(){
      return this.http.get(`${environment.endpoint}/secondary-specialists`)
    }
    // allSubCategories(main_id){
    //   return this.http.get(`${environment.endpoint}/secondary-specialists/delete?secondary_specialist_id=${main_id}`)
    // }
    addSubCategory(f){
      const formData:FormData = new FormData()
      formData.append('name_en',f.name_en)
      formData.append('name_ar',f.name_ar)
      formData.append('main_specialist_id',f.main_specialist_id)
      formData.append('type',f.type)
      return this.http.post(`${environment.endpoint}/secondary-specialists/create`,formData)
    }

    editSubCategory(f){
      const formData:FormData = new FormData()
      
      return this.http.post(`${environment.endpoint}/secondary-specialists/update`,f)
    
    }

    deleteSubCategory(category_id){
      return this.http.get(`${environment.endpoint}/secondary-specialists/delete?secondary_specialist_id=${category_id}`)
    }
    //////////////////////////////////Cities //////////////////////////////////

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




    // Products

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
  /////////////////////////Brands//////////////////////////////////
  getBrands(){
    return this.http.get(`${environment.endpoint}/brands`)

  }
  addBrand(f){
    const formdata:FormData = new FormData();
    formdata.append('image',f.image)
    formdata.append('name_en',f.name_en)
    formdata.append('name_ar',f.name_ar)
   
    return this.http.post(`${environment.endpoint}/brands/create`,formdata)

  }
  editBrand(f){
    console.log('edit brand golbal service ',f)
      const formData:FormData = new FormData();
      formData.append('brand_id',f.brand_id);
      formData.append('image',f.image);
      formData.append('name_ar',f.name_ar);
      formData.append('name_en',f.name_en);

    return this.http.post(`${environment.endpoint}/brands/update`,formData)
  }
  deleteBrand(brand_id){
    // const deletedCity:FormData= new FormData();
    // deletedCity.append('city_id',city_id)
    return this.http.get(`${environment.endpoint}/brands/delete?brand_id=${brand_id}`)
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
  //comp
  getComp(type){
    return this.http.get(`${environment.endpoint}/contacts?type=${type}`);

  }
  editMaintain(f){}
  addMaintain(f){}
  
//////////////////////////// Years Of Creation /////////////////////////////
  allYears(){
    return this.http.get(`${environment.endpoint}/years`);
  }
  addYear(f){
    return this.http.post(`${environment.endpoint}/years/create`, f);
  }
  editYear(f){
    return this.http.post(`${environment.endpoint}/years/update`, f);
  }
  deleteYear(id){
    return this.http.get(`${environment.endpoint}/years/delete?year_id=${id}`);

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
}
