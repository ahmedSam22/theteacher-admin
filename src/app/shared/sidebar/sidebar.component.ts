import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
declare var $,jQuery:any

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  constructor(private service:GlobalService, private spinner:NgxSpinnerService,private router:Router) {}
  categories:any =[]
  category_param :any 
  brands:any=[]
  brand_param:any
  models:any=[]
  model_param:any ;
  subcategories:any=[]
  sub_param:any ;
  ngOnInit(): void {
      // left sidebar and vertical menu
      if ($('#pageWrapper').hasClass('compact-wrapper')) {
        jQuery('.sidebar-title').append('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
        jQuery('.sidebar-title').click(function () {
            jQuery('.sidebar-title').removeClass('active').find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
            jQuery('.sidebar-submenu, .menu-content').slideUp('normal');
            jQuery('.menu-content').slideUp('normal');
            if (jQuery(this).next().is(':hidden') == true) {
                jQuery(this).addClass('active');
                jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-down"></i></div>');
                jQuery(this).next().slideDown('normal');
            } else {
                jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
            }
        });
        jQuery('.sidebar-submenu, .menu-content').hide();
        jQuery('.submenu-title').append('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
        jQuery('.submenu-title').click(function () {
            jQuery('.submenu-title').removeClass('active').find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
            jQuery('.submenu-content').slideUp('normal');
            if (jQuery(this).next().is(':hidden') == true) {
                jQuery(this).addClass('active');
                jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-down"></i></div>');
                jQuery(this).next().slideDown('normal');
            } else {
                jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
            }
        });
        jQuery('.submenu-content').hide();
      } else if ($('#pageWrapper').hasClass('horizontal-wrapper')) {
        var contentwidth = jQuery(window).width();
        if ((contentwidth) < '992') {
            $('#pageWrapper').removeClass('horizontal-wrapper').addClass('compact-wrapper');
            $('.page-body-wrapper').removeClass('horizontal-menu').addClass('sidebar-icon');
            jQuery('.submenu-title').append('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
            jQuery('.submenu-title').click(function () {
                jQuery('.submenu-title').removeClass('active');
                jQuery('.submenu-title').find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
                jQuery('.submenu-content').slideUp('normal');
                if (jQuery(this).next().is(':hidden') == true) {
                    jQuery(this).addClass('active');
                    jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-down"></i></div>');
                    jQuery(this).next().slideDown('normal');
                } else {
                    jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
                }
            });
            jQuery('.submenu-content').hide();
  
            jQuery('.sidebar-title').append('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
            jQuery('.sidebar-title').click(function () {
                jQuery('.sidebar-title').removeClass('active');
                jQuery('.sidebar-title').find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
                jQuery('.sidebar-submenu, .menu-content').slideUp('normal');
                if (jQuery(this).next().is(':hidden') == true) {
                    jQuery(this).addClass('active');
                    jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-down"></i></div>');
                    jQuery(this).next().slideDown('normal');
                } else {
                    jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
                }
            });
            jQuery('.sidebar-submenu, .menu-content').hide();
        }
      }

      //get all categories
      // this.categoryList()
      //get all brands
      this.getAllBrands()
   }
  
    //get all categories
  // categoryList(){
  //   this.service.allCategories().subscribe((res:any)=>{
  //     this.categories = res['data']
  //     this.categories=[...this.categories].reverse()
  //     console.log("All Categories" ,this.categories)
  //     this.category_param=this.categories[0].id
  //     this.getAllSubcategories(this.category_param)
  //   })
  // }

 
  // getAllSubcategories(category_id){
  //   this.service.getSubcategoryByCategoryId(category_id).subscribe((res:any)=>{
  //     this.subcategories=res['data']
  //     this.subcategories=[...this.subcategories].reverse()
  //     console.log("All SubCategories" , this.subcategories)
  //     this.sub_param=this.subcategories[0].id
  //    })
  // }

  getAllBrands(){
    this.service.getBrands().subscribe((res:any)=>{ 
      this.brands=res['data'] ;
      this.brands=[...this.brands].reverse()
      console.log("All Brands" , this.brands)
      this.brand_param= this.brands[0].id;
      this.getAllModels(this.brand_param)
    })
  }

  getAllModels(brand_id){
    this.service.getModelsByBrandId(brand_id).subscribe((res:any)=>{
      this.models=res['data']
      this.models=[...this.models].reverse()
      console.log("All Models" , this.models)
      this.model_param=this.models[0].id
     })
  }

  goListProducts(){
      this.router.navigate(['/app/products/lists',this.category_param,this.brand_param]);
 
   }
   
}
