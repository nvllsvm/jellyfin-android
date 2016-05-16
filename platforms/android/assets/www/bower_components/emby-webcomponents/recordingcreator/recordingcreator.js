define(["dialogHelper","globalize","layoutManager","mediaInfo","apphost","connectionManager","require","loading","scrollHelper","scrollStyles","paper-checkbox","emby-collapsible","paper-input","paper-icon-button-light","css!./../formdialog","css!./recordingcreator","html!./../icons/mediainfo.html","html!./../icons/nav.html"],function(e,r,t,n,i,o,c,s,a){function l(){return["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]}function d(e){for(var r=l(),t=[],n=0,i=r.length;i>n;n++){var o=r[n];e.querySelector("#chk"+o).checked&&t.push(o)}return t}function u(e){g(e.querySelector("#seriesFields")),e.querySelector(".btnSubmit").classList.remove("hide"),e.querySelector(".supporterContainer").classList.add("hide")}function h(r){M=r,e.close(R)}function m(e){s.show();var r=this,t=o.getApiClient(P);return t.getNamedConfiguration("livetv").then(function(e){e.EnableRecordingEncoding=r.querySelector("#chkConvertRecordings").checked,t.updateNamedConfiguration("livetv",e)}),t.getNewLiveTvTimerDefaults({programId:T}).then(function(e){e.PrePaddingSeconds=60*r.querySelector("#txtPrePaddingMinutes").value,e.PostPaddingSeconds=60*r.querySelector("#txtPostPaddingMinutes").value,e.RecordNewOnly=r.querySelector("#chkNewOnly").checked,e.RecordAnyChannel=r.querySelector("#chkAllChannels").checked,e.RecordAnyTime=r.querySelector("#chkAnyTime").checked,e.Days=d(r),r.querySelector("#chkRecordSeries").checked?t.createLiveTvSeriesTimer(e).then(function(){s.hide(),h(!0)}):t.createLiveTvTimer(e).then(function(){s.hide(),h(!0)})}),e.preventDefault(),!1}function y(e,r){return s.show(),r.getJSON(r.getUrl("LiveTv/Registration",{ProgramId:e,Feature:"seriesrecordings"})).then(function(e){return s.hide(),e},function(){return s.hide(),{TrialVersion:!0,IsValid:!0,IsRegistered:!1}})}function S(e,r){v(e.querySelector("#seriesFields")),e.querySelector(".btnSubmit").classList.remove("hide"),y(T,r).then(function(r){r.IsValid?e.querySelector(".btnSubmit").classList.remove("hide"):e.querySelector(".btnSubmit").classList.add("hide"),r.IsRegistered?e.querySelector(".supporterContainer").classList.add("hide"):(e.querySelector(".supporterContainer").classList.remove("hide"),r.TrialVersion?e.querySelector(".supporterTrial").classList.remove("hide"):e.querySelector(".supporterTrial").classList.add("hide"))})}function v(e){e.classList.contains("hide")&&(e.classList.remove("hide"),e.style.overflowY="hidden",requestAnimationFrame(function(){e.animate([{height:0},{height:e.offsetHeight+"px"}],{duration:400,easing:"ease"}).onfinish=function(){e.classList.remove("hide")}}))}function g(e){e.classList.contains("hide")||(e.style.overflowY="hidden",requestAnimationFrame(function(){e.animate([{height:e.offsetHeight+"px"},{height:0}],{duration:400,easing:"ease"}).onfinish=function(){e.classList.add("hide")}}))}function f(e){return c(["shell"],function(e){e.openUrl("https://emby.media/premiere")}),e.preventDefault(),!1}function p(e){var r=o.getApiClient(P);e.querySelector(".lnkPremiere").addEventListener("click",f),e.querySelector("#chkRecordSeries").addEventListener("change",function(){this.checked?S(e,r):u(e)}),e.querySelector(".btnSubmit").addEventListener("click",function(){var r=document.createElement("input");r.setAttribute("type","submit"),r.style.display="none";var t=e.querySelector("form");t.appendChild(r),r.click(),setTimeout(function(){t.removeChild(r)},500)}),e.querySelector(".btnCancel").addEventListener("click",function(){h(!1)}),e.querySelector("form",e).addEventListener("submit",m);for(var n=e.querySelectorAll(".btnSupporter"),c=0,s=n.length;s>c;c++)i.supports("externalpremium")?n[c].classList.remove("hide"):n[c].classList.add("hide");e.querySelector(".btnSupporterForConverting a").href=i.supports("externalpremium")?"https://emby.media/premiere":"#",r.getNamedConfiguration("livetv").then(function(r){e.querySelector("#chkConvertRecordings").checked=r.EnableRecordingEncoding}),t.tv?e.querySelector(".advanced").classList.add("hide"):e.querySelector(".advanced").classList.remove("hide")}function q(e,r){for(var t=l(),n=0,i=t.length;i>n;n++){var o=t[n];e.querySelector("#chk"+o).checked=-1!=r.indexOf(o)}}function L(e,r,t,i){e.querySelector(".itemName").innerHTML=t.Name,e.querySelector(".itemEpisodeName").innerHTML=t.EpisodeTitle||"",e.querySelector(".itemMiscInfoPrimary").innerHTML=n.getPrimaryMediaInfoHtml(t),e.querySelector(".itemMiscInfoSecondary").innerHTML=n.getSecondaryMediaInfoHtml(t),e.querySelector("#chkNewOnly").checked=r.RecordNewOnly,e.querySelector("#chkAllChannels").checked=r.RecordAnyChannel,e.querySelector("#chkAnyTime").checked=r.RecordAnyTime,e.querySelector("#txtPrePaddingMinutes").value=r.PrePaddingSeconds/60,e.querySelector("#txtPostPaddingMinutes").value=r.PostPaddingSeconds/60,t.IsSeries?e.querySelector("#eligibleForSeriesFields").classList.remove("hide"):e.querySelector("#eligibleForSeriesFields").classList.add("hide"),q(e,r.Days),"Emby"==t.ServiceName?(e.querySelector(".convertRecordingsContainer").classList.remove("hide"),b(e,i)):e.querySelector(".convertRecordingsContainer").classList.add("hide"),s.hide()}function b(e,r){r.getPluginSecurityInfo().then(function(r){r.IsMBSupporter?e.querySelector(".btnSupporterForConverting").classList.add("hide"):e.querySelector(".btnSupporterForConverting").classList.remove("hide")},function(){e.querySelector(".btnSupporterForConverting").classList.remove("hide")})}function k(e,r){s.show();var t=o.getApiClient(P),n=t.getNewLiveTvTimerDefaults({programId:r}),i=t.getLiveTvProgram(r,t.getCurrentUserId());Promise.all([n,i]).then(function(r){var n=r[0],i=r[1];L(e,n,i,t)})}function C(n,i){return new Promise(function(o,l){M=!1,T=n,P=i,s.show(),c(["text!./recordingcreator.template.html"],function(i){var s={removeOnClose:!0,scrollY:!1};s.size=t.tv?"fullscreen":"small";var d=e.createDialog(s);d.classList.add("formDialog"),d.classList.add("recordingDialog");var h="";h+=r.translateDocument(i,"sharedcomponents"),d.innerHTML=h,document.body.appendChild(d),R=d,d.addEventListener("close",function(){M?(c(["toast"],function(e){e(r.translate("sharedcomponents#RecordingScheduled"))}),o()):l()}),t.tv&&a.centerFocus.on(d.querySelector(".dialogContent"),!1),u(d),p(d),k(d,n),e.open(d)})})}var T,P,R,M=!1;return{show:C}});