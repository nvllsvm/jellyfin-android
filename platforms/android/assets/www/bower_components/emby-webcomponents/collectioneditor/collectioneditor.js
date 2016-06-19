define(["shell","dialogHelper","loading","layoutManager","connectionManager","scrollHelper","embyRouter","globalize","emby-checkbox","emby-input","paper-icon-button-light","emby-select","material-icons","css!./../formdialog","emby-button"],function(e,t,n,o,l,i,a,r){function s(e,t){for(;!e.classList||!e.classList.contains(t);)if(e=e.parentNode,!e)return null;return e}function c(e){n.show();var t=s(this,"dialog"),o=t.querySelector("#selectCollectionToAddTo").value,i=l.getApiClient(y);return o?m(i,t,o):d(i,t),e.preventDefault(),!1}function d(e,o){var l=e.getUrl("Collections",{Name:o.querySelector("#txtNewCollectionName").value,IsLocked:!o.querySelector("#chkEnableInternetMetadata").checked,Ids:o.querySelector(".fldSelectedItemIds").value||""});e.ajax({type:"POST",url:l,dataType:"json"}).then(function(l){n.hide();var i=l.Id;t.close(o),u(e,i)})}function u(e,t){e.getItem(e.getCurrentUserId(),t).then(function(e){a.showItem(e)})}function m(e,o,l){var i=e.getUrl("Collections/"+l+"/Items",{Ids:o.querySelector(".fldSelectedItemIds").value||""});e.ajax({type:"POST",url:i}).then(function(){n.hide(),t.close(o),require(["toast"],function(e){e(r.translate("sharedcomponents#MessageItemsAdded"))})})}function p(e){e.dispatchEvent(new CustomEvent("change",{}))}function v(e){n.show();var t=e.querySelector("#selectCollectionToAddTo");e.querySelector(".newCollectionInfo").classList.add("hide");var o={Recursive:!0,IncludeItemTypes:"BoxSet",SortBy:"SortName"},i=l.getApiClient(y);i.getItems(i.getCurrentUserId(),o).then(function(e){var o="";o+='<option value="">'+r.translate("sharedcomponents#OptionNew")+"</option>",o+=e.Items.map(function(e){return'<option value="'+e.Id+'">'+e.Name+"</option>"}),t.innerHTML=o,t.value="",p(t),n.hide()})}function h(){var e="";return e+='<div class="dialogContent smoothScrollY">',e+='<div class="dialogContentInner centeredContent">',e+='<form class="newCollectionForm" style="margin:auto;">',e+="<div>",e+=r.translate("sharedcomponents#NewCollectionHelp"),e+="</div>",e+='<div class="fldSelectCollection">',e+="<br/>",e+="<br/>",e+='<select is="emby-select" label="'+r.translate("sharedcomponents#LabelCollection")+'" id="selectCollectionToAddTo" autofocus></select>',e+="</div>",e+='<div class="newCollectionInfo">',e+='<div class="inputContainer">',e+='<input is="emby-input" type="text" id="txtNewCollectionName" required="required" label="'+r.translate("sharedcomponents#LabelName")+'" />',e+='<div class="fieldDescription">'+r.translate("sharedcomponents#NewCollectionNameExample")+"</div>",e+="</div>",e+='<label class="checkboxContainer">',e+='<input is="emby-checkbox" type="checkbox" id="chkEnableInternetMetadata" />',e+="<span>"+r.translate("sharedcomponents#SearchForCollectionInternetMetadata")+"</span>",e+="</label>",e+="</div>",e+="<div>",e+='<button is="emby-button" type="submit" class="raised btnSubmit block">'+r.translate("sharedcomponents#ButtonOk")+"</button>",e+="</div>",e+='<input type="hidden" class="fldSelectedItemIds" />',e+="</form>",e+="</div>",e+="</div>"}function f(e,t){if(e.querySelector("#selectCollectionToAddTo").addEventListener("change",function(){this.value?(e.querySelector(".newCollectionInfo").classList.add("hide"),e.querySelector("#txtNewCollectionName").removeAttribute("required")):(e.querySelector(".newCollectionInfo").classList.remove("hide"),e.querySelector("#txtNewCollectionName").setAttribute("required","required"))}),e.querySelector("form").addEventListener("submit",c),e.querySelector(".fldSelectedItemIds",e).value=t.join(","),t.length)e.querySelector(".fldSelectCollection").classList.remove("hide"),v(e);else{e.querySelector(".fldSelectCollection").classList.add("hide");var n=e.querySelector("#selectCollectionToAddTo");n.innerHTML="",n.value="",p(n)}}function b(){var e=this;e.show=function(e){var n=e.items||{};y=e.serverId;var l={removeOnClose:!0,scrollY:!1};l.size=o.tv?"fullscreen":"small";var a=t.createDialog(l);a.classList.add("formDialog");var s="",c=r.translate(n.length?"sharedcomponents#AddToCollection":"sharedcomponents#NewCollection");return s+='<div class="dialogHeader" style="margin:0 0 2em;">',s+='<button is="paper-icon-button-light" class="btnCancel autoSize" tabindex="-1"><i class="md-icon">arrow_back</i></button>',s+='<div class="dialogHeaderTitle">',s+=c,s+="</div>",s+='<a class="btnHelp" href="https://github.com/MediaBrowser/Wiki/wiki/Collections" target="_blank" style="margin-left:auto;margin-right:.5em;display:inline-block;padding:.25em;display:flex;align-items:center;" title="'+r.translate("sharedcomponents#Help")+'"><i class="md-icon">info</i><span style="margin-left:.25em;">'+r.translate("sharedcomponents#Help")+"</span></a>",s+="</div>",s+=h(),a.innerHTML=s,document.body.appendChild(a),f(a,n),a.querySelector(".btnCancel").addEventListener("click",function(){t.close(a)}),o.tv&&i.centerFocus.on(a.querySelector(".dialogContent"),!1),new Promise(function(e){a.addEventListener("close",e),t.open(a)})}}var y;return b});