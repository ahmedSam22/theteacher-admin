import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http:HttpClient) { }




  // Banner
  
  allBanners(){
    return this.http.get(`${environment.endpoint}/user/banners/all`)
  }
  addBanner(image){
    const formData:FormData = new FormData()
    formData.append('image',image)
    return this.http.post(`${environment.endpoint}/admin/banner/create`,formData)
  }
  deleteBanner(Banner_id){
    return this.http.delete(`${environment.endpoint}/admin/banner/delete?banner_id=${Banner_id}`)
  }



  // Tag
  
  allTags(){
    return this.http.get(`${environment.endpoint}/user/home-tags/all`)
  }
  addTag(f){
    const formData:FormData = new FormData()
    formData.append('name_en',f.name_en)
    formData.append('name_ar',f.name_ar)
    return this.http.post(`${environment.endpoint}/admin/home-tag/create`,formData)
  }
  deleteTag(Tag_id){
    return this.http.delete(`${environment.endpoint}/admin/home-tag/delete?home_tag_id=${Tag_id}`)
  }


  // vouchers
  
  allVouchers(){
    return this.http.get(`${environment.endpoint}/admin/vouchers/all`)
  }
  addVoucher(f){

    const formData:FormData = new FormData()
    formData.append('name',f.name)
    formData.append('discount_percentage',f.discount)
    return this.http.post(`${environment.endpoint}/admin/voucher/create`,formData)
  }
  deleteVoucher(voucher_id){
    return this.http.delete(`${environment.endpoint}/admin/voucher/delete?voucher_id=${voucher_id}`)
  }







  //All Users
  allUsers(status_id){
    return this.http.get(`${environment.endpoint}/admin/show/clients?status_id=${status_id}`)
  }
  deleteUser(user_id){
    return this.http.delete(`${environment.endpoint}/admin/users/delete?user_id=${user_id}`)
  }
  blockUser(user_id){
    const formData:FormData = new FormData()
    formData.append('user_id',user_id)
    return this.http.post(`${environment.endpoint}/admin/block-user`,formData)
  }
  unblockUser(user_id){
    const formData:FormData = new FormData()
    formData.append('user_id',user_id)
    return this.http.post(`${environment.endpoint}/admin/unblock-user`,formData)
  }
  


  //All Providers
  allProviders(status_id){
    return this.http.get(`${environment.endpoint}/admin/show/providers?status_id=${status_id}`)
  }
  deleteProvider(user_id){
    return this.http.delete(`${environment.endpoint}/admin/users/delete?user_id=${user_id}`)
  }
  blockProvider(user_id){
    const formData:FormData = new FormData()
    formData.append('user_id',user_id)
    return this.http.post(`${environment.endpoint}/admin/block-user`,formData)
  }
  acceptProvider(user_id){
    const formData:FormData = new FormData()
    formData.append('user_id',user_id)
    return this.http.post(`${environment.endpoint}/admin/accept-provider`,formData)
  }
  rejectProvider(user_id){
    const formData:FormData = new FormData()
    formData.append('user_id',user_id)
    return this.http.post(`${environment.endpoint}/admin/reject-provider`,formData)
  }


  

  //All orders
  allOrders(special,progress){
    return this.http.get(`${environment.endpoint}/admin/projects/show/filter?is_special=${special}&progress=${progress}`)
  }

  //All Countries
  allCountries(){
    return this.http.get(`${environment.endpoint}/admin/countries`)
  }
  addCountry(form){
    const formData:FormData = new FormData()
    formData.append('name',form.country)
    return this.http.post(`${environment.endpoint}/admin/countries`,formData)
  
  }
  deleteCountry(country){
    return this.http.delete(`${environment.endpoint}/admin/countries/${country}`)
  }


  //All Cities
  allCities(){
    return this.http.get(`${environment.endpoint}/admin/cities`)
  }
  addCity(form){
    const formData:FormData = new FormData()
    formData.append('country_id',form.country)
    formData.append('name',form.city)
    return this.http.post(`${environment.endpoint}/admin/cities`,formData)
  }
  deleteCity(city){
    return this.http.delete(`${environment.endpoint}/admin/cities/${city}`)
  }

    // Category

    allCategories(){
      return this.http.get(`${environment.endpoint}/categories`)
    }
    addCategory(f){
      const formData:FormData = new FormData()
      formData.append('name',f.name_en)
      formData.append('name_ar',f.name_ar)
      formData.append('image',f.image)
      return this.http.post(`${environment.endpoint}/admin/category/add`,formData)
    }
    deleteCategory(category_id){
      return this.http.delete(`${environment.endpoint}/admin/category/delete?category_id=${category_id}`)
    }

}
