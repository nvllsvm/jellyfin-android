define([],function(){return function(t){return new Promise(function(e,n){"string"==typeof t&&(t={label:"",text:t});var r=prompt(t.label||"",t.text||"");r?e(r):n(r)})}});