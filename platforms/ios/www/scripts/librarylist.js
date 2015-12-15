!function(e,t,a){function r(e){var t=e.target;t.classList.contains("card")&&(N&&(clearTimeout(N),N=null),t=t.querySelector(".cardOverlayTarget"),t&&n(t))}function n(e){e.classList.contains("hide")||requestAnimationFrame(function(){var t=[{height:"100%",offset:0},{height:"0",offset:1}],a={duration:300,iterations:1,fill:"forwards",easing:"ease-out"};e.animate(t,a).onfinish=function(){e.classList.add("hide")}})}function i(e){e.classList.contains("hide")&&(e.classList.remove("hide"),requestAnimationFrame(function(){e.style.display="block";var t=[{height:"0",offset:0},{height:"100%",offset:1}],a={duration:300,iterations:1,fill:"forwards",easing:"ease-out"};e.animate(t,a)}))}function o(e,t,a,r){var n="";n+='<div class="cardOverlayInner">';var i=a.className.toLowerCase(),o=-1!=i.indexOf("mini"),s=o||-1!=i.indexOf("small"),l=-1!=i.indexOf("portrait"),c=(-1!=i.indexOf("square"),s||o||l?null:e.SeriesName),d=LibraryBrowser.getPosterViewDisplayName(e,!0);n+='<div style="margin-bottom:1em;">';var u,m=s||o?20:26;c&&e.ParentLogoItemId?(u=ApiClient.getScaledImageUrl(e.ParentLogoItemId,{maxHeight:m,type:"logo",tag:e.ParentLogoImageTag}),n+='<img src="'+u+'" style="max-height:'+m+'px;max-width:100%;" />'):e.ImageTags.Logo?(u=ApiClient.getScaledImageUrl(e.Id,{maxHeight:m,type:"logo",tag:e.ImageTags.Logo}),n+='<img src="'+u+'" style="max-height:'+m+'px;max-width:100%;" />'):n+=c||d,n+="</div>",c?(n+="<p>",n+=d,n+="</p>"):s||o||(n+='<p class="itemMiscInfo" style="white-space:nowrap;">',n+=LibraryBrowser.getMiscInfoHtml(e),n+="</p>"),o||(n+='<div style="margin:1em 0 .75em;">',l?(n+='<div class="itemCommunityRating">',n+=LibraryBrowser.getRatingHtml(e,!1),n+="</div>",n+='<div class="userDataIcons" style="margin:.5em 0 0em;">',n+=LibraryBrowser.getUserDataIconsHtml(e),n+="</div>"):(n+='<span class="itemCommunityRating" style="vertical-align:middle;">',n+=LibraryBrowser.getRatingHtml(e,!1),n+="</span>",n+='<span class="userDataIcons" style="vertical-align:middle;">',n+=LibraryBrowser.getUserDataIconsHtml(e),n+="</span>"),n+="</div>"),n+="<div>";var p=0;if(MediaController.canPlay(e)){var f=(e.UserData||{}).PlaybackPositionTicks||0;n+='<paper-icon-button icon="play-circle-outline" class="btnPlayItem" data-itemid="'+e.Id+'" data-itemtype="'+e.Type+'" data-isfolder="'+e.IsFolder+'" data-mediatype="'+e.MediaType+'" data-resumeposition="'+f+'"></paper-icon-button>',p++}return-1!=r.indexOf("trailer")&&(n+='<paper-icon-button icon="videocam" class="btnPlayTrailer" data-itemid="'+e.Id+'"></paper-icon-button>',p++),n+='<paper-icon-button icon="'+AppInfo.moreIcon+'" class="btnMoreCommands"></paper-icon-button>',p++,n+="</div>",n+="</div>"}function l(){var e=this.getAttribute("data-itemid");return ApiClient.getLocalTrailers(Dashboard.getCurrentUserId(),e).then(function(e){MediaController.play({items:e})}),!1}function c(){var e=this.getAttribute("data-itemid"),t=this.getAttribute("data-itemtype"),a="true"==this.getAttribute("data-isfolder"),r=this.getAttribute("data-mediatype"),n=parseInt(this.getAttribute("data-resumeposition"));return LibraryBrowser.showPlayMenu(this,e,t,a,r,n),!1}function d(){var t=e(this).parents(".card")[0];return m(t,{showPlayOptions:!1}),!1}function u(e){var t=b(e.target,"card");if(t){var a=t.querySelector(".itemSelectionPanel");return a||m(t,{}),e.preventDefault(),!1}}function m(t,r){var n=t;t.classList.contains("card")||t.classList.contains("listItem")||(t=e(t).parents(".listItem,.card")[0]);var i=t.getAttribute("data-itemid"),o=t.getAttribute("data-playlistitemid"),s=t.getAttribute("data-commands").split(","),l=t.getAttribute("data-itemtype"),c=t.getAttribute("data-mediatype"),d=parseInt(t.getAttribute("data-positionticks")||"0"),u=t.getAttribute("data-playaccess"),m=t.getAttribute("data-locationtype"),p=t.getAttribute("data-index"),f=t.getAttribute("data-albumid"),h=t.getAttribute("data-artistid");Dashboard.getCurrentUser().then(function(g){var b=[];-1!=s.indexOf("addtocollection")&&b.push({name:Globalize.translate("ButtonAddToCollection"),id:"addtocollection",ironIcon:"add"}),-1!=s.indexOf("playlist")&&b.push({name:Globalize.translate("ButtonAddToPlaylist"),id:"playlist",ironIcon:"playlist-add"}),-1!=s.indexOf("delete")&&b.push({name:Globalize.translate("ButtonDelete"),id:"delete",ironIcon:"delete"}),g.Policy.IsAdministrator&&-1!=s.indexOf("edit")&&b.push({name:Globalize.translate("ButtonEdit"),id:"edit",ironIcon:"mode-edit"}),-1!=s.indexOf("editimages")&&b.push({name:Globalize.translate("ButtonEditImages"),id:"editimages",ironIcon:"photo"}),-1!=s.indexOf("editsubtitles")&&b.push({name:Globalize.translate("ButtonEditSubtitles"),id:"editsubtitles",ironIcon:"closed-caption"}),-1!=s.indexOf("instantmix")&&b.push({name:Globalize.translate("ButtonInstantMix"),id:"instantmix",ironIcon:"shuffle"}),b.push({name:Globalize.translate("ButtonOpen"),id:"open",ironIcon:"folder-open"}),r.showPlayOptions!==!1&&(MediaController.canPlayByAttributes(l,c,u,m)&&(b.push({name:Globalize.translate("ButtonPlay"),id:"play",ironIcon:"play-arrow"}),-1!=s.indexOf("playfromhere")&&b.push({name:Globalize.translate("ButtonPlayAllFromHere"),id:"playallfromhere",ironIcon:"play-arrow"})),"Video"==c&&AppInfo.supportsExternalPlayers&&AppSettings.enableExternalPlayers()&&b.push({name:Globalize.translate("ButtonPlayExternalPlayer"),id:"externalplayer",ironIcon:"airplay"}),d&&"Audio"!=c&&b.push({name:Globalize.translate("ButtonResume"),id:"resume",ironIcon:"play-arrow"}),-1!=s.indexOf("trailer")&&b.push({name:Globalize.translate("ButtonPlayTrailer"),id:"trailer",ironIcon:"play-arrow"})),MediaController.canQueueMediaType(c,l)&&(b.push({name:Globalize.translate("ButtonQueue"),id:"queue",ironIcon:"playlist-add"}),-1!=s.indexOf("queuefromhere")&&b.push({name:Globalize.translate("ButtonQueueAllFromHere"),id:"queueallfromhere",ironIcon:"playlist-add"})),-1!=s.indexOf("shuffle")&&b.push({name:Globalize.translate("ButtonShuffle"),id:"shuffle",ironIcon:"shuffle"}),-1!=s.indexOf("record")&&b.push({name:Globalize.translate("ButtonRecord"),id:"record",ironIcon:"videocam"}),-1!=s.indexOf("removefromcollection")&&b.push({name:Globalize.translate("ButtonRemoveFromCollection"),id:"removefromcollection",ironIcon:"remove"}),-1!=s.indexOf("removefromplaylist")&&b.push({name:Globalize.translate("ButtonRemoveFromPlaylist"),id:"removefromplaylist",ironIcon:"remove"}),g.Policy.EnablePublicSharing&&b.push({name:Globalize.translate("ButtonShare"),id:"share",ironIcon:"share"}),-1!=s.indexOf("sync")&&b.push({name:Globalize.translate("ButtonSync"),id:"sync",ironIcon:"sync"}),f&&b.push({name:Globalize.translate("ButtonViewAlbum"),id:"album",ironIcon:"album"}),h&&b.push({name:Globalize.translate("ButtonViewArtist"),id:"artist",ironIcon:"person"});var v=t.getAttribute("data-href")||t.href;if(!v){var y=t.getElementsByTagName("a");y.length&&(v=y[0].href)}require(["actionsheet"],function(){ActionSheetElement.show({items:b,positionTo:n,callback:function(r){switch(r){case"addtocollection":require(["collectioneditor"],function(e){(new e).show([i])});break;case"playlist":PlaylistManager.showPanel([i]);break;case"delete":LibraryBrowser.deleteItem(i);break;case"download":var n=ApiClient.getUrl("Items/"+i+"/Download",{api_key:ApiClient.accessToken()});a.location.href=n;break;case"edit":LibraryBrowser.editMetadata(i);break;case"refresh":ApiClient.refreshItem(i,{Recursive:!0,ImageRefreshMode:"FullRefresh",MetadataRefreshMode:"FullRefresh",ReplaceAllImages:!1,ReplaceAllMetadata:!0});break;case"instantmix":MediaController.instantMix(i);break;case"shuffle":MediaController.shuffle(i);break;case"open":Dashboard.navigate(v);break;case"album":Dashboard.navigate("itemdetails.html?id="+f);break;case"record":Dashboard.navigate("livetvnewrecording.html?programid="+i);break;case"artist":Dashboard.navigate("itemdetails.html?context=music&id="+h);break;case"play":MediaController.play(i);break;case"playallfromhere":O(p,e(t).parents(".itemsContainer"),"play");break;case"queue":MediaController.queue(i);break;case"trailer":ApiClient.getLocalTrailers(Dashboard.getCurrentUserId(),i).then(function(e){MediaController.play({items:e})});break;case"resume":MediaController.play({ids:[i],startPositionTicks:d});break;case"queueallfromhere":O(p,e(t).parents(".itemsContainer"),"queue");break;case"sync":SyncManager.showMenu({items:[{Id:i}]});break;case"editsubtitles":LibraryBrowser.editSubtitles(i);break;case"editimages":LibraryBrowser.editImages(i);break;case"externalplayer":LibraryBrowser.playInExternalPlayer(i);break;case"share":require(["sharingmanager"],function(){SharingManager.showMenu(Dashboard.getCurrentUserId(),i)});break;case"removefromplaylist":e(t).parents(".itemsContainer").trigger("removefromplaylist",[o]);break;case"removefromcollection":e(t).parents(".collectionItems").trigger("removefromcollection",[i])}}})})})}function p(t,a){var r=t.target;r.classList.contains("card")||r.classList.contains("listItem")||(r=e(r).parents(".listItem,.card")[0]);var n=r.getAttribute("data-itemid"),i=r.getAttribute("data-itemtype"),o="true"==r.getAttribute("data-isfolder"),s=r.getAttribute("data-mediatype"),l=parseInt(r.getAttribute("data-positionticks"));return("MusicAlbum"==i||"MusicArtist"==i||"MusicGenre"==i||"Playlist"==i)&&(o=!0),"Program"==i&&(n=r.getAttribute("data-channelid")),LibraryBrowser.showPlayMenu(a,n,i,o,s,l),t.preventDefault(),!1}function f(e){for(;null!=e;){var t=e.tagName||"";return"A"==t||-1!=t.indexOf("BUTTON")||-1!=t.indexOf("INPUT")?!0:!1}return!1}function h(e){var t=b(e.target,"cardOverlayPlayButton");if(t)return p(e,t);var a=b(e.target,"listviewMenuButton")||b(e.target,"cardOverlayMoreButton");if(a)return m(a,{}),e.preventDefault(),!1;var r=b(e.target,"card");if(r){var n=r.querySelector(".itemSelectionPanel");if(n)return L(e,n);if(r.classList.contains("groupedCard"))return g(e,r)}}function g(t,a){var r=a.getAttribute("data-itemid"),n=a.getAttribute("data-context"),i=Dashboard.getCurrentUserId(),o={Limit:parseInt(e(".playedIndicator",a).html()||"10"),Fields:"PrimaryImageAspectRatio,DateCreated",ParentId:r,GroupItems:!1},s=t.target;return f(s)?void 0:(ApiClient.getJSON(ApiClient.getUrl("Users/"+i+"/Items/Latest",o)).then(function(e){if(1==e.length)return void Dashboard.navigate(LibraryBrowser.getHref(e[0],n));var t="itemdetails.html?id="+r;n&&(t+="&context="+n),Dashboard.navigate(t)}),t.stopPropagation(),t.preventDefault(),!1)}function b(e,t){for(;!e.classList||!e.classList.contains(t);)if(e=e.parentNode,!e)return null;return e}function v(e){if(e.classList.contains("itemsContainer"))return void y(e);for(var t=e.querySelectorAll(".itemsContainer"),a=0,r=t.length;r>a;a++)y(t[a])}function y(e){LibraryBrowser.allowSwipe(e)&&(e.classList.contains("hasTapHold")||(require(["hammer"],function(t){var a=new t(e);e.classList.add("hasTapHold"),a.on("press",A),a.on("pressup",P)}),I(e)))}function I(t){var a=e(t).parents(".page")[0];if(a&&!(a.classList.contains("homePage")||a.classList.contains("itemDetailPage")||a.classList.contains("liveTvPage"))){var r="8";appStorage.getItem("tapholdhelp")!=r&&(appStorage.setItem("tapholdhelp",r),Dashboard.alert({message:Globalize.translate("TryMultiSelectMessage"),title:Globalize.translate("HeaderTryMultiSelect")}))}}function C(e){return e.preventDefault(),e.stopPropagation(),!1}function A(e){var t=b(e.target,"card");return t?(w(t),s.stopPropagation&&e.stopPropagation(),e.preventDefault(),e.stopPropagation(),!1):(e.preventDefault(),e.stopPropagation(),!1)}function P(e){var t=b(e.target,"itemSelectionPanel");if(t){if(!b(e.target,"chkItemSelect")){var a=t.querySelector(".chkItemSelect");a&&(a.checked=!a.checked)}return e.preventDefault(),!1}}function L(e,t){if(!b(e.target,"chkItemSelect")){var a=t.querySelector(".chkItemSelect");if(a){var r=!a.checked;a.checked=r,D(a,r)}}return e.preventDefault(),e.stopPropagation(),!1}function S(){D(this,this.checked)}function M(a){var r=a.querySelector(".itemSelectionPanel");r||require(["paper-checkbox"],function(){r=t.createElement("div"),r.classList.add("itemSelectionPanel"),a.querySelector(".cardContent").appendChild(r);var n=t.createElement("paper-checkbox");n.classList.add("chkItemSelect"),e(n).on("change",S),r.appendChild(n)})}function k(){var a=t.querySelector(".selectionCommandsPanel");if(!a){a=t.createElement("div"),a.classList.add("selectionCommandsPanel"),t.body.appendChild(a);var r="";r+='<div style="float:left;">',r+='<paper-icon-button class="btnCloseSelectionPanel" icon="close"></paper-icon-button>',r+='<span class="itemSelectionCount"></span>',r+="</div>",r+='<paper-icon-button class="btnSelectionPanelOptions" icon="more-vert" style="margin-left:auto;"></paper-icon-button>',a.innerHTML=r,e(".btnCloseSelectionPanel",a).on("click",B);var n=a.querySelector(".btnSelectionPanelOptions");e(n).on("click",T),browserInfo.mobile||x(n,1)}}function x(e,t){var a=[{transform:"translate3d(0, 0, 0)",offset:0},{transform:"translate3d(-10px, 0, 0)",offset:.1},{transform:"translate3d(10px, 0, 0)",offset:.2},{transform:"translate3d(-10px, 0, 0)",offset:.3},{transform:"translate3d(10px, 0, 0)",offset:.4},{transform:"translate3d(-10px, 0, 0)",offset:.5},{transform:"translate3d(10px, 0, 0)",offset:.6},{transform:"translate3d(-10px, 0, 0)",offset:.7},{transform:"translate3d(10px, 0, 0)",offset:.8},{transform:"translate3d(-10px, 0, 0)",offset:.9},{transform:"translate3d(0, 0, 0)",offset:1}],r={duration:900,iterations:t};return e.animate(a,r)}function w(e){for(var a=t.querySelectorAll(".card"),r=0,n=a.length;n>r;r++)M(a[r]);k(),e.querySelector(".chkItemSelect").checked=!0,D(e,!0)}function B(){var e=t.querySelector(".selectionCommandsPanel");if(e){e.parentNode.removeChild(e),F=[];for(var a=t.querySelectorAll(".itemSelectionPanel"),r=0,n=a.length;n>r;r++)a[r].parentNode.removeChild(a[r])}}function D(e,a){var r=b(e,"card").getAttribute("data-itemid");if(a){var n=F.filter(function(e){return e==r});n.length||F.push(r)}else F=F.filter(function(e){return e!=r});if(F.length){var i=t.querySelector(".itemSelectionCount");i&&(i.innerHTML=F.length)}else B()}function T(t){Dashboard.getCurrentUser().then(function(){var a=[];a.push({name:Globalize.translate("ButtonAddToCollection"),id:"addtocollection",ironIcon:"add"}),a.push({name:Globalize.translate("ButtonAddToPlaylist"),id:"playlist",ironIcon:"playlist-add"}),a.push({name:Globalize.translate("HeaderGroupVersions"),id:"groupvideos",ironIcon:"call-merge"}),a.push({name:Globalize.translate("ButtonRefresh"),id:"refresh",ironIcon:"refresh"}),a.push({name:Globalize.translate("ButtonSync"),id:"sync",ironIcon:"sync"}),require(["actionsheet"],function(){ActionSheetElement.show({items:a,positionTo:t.target,callback:function(t){var a=F.slice(0);switch(t){case"addtocollection":require(["collectioneditor"],function(e){(new e).show(a)}),B();break;case"playlist":PlaylistManager.showPanel(a),B();break;case"groupvideos":q(e(e.mobile.activePage)[0],a);break;case"refresh":a.map(function(e){ApiClient.refreshItem(e,{Recursive:!0,ImageRefreshMode:"FullRefresh",MetadataRefreshMode:"FullRefresh",ReplaceAllImages:!1,ReplaceAllMetadata:!0})}),B();break;case"sync":SyncManager.showMenu({items:a.map(function(e){return{Id:e}})}),B()}}})})})}function q(t,a){if(a.length<2)return void Dashboard.alert({message:Globalize.translate("MessagePleaseSelectTwoItems"),title:Globalize.translate("HeaderError")});var r=Globalize.translate("MessageTheSelectedItemsWillBeGrouped");Dashboard.confirm(r,Globalize.translate("HeaderGroupVersions"),function(r){r&&(Dashboard.showLoadingMsg(),ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Videos/MergeVersions",{Ids:a.join(",")})}).then(function(){Dashboard.hideLoadingMsg(),B(),e(".itemsContainer",t).trigger("needsrefresh")}))})}function G(t){var a=b(t.target,"itemWithAction");if(a){var r=a.getAttribute("data-action"),n=a;if(r)for(;!n.getAttribute("data-itemid");)n=n.parentNode;var i,o,s=n.getAttribute("data-itemid");return"play"==r?MediaController.play(s):"playallfromhere"==r?(i=n.getAttribute("data-index"),o=e(a).parents(".itemsContainer"),O(i,o,"play")):"instantmix"==r&&MediaController.instantMix(s),t.stopPropagation(),t.preventDefault(),!1}}function O(t,a,r){var n=e(".mediaItem",a).get().map(function(e){for(var t=e,a=t.getAttribute("data-itemid");!a;)t=t.parentNode,a=t.getAttribute("data-itemid");return a});n=n.slice(t),ApiClient.getItems(Dashboard.getCurrentUserId(),{Ids:n.join(","),Fields:"MediaSources,Chapters",Limit:100}).then(function(e){MediaController[r]({items:e.Items})})}function z(a,r){if(r.Played){var n=a.querySelector(".playedIndicator");n||(n=t.createElement("div"),n.classList.add("playedIndicator"),a.querySelector(".cardContent").appendChild(n)),n.innerHTML='<iron-icon icon="check"></iron-icon>'}else if(r.UnplayedItemCount){var n=a.querySelector(".playedIndicator");n||(n=t.createElement("div"),n.classList.add("playedIndicator"),a.querySelector(".cardContent").appendChild(n)),n.innerHTML=r.UnplayedItemCount}var i=LibraryBrowser.getItemProgressBarHtml(r);if(i){var o=a.querySelector(".cardProgress");o||(o=t.createElement("div"),o.classList.add("cardProgress"),e(".cardFooter",a).append(o)),o.innerHTML=i}else e(".cardProgress",a).remove()}function E(a){e(t.querySelectorAll("*[data-itemid='"+a.ItemId+"']")).each(function(){var t=this.getAttribute("data-mediatype");"Video"==t&&(this.setAttribute("data-positionticks",a.PlaybackPositionTicks||0),e(this).hasClass("card")&&z(this,a))})}function U(e,t){var a=t;if("UserDataChanged"===a.MessageType&&a.Data.UserId==Dashboard.getCurrentUserId())for(var r=0,n=a.Data.UserDataList.length;n>r;r++)E(a.Data.UserDataList[r])}function R(t){e(t).off("websocketmessage",U).on("websocketmessage",U)}function H(){e(".hasrefreshtime").removeClass("hasrefreshtime").removeAttr("data-lastrefresh")}var N;e.fn.createCardMenus=function(){function a(a){if(a=a.querySelector("a"),!a.querySelector(".itemSelectionPanel")){var r=a.querySelector(".cardOverlayTarget");r||(r=t.createElement("div"),r.classList.add("hide"),r.classList.add("cardOverlayTarget"),b(a,"cardContent").appendChild(r));for(var n=a;n&&!n.getAttribute("data-itemid");)n=n.parentNode;var s=n.getAttribute("data-itemid"),u=n.getAttribute("data-commands").split(","),m=ApiClient.getItem(Dashboard.getCurrentUserId(),s),p=Dashboard.getCurrentUser();Promise.all([m,p]).then(function(t){for(var n=t[0],i=t[1],s=a;!s.classList.contains("card");)s=s.parentNode;r.innerHTML=o(n,i,s,u),e(".btnPlayItem",r).on("click",c),e(".btnPlayTrailer",r).on("click",l),e(".btnMoreCommands",r).on("click",d)}),e(r).show(),i(r)}}function n(e){var t=e.target;if(t.classList.contains("cardImage")){if(m===!0)return void(m=!1);for(N&&(clearTimeout(N),N=null);!t.classList.contains("card");)t=t.parentNode;N=setTimeout(function(){a(t)},1e3)}}function s(){m=!0}for(var m=!1,p=0,f=this.length;f>p;p++){var g=this[p];g.removeEventListener("click",h),g.addEventListener("click",h),AppInfo.isTouchPreferred?(g.removeEventListener("contextmenu",C),g.addEventListener("contextmenu",C)):(g.removeEventListener("contextmenu",u),g.addEventListener("contextmenu",u),g.removeEventListener("mouseenter",n),g.addEventListener("mouseenter",n,!0),g.removeEventListener("mouseleave",r),g.addEventListener("mouseleave",r,!0),g.removeEventListener("touchstart",s),g.addEventListener("touchstart",s)),v(g)}return this};var F=[];pageClassOn("pageinit","libraryPage",function(){var t=this;t.addEventListener("click",G);for(var a=t.querySelectorAll(".itemsContainer:not(.noautoinit)"),r=0,n=a.length;n>r;r++)e(a[r]).createCardMenus()}),pageClassOn("pagebeforehide","libraryPage",function(){B()}),a.ApiClient&&R(a.ApiClient),e(ConnectionManager).on("apiclientcreated",function(e,t){R(t)}),Events.on(ConnectionManager,"localusersignedin",H),Events.on(ConnectionManager,"localusersignedout",H)}(jQuery,document,window);