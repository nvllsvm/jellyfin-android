define(["layoutManager","globalize","css!./dialog"],function(t){function n(t){return new Promise(function(n,e){require(["actionsheet"],function(o){o.show({title:t.text,items:t.buttons}).then(n,e)})})}function e(n,e,o,i){function r(){b=this.getAttribute("data-id"),e.close(l)}var a={removeOnClose:!0},u=!1;t.tv?(a.size="fullscreen",u=!0,a.autoFocus=!0):(a.modal=!1,a.entryAnimationDuration=160,a.exitAnimationDuration=160,a.autoFocus=!0);var l=e.createDialog(a);l.classList.add("promptDialog");var s="";s+='<div class="promptDialogContent">',n.title&&(s+="<h2>"+n.title+"</h2>");var c=n.html||n.text;c&&(s+='<div style="margin:1em 0;">'+c+"</div>"),s+='<div class="promptDialogButtons">';var d,m;for(d=0,m=n.buttons.length;m>d;d++){var v=n.buttons[d],f=0==d?" autofocus":"";s+='<button is="emby-button" type="button" class="btnOption promptDialogButton" data-id="'+v.id+'"'+f+">"+v.name+"</button>"}s+="</div>",s+="</div>",l.innerHTML=s,document.body.appendChild(l);var b,p=l.querySelectorAll(".btnOption");for(d=0,m=n.buttons.length;m>d;d++)p[d].addEventListener("click",r);e.open(l).then(function(){b?o(b):i()})}function o(t){return new Promise(function(n,o){require(["dialogHelper","emby-button"],function(i){e(t,i,n,o)})})}return function(e,i){var r;return r="string"==typeof e?{title:i,text:e}:e,t.tv?n(r):o(r)}});