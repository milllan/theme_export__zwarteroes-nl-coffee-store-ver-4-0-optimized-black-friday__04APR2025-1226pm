$(document).ready(function(){

  $('.close_arrow').click(function(){
    if($(window).width() < 767){
      $(".slide_popup").animate({"top":"-500px"}, "slow",function(){$(".slide_popup").hide();  $('.popup_overlay').hide()});
    }
    else{
    $(".slide_popup").animate({"right":"-400px"}, "slow",function(){$(".slide_popup").hide(); $('.popup_overlay').hide()});
    }  
  })

  /*$('.js-drawer-open-cart').click(function(){
    if($(window).width() < 768){
    $("#CartDrawer").animate({"top":"150px"}, "slow",function(){$("#CartDrawer").show();  $('html').addClass('js-drawer-open');});  
    }
  })
  
  $('.angle_mob_cart svg').click(function(){
    $("#CartDrawer").animate({"top":"-500px"}, "slow",function(){$("#CartDrawer").hide();  $('html').removeClass('js-drawer-open');  $('.popup_overlay').hide()});
 })*/

  $('.popup_overlay').click(function(){
    if($(window).width() < 767){
    $(".slide_popup").animate({"top":"-500px"}, "slow",function(){$(".slide_popup").hide();  $('.popup_overlay').hide()});
    }else{
    $(".slide_popup").animate({"right":"-400px"}, "slow",function(){$(".slide_popup").hide();  $('.popup_overlay').hide()});  
    }
  })
  
  $('.site_nav_icons').click(function(e){
    e.preventDefault();
     var gettype = $(this).attr('data-icontype');
  
    if(gettype === 'login')
      {
        $('#search').hide()
        $('#'+gettype).show();
        $('.new_login_btn').show();
      }
      else if(gettype === 'search')
      {
        $('#login').hide()
        $('#'+gettype).show();
        $('.new_login_btn').hide();
      }
      $('.popup_overlay').show();
    if($(window).width() < 767){
      $(".slide_popup").show().animate({"top":"100px"}, "slow");
    }
    else{
       $(".slide_popup").show().animate({"right":"0px"}, "slow");
    }
  })

  $('.btn_search').click(function(){
    let searchVal = $('.site-header__search-input').val();
    
    window.location.href= searchVal ? '/search?type=product%2Carticle%2Cpage%2Ccollection&q='+searchVal+'' : '/search';
  })
  
  $('.froms_redirects').click(function()
  {
    
    var getAttr = $(this).attr('data-redirect');
    var hideArr= $(this).attr('data-hiddenarea');
    
    if(getAttr === "register_form"){
      
      $('#CustomerLoginForm').hide();
      $('#RecoverPasswordForm').hide();
      $('.newcustomer_bottom').hide();
    }
    if(getAttr === 'CustomerLoginForm'){
      $('.newcustomer_bottom').show();
    }
    $('#'+hideArr).hide();
    $('#'+getAttr).show();
    
  })

  $('.variant-input').click(function(){
    setTimeout(function(){  
    
    let prices = $('[data-product-price]').text();
       $('.prodct_mob_price').html(prices);
    },1000);
   
  })
  $('.variant-input-wrap select').change(function(){
   
    setTimeout(function(){  
    
    let prices = $('[data-product-price]').text();
       $('.prodct_mob_price').html(prices);
    },1000);
   
  })

  //collection filter redirection:
  $('.collection_filter').change(function(e){
    e.preventDefault();
    var selectedVal = $(this).val();
    if(selectedVal == "/all"){
      window.location.href = '/collections/all';
    }
    else{
      window.location.href = "/collections/all/"+selectedVal+"";
    }
  })
 /* if($('body').hasClass('template-collection')){
    let links = window.location.href;
    links = links.split('all/')[1];
        if(links){
  let filterpr = links.split(':');
        //  $('#'+filterpr[0].split('__')[1]).val(""+links+"").trigger('change');
        
          return false;
        }
  }*/

  $('.count__like-icon svg').click(function()
  {
    let getCount = $('.count_2').data('count');
    let changeCount = parseInt(getCount);
    let getItem_local = localStorage.getItem("supportCount");
   
    let convrstr=''
    let htmlarr = [];
    
    if(getItem_local)
    {
      let updateItm = getItem_local;
      updateItm = parseInt(updateItm);
      let finitm = updateItm+1;
      finitm = finitm < 9999 ? '0'+finitm : finitm;
     
      localStorage.setItem("supportCount", finitm);  
      
      convrstr = finitm.toString().split("");
      
      let arr1=updateItm.toString().split("");
     
      checkdiff(convrstr,arr1);
    }
    else
    {
      let inc_count = changeCount+1;
      if(inc_count >= 10000){
      localStorage.setItem("supportCount", inc_count);  
      }
      else{
      
        localStorage.setItem("supportCount", '0'+inc_count);
        inc_count = '0'+inc_count;
      }
      
      let arrload = [];
      $('.count_2 span').each(function(){
        arrload.push($(this).html().trim());
      })
      let convstr = inc_count.toString().split("")
      checkdiff(convstr,arrload);
     
    }
    
    $('.count_2 span').each(function()
    {
      htmlarr.push($(this).html().trim());
    })
    
  
  })
  let getItem_local_load = localStorage.getItem("supportCount");
  
  if(getItem_local_load){
    let arrload = [];
    $('.count_2 span').each(function(){
      arrload.push($(this).html().trim());
    })
    let convstr = getItem_local_load.toString().split("")
    checkdiff(convstr,arrload);
  }else{
   
  }
})
function checkdiff(a1,a2){
  
   var result = [], longerLength = a1.length >= a2.length ? a1.length : a2.length;
    for (i = 0; i < longerLength; i++){
        if (a1[i] !== a2[i]) {
            result.push(i,a1[i]);
          
          $('.count_2 span').eq(i).html(a1[i]);
        }
    }
    return result;
}
