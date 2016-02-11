define(["paperdialoghelper","layoutManager","globalize","dialogText","html!./icons.html","css!./style.css","paper-button","paper-input"],function(t,e,n,o){function a(a,r,i){var l={removeOnClose:!0},p=!1,u=!1;e.tv?(l.size="fullscreen",p=!0,u=!0):(l.modal=!1,l.entryAnimationDuration=160,l.exitAnimationDuration=200);var c=t.createDialog(l);c.classList.add("promptDialog");var s="",b="";s+='<div class="promptDialogContent">',p&&(s+='<paper-icon-button tabindex="-1" icon="dialog:arrow-back" class="btnPromptExit"></paper-icon-button>'),s+='<paper-input autoFocus class="txtPromptValue"></paper-input>',s+="<br/>",u?s+='<paper-button raised class="btnSubmit"><iron-icon icon="dialog:check"></iron-icon><span>'+n.translate(o.buttonOk)+"</span></paper-button>":(s+='<div style="text-align:right;">',s+='<paper-button class="btnSubmit">'+n.translate(o.buttonOk)+"</paper-button>",s+='<paper-button class="btnPromptExit">'+n.translate(o.buttonCancel)+"</paper-button>",s+="</div>"),s+="</div>",c.innerHTML=s,a.text&&(c.querySelector(".txtPromptValue").value=a.text),a.title&&(c.querySelector(".txtPromptValue").label=a.title),document.body.appendChild(c),c.querySelector(".btnSubmit").addEventListener("click",function(){b=c.querySelector(".txtPromptValue").value,t.close(c)}),c.querySelector(".btnPromptExit").addEventListener("click",function(){t.close(c)}),c.addEventListener("iron-overlay-closed",function(){var t=b;t?r(t):i()}),t.open(c)}return function(t){return new Promise(function(e,n){"string"==typeof t&&(t={title:"",text:t}),a(t,e,n)})}});