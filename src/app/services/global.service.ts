import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http:HttpClient) { }



  //All orders
  allOrders(status_id){
    return this.http.get(`${environment.endpoint}/backend/orders/all?status_id=${status_id}`)
  }

    // Category

    allCategories(){
      return this.http.get(`${environment.endpoint}/categories`)
    }
    addCategory(f){
      const formData:FormData = new FormData()
      formData.append('name_en',f.name_en)
      formData.append('name_ar',f.name_ar)
      formData.append('image',f.image)
      return this.http.post(`${environment.endpoint}/backend/categories/create`,formData)
    }
    editCategory(f){
      const formData:FormData = new FormData()
      formData.append('name_en',f.name_en)
      formData.append('name_ar',f.name_ar)
      formData.append('image',f.image)
      formData.append('category_id',f.category_id)
      return this.http.post(`${environment.endpoint}/backend/categories/edit`,formData)
    }
    deleteCategory(category_id){
      return this.http.delete(`${environment.endpoint}/backend/categories/delete?category_id=${category_id}`)
    }

    // SubCategory

    allSubCategories(){
      return this.http.get(`${environment.endpoint}/backend/subcategories/all`)
    }
    addSubCategory(f){
      const formData:FormData = new FormData()
      formData.append('name_en',f.name_en)
      formData.append('name_ar',f.name_ar)
      formData.append('category_id',f.category_id)
      formData.append('image',f.image)
      return this.http.post(`${environment.endpoint}/backend/subcategories/create`,formData)
    }
    editSubCategory(f){
      const formData:FormData = new FormData()
      formData.append('name_en',f.name_en)
      formData.append('name_ar',f.name_ar)
      formData.append('category_id',f.category_id)
      formData.append('subcategory_id',f.subcategory_id)
      formData.append('image',f.image)
      return this.http.post(`${environment.endpoint}/backend/subcategories/edit`,formData)
    }
    deleteSubCategory(category_id){
      return this.http.delete(`${environment.endpoint}/backend/subcategories/delete?subcategory_id=${category_id}`)
    }



    // Products

    allProducts(){
      return this.http.get(`${environment.endpoint}/products`)
    }
    // addProduct(f){
    //   const formData:FormData = new FormData()
    //   formData.append('name_en',f.name_en)
    //   formData.append('name_ar',f.name_ar)
    //   formData.append('image',f.image)
    //   return this.http.post(`${environment.endpoint}/backend/categories/create`,formData)
    // }
    // deleteProduct(category_id){
    //   return this.http.delete(`${environment.endpoint}/backend/categories/delete?category_id=${category_id}`)
    // }


    //All Users
  allUsers(active){
    return this.http.get(`${environment.endpoint}/backend/users/all?type_id=1&active_id=${active}`)
  }

  allProviders(active){
    return this.http.get(`${environment.endpoint}/backend/users/all?type_id=2&active_id=${active}`)
  }
  // deleteUser(user_id){
  //   return this.http.delete(`${environment.endpoint}/admin/users/delete?user_id=${user_id}`)
  // }
  // blockUser(user_id){
  //   const formData:FormData = new FormData()
  //   formData.append('user_id',user_id)
  //   return this.http.post(`${environment.endpoint}/admin/block-user`,formData)
  // }
  // unblockUser(user_id){
  //   const formData:FormData = new FormData()
  //   formData.append('user_id',user_id)
  //   return this.http.post(`${environment.endpoint}/admin/unblock-user`,formData)
  // }
  
  //All Users
  allStores(active){
    return this.http.get(`${environment.endpoint}/backend/users/all?type_id=2&active=${active}`)
  }


  changeUserStatus(user_id,active_id){
    const formData:FormData = new FormData()
    formData.append('user_id',user_id)
    formData.append('active_id',active_id)
    return this.http.post(`${environment.endpoint}/backend/users/status/update`,formData)
  }

  // Colors

  allColors(){
    return this.http.get(`${environment.endpoint}/colors`)
  }
  addColor(form){
    const formData:FormData = new FormData()
    formData.append('name_en',form.name_en)
    formData.append('name_ar',form.name_ar)
    formData.append('code',form.code)
    return this.http.post(`${environment.endpoint}/backend/colors/create`,formData)
  }
  deleteColor(category_id){
    return this.http.delete(`${environment.endpoint}/backend/colors/delete?color_id=${category_id}`)
  }


  // Sizes

  allSizes(){
    return this.http.get(`${environment.endpoint}/sizes`)
  }
  addSize(f){
    const formData:FormData = new FormData()
    formData.append('name_en',f.name_en)
    formData.append('name_ar',f.name_ar)
    return this.http.post(`${environment.endpoint}/backend/sizes/create`,formData)
  }
  deleteSize(category_id){
    return this.http.delete(`${environment.endpoint}/backend/sizes/delete?size_id=${category_id}`)
  }
    
  // Occasions

  allOccasions(){
    return this.http.get(`${environment.endpoint}/occasions`)
  }
  addOccasions(f){
    const formData:FormData = new FormData()
    formData.append('name_en',f.name_en)
    formData.append('name_ar',f.name_ar)
    return this.http.post(`${environment.endpoint}/backend/occasion/create`,formData)
  }
  deleteOccasions(category_id){
    return this.http.delete(`${environment.endpoint}/backend/occasion/delete?occasion_id=${category_id}`)
  }

  // Occasions

  homeStatistics(){
    return this.http.get(`${environment.endpoint}/backend/reports/show`)
  }



  // Filter By User ID

  filterOrdersByuserId(user_id){
    return this.http.get(`${environment.endpoint}/backend/orders/show?user_id=${user_id}`)
  }

}
