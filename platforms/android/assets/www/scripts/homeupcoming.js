define(["datetime","scrollStyles"],function(e){function t(e){Dashboard.showLoadingMsg();var t={Limit:40,Fields:"AirTime,UserData,SeriesStudio,SyncInfo",UserId:Dashboard.getCurrentUserId(),ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb",EnableTotalRecordCount:0};ApiClient.getJSON(ApiClient.getUrl("Shows/Upcoming",t)).then(function(t){var r=t.Items;e.querySelector(".noItemsMessage").style.display=r.length?"none":"block";var a=e.querySelector("#upcomingItems");n(a,r),Dashboard.hideLoadingMsg()})}function r(){return browserInfo.mobile&&AppInfo.enableAppLayouts}function a(){return r()?"overflowBackdrop":"backdrop"}function n(t,n){var o,i,s=[],l="",c=[];for(o=0,i=n.length;i>o;o++){var d=n[o],m="";if(d.PremiereDate)try{var h=e.parseISO8601Date(d.PremiereDate,!0);m=h.getDate()==(new Date).getDate()-1?Globalize.translate("Yesterday"):LibraryBrowser.getFutureDateText(h,!0)}catch(u){}m!=l?(c.length&&s.push({name:l,items:c}),l=m,c=[d]):c.push(d)}var g="";for(o=0,i=s.length;i>o;o++){var p=s[o];g+='<div class="homePageSection">',g+='<h1 class="listHeader">'+p.name+"</h1>",g+=r()?'<div class="itemsContainer hiddenScrollX">':'<div class="itemsContainer">',g+=LibraryBrowser.getPosterViewHtml({items:p.items,showLocationTypeIndicator:!1,shape:a(),showTitle:!0,showPremiereDate:!0,preferThumb:!0,lazy:!0,showDetailsMenu:!0,centerText:!0,context:"home-upcoming",overlayMoreButton:!0}),g+="</div>",g+="</div>"}t.innerHTML=g,ImageLoader.lazyChildren(t)}return function(e,r,a){var n=this;n.renderTab=function(){t(a)}}});