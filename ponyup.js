//Prototype Library
var Prototype={Version:"1.7",Browser:function(){var a=navigator.userAgent,b=Object.prototype.toString.call(window.opera)=="[object Opera]";return{IE:!!window.attachEvent&&!b,Opera:b,WebKit:a.indexOf("AppleWebKit/")>-1,Gecko:a.indexOf("Gecko")>-1&&a.indexOf("KHTML")===-1,MobileSafari:/Apple.*Mobile/.test(a)}}(),BrowserFeatures:{XPath:!!document.evaluate,SelectorsAPI:!!document.querySelector,ElementExtensions:function(){var a=window.Element||window.HTMLElement;return!(!a||!a.prototype)}(),SpecificElementExtensions:function(){if(typeof window.HTMLDivElement!== "undefined")return!0;var a=document.createElement("div"),b=document.createElement("form"),c=!1;a.__proto__&&a.__proto__!==b.__proto__&&(c=!0);return c}()},ScriptFragment:"<script[^>]*>([\\S\\s]*?)<\/script>",JSONFilter:/^\/\*-secure-([\s\S]*)\*\/\s*$/,emptyFunction:function(){},K:function(a){return a}};if(Prototype.Browser.MobileSafari)Prototype.BrowserFeatures.SpecificElementExtensions=!1; var Class=function(){function a(){}var b=function(){for(var a in{toString:1})if(a==="toString")return!1;return!0}();return{create:function(){function b(){this.initialize.apply(this,arguments)}var d=null,g=$A(arguments);Object.isFunction(g[0])&&(d=g.shift());Object.extend(b,Class.Methods);b.superclass=d;b.subclasses=[];if(d)a.prototype=d.prototype,b.prototype=new a,d.subclasses.push(b);for(var d=0,f=g.length;d<f;d++)b.addMethods(g[d]);if(!b.prototype.initialize)b.prototype.initialize=Prototype.emptyFunction; return b.prototype.constructor=b},Methods:{addMethods:function(a){var d=this.superclass&&this.superclass.prototype,g=Object.keys(a);b&&(a.toString!=Object.prototype.toString&&g.push("toString"),a.valueOf!=Object.prototype.valueOf&&g.push("valueOf"));for(var f=0,e=g.length;f<e;f++){var i=g[f],h=a[i];if(d&&Object.isFunction(h)&&h.argumentNames()[0]=="$super"){var l=h,h=function(a){return function(){return d[a].apply(this,arguments)}}(i).wrap(l);h.valueOf=l.valueOf.bind(l);h.toString=l.toString.bind(l)}this.prototype[i]= h}return this}}}}(); (function(){function a(a){switch(a){case null:return l;case void 0:return n}switch(typeof a){case "boolean":return k;case "number":return w;case "string":return p}return q}function b(a,b){for(var e in b)a[e]=b[e];return a}function c(a){return d("",{"":a},[])}function d(b,e,c){var e=e[b],i=typeof e;a(e)===q&&typeof e.toJSON==="function"&&(e=e.toJSON(b));b=h.call(e);switch(b){case v:case r:case x:e=e.valueOf()}switch(e){case null:return"null";case !0:return"true";case !1:return"false"}switch(typeof e){case "string":return e.inspect(!0);case "number":return isFinite(e)? String(e):"null";case "object":for(var i=0,l=c.length;i<l;i++)if(c[i]===e)throw new TypeError;c.push(e);var f=[];if(b===z){i=0;for(l=e.length;i<l;i++){var g=d(i,e,c);f.push(typeof g==="undefined"?"null":g)}f="["+f.join(",")+"]"}else{for(var n=Object.keys(e),i=0,l=n.length;i<l;i++)b=n[i],g=d(b,e,c),typeof g!=="undefined"&&f.push(b.inspect(!0)+":"+g);f="{"+f.join(",")+"}"}c.pop();return f}}function g(a){return JSON.stringify(a)}function f(b){if(a(b)!==q)throw new TypeError;var e=[],c;for(c in b)b.hasOwnProperty(c)&& e.push(c);return e}function e(a){return h.call(a)===z}function i(a){return typeof a==="undefined"}var h=Object.prototype.toString,l="Null",n="Undefined",k="Boolean",w="Number",p="String",q="Object",r="[object Boolean]",v="[object Number]",x="[object String]",z="[object Array]",C=window.JSON&&typeof JSON.stringify==="function"&&JSON.stringify(0)==="0"&&typeof JSON.stringify(Prototype.K)==="undefined";if(typeof Array.isArray=="function"&&Array.isArray([])&&!Array.isArray({}))e=Array.isArray;b(Object, {extend:b,inspect:function(a){try{return i(a)?"undefined":a===null?"null":a.inspect?a.inspect():String(a)}catch(b){if(b instanceof RangeError)return"...";throw b;}},toJSON:C?g:c,toQueryString:function(a){return $H(a).toQueryString()},toHTML:function(a){return a&&a.toHTML?a.toHTML():String.interpret(a)},keys:Object.keys||f,values:function(a){var b=[],e;for(e in a)b.push(a[e]);return b},clone:function(a){return b({},a)},isElement:function(a){return!!(a&&a.nodeType==1)},isArray:e,isHash:function(a){return a instanceof Hash},isFunction:function(a){return h.call(a)==="[object Function]"},isString:function(a){return h.call(a)===x},isNumber:function(a){return h.call(a)===v},isDate:function(a){return h.call(a)==="[object Date]"},isUndefined:i})})(); Object.extend(Function.prototype,function(){function a(a,b){for(var c=a.length,e=b.length;e--;)a[c+e]=b[e];return a}function b(b,g){b=c.call(b,0);return a(b,g)}var c=Array.prototype.slice;return{argumentNames:function(){var a=this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g,"").replace(/\s+/g,"").split(",");return a.length==1&&!a[0]?[]:a},bind:function(a){if(arguments.length<2&&Object.isUndefined(arguments[0]))return this;var g=this,f=c.call(arguments, 1);return function(){var e=b(f,arguments);return g.apply(a,e)}},bindAsEventListener:function(b){var g=this,f=c.call(arguments,1);return function(e){e=a([e||window.event],f);return g.apply(b,e)}},curry:function(){if(!arguments.length)return this;var a=this,g=c.call(arguments,0);return function(){var c=b(g,arguments);return a.apply(this,c)}},delay:function(a){var b=this,f=c.call(arguments,1);a*=1E3;return window.setTimeout(function(){return b.apply(b,f)},a)},defer:function(){return this.delay.apply(this, a([0.01],arguments))},wrap:function(b){var c=this;return function(){var f=a([c.bind(this)],arguments);return b.apply(this,f)}},methodize:function(){if(this._methodized)return this._methodized;var b=this;return this._methodized=function(){var c=a([this],arguments);return b.apply(null,c)}}}}()); (function(a){function b(){return this.getUTCFullYear()+"-"+(this.getUTCMonth()+1).toPaddedString(2)+"-"+this.getUTCDate().toPaddedString(2)+"T"+this.getUTCHours().toPaddedString(2)+":"+this.getUTCMinutes().toPaddedString(2)+":"+this.getUTCSeconds().toPaddedString(2)+"Z"}function c(){return this.toISOString()}if(!a.toISOString)a.toISOString=b;if(!a.toJSON)a.toJSON=c})(Date.prototype);RegExp.prototype.match=RegExp.prototype.test; RegExp.escape=function(a){return String(a).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1")}; var PeriodicalExecuter=Class.create({initialize:function(a,b){this.callback=a;this.frequency=b;this.currentlyExecuting=!1;this.registerCallback()},registerCallback:function(){this.timer=setInterval(this.onTimerEvent.bind(this),this.frequency*1E3)},execute:function(){this.callback(this)},stop:function(){if(this.timer)clearInterval(this.timer),this.timer=null},onTimerEvent:function(){if(!this.currentlyExecuting)try{this.currentlyExecuting=!0,this.execute(),this.currentlyExecuting=!1}catch(a){throw this.currentlyExecuting= !1,a;}}});Object.extend(String,{interpret:function(a){return a==null?"":String(a)},specialChar:{"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r","\\":"\\\\"}}); Object.extend(String.prototype,function(){function a(a){if(Object.isFunction(a))return a;var b=new Template(a);return function(a){return b.evaluate(a)}}function b(){return this.replace(/^\s+/,"").replace(/\s+$/,"")}function c(a){var b=this.strip().match(/([^?#]*)(#.*)?$/);return!b?{}:b[1].split(a||"&").inject({},function(a,b){if((b=b.split("="))[0]){var e=decodeURIComponent(b.shift()),c=b.length>1?b.join("="):b[0];c!=void 0&&(c=decodeURIComponent(c));e in a?(Object.isArray(a[e])||(a[e]=[a[e]]),a[e].push(c)): a[e]=c}return a})}function d(a){var b=this.unfilterJSON(),c=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;c.test(b)&&(b=b.replace(c,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));try{if(!a||b.isJSON())return eval("("+b+")")}catch(d){}throw new SyntaxError("Badly formed JSON string: "+this.inspect());}function g(){var a=this.unfilterJSON();return JSON.parse(a)}var f=window.JSON&&typeof JSON.parse==="function"&& JSON.parse('{"test": true}').test;return{gsub:function(b,c){var h="",d=this,f,c=a(c);Object.isString(b)&&(b=RegExp.escape(b));if(!b.length&&!b.source)return c=c(""),c+d.split("").join(c)+c;for(;d.length>0;)(f=d.match(b))?(h+=d.slice(0,f.index),h+=String.interpret(c(f)),d=d.slice(f.index+f[0].length)):(h+=d,d="");return h},sub:function(b,c,h){c=a(c);h=Object.isUndefined(h)?1:h;return this.gsub(b,function(a){return--h<0?a[0]:c(a)})},scan:function(a,b){this.gsub(a,b);return String(this)},truncate:function(a, b){a=a||30;b=Object.isUndefined(b)?"...":b;return this.length>a?this.slice(0,a-b.length)+b:String(this)},strip:String.prototype.trim||b,stripTags:function(){return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi,"")},stripScripts:function(){return this.replace(RegExp(Prototype.ScriptFragment,"img"),"")},extractScripts:function(){var a=RegExp(Prototype.ScriptFragment,"im");return(this.match(RegExp(Prototype.ScriptFragment,"img"))||[]).map(function(b){return(b.match(a)||["",""])[1]})},evalScripts:function(){return this.extractScripts().map(function(a){return eval(a)})}, escapeHTML:function(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},unescapeHTML:function(){return this.stripTags().replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")},toQueryParams:c,parseQuery:c,toArray:function(){return this.split("")},succ:function(){return this.slice(0,this.length-1)+String.fromCharCode(this.charCodeAt(this.length-1)+1)},times:function(a){return a<1?"":Array(a+1).join(this)},camelize:function(){return this.replace(/-+(.)?/g,function(a, b){return b?b.toUpperCase():""})},capitalize:function(){return this.charAt(0).toUpperCase()+this.substring(1).toLowerCase()},underscore:function(){return this.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/-/g,"_").toLowerCase()},dasherize:function(){return this.replace(/_/g,"-")},inspect:function(a){var b=this.replace(/[\x00-\x1f\\]/g,function(a){return a in String.specialChar?String.specialChar[a]:"\\u00"+a.charCodeAt().toPaddedString(2, 16)});return a?'"'+b.replace(/"/g,'\\"')+'"':"'"+b.replace(/'/g,"\\'")+"'"},unfilterJSON:function(a){return this.replace(a||Prototype.JSONFilter,"$1")},isJSON:function(){var a=this;if(a.blank())return!1;a=a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@");a=a.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]");a=a.replace(/(?:^|:|,)(?:\s*\[)+/g,"");return/^[\],:{}\s]*$/.test(a)},evalJSON:f?g:d,include:function(a){return this.indexOf(a)>-1},startsWith:function(a){return this.lastIndexOf(a, 0)===0},endsWith:function(a){var b=this.length-a.length;return b>=0&&this.indexOf(a,b)===b},empty:function(){return this==""},blank:function(){return/^\s*$/.test(this)},interpolate:function(a,b){return(new Template(this,b)).evaluate(a)}}}()); var Template=Class.create({initialize:function(a,b){this.template=a.toString();this.pattern=b||Template.Pattern},evaluate:function(a){a&&Object.isFunction(a.toTemplateReplacements)&&(a=a.toTemplateReplacements());return this.template.gsub(this.pattern,function(b){if(a==null)return b[1]+"";var c=b[1]||"";if(c=="\\")return b[2];var d=a,g=b[3],f=/^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/,b=f.exec(g);if(b==null)return c;for(;b!=null;){var e=b[1].startsWith("[")?b[2].replace(/\\\\]/g,"]"):b[1],d=d[e];if(null== d||""==b[3])break;g=g.substring("["==b[3]?b[1].length:b[0].length);b=f.exec(g)}return c+String.interpret(d)})}});Template.Pattern=/(^|.|\r|\n)(#\{(.*?)\})/; var $break={},Enumerable=function(){function a(a,b){var a=a||Prototype.K,e=!0;this.each(function(c,d){e=e&&!!a.call(b,c,d);if(!e)throw $break;});return e}function b(a,b){var a=a||Prototype.K,e=!1;this.each(function(c,d){if(e=!!a.call(b,c,d))throw $break;});return e}function c(a,b){var a=a||Prototype.K,e=[];this.each(function(c,d){e.push(a.call(b,c,d))});return e}function d(a,b){var e;this.each(function(c,d){if(a.call(b,c,d))throw e=c,$break;});return e}function g(a,b){var e=[];this.each(function(c, d){a.call(b,c,d)&&e.push(c)});return e}function f(a){if(Object.isFunction(this.indexOf)&&this.indexOf(a)!=-1)return!0;var b=!1;this.each(function(e){if(e==a)throw b=!0,$break;});return b}function e(){return this.map()}return{each:function(a,b){var e=0;try{this._each(function(c){a.call(b,c,e++)})}catch(c){if(c!=$break)throw c;}return this},eachSlice:function(a,b,e){var c=-a,d=[],f=this.toArray();if(a<1)return f;for(;(c+=a)<f.length;)d.push(f.slice(c,c+a));return d.collect(b,e)},all:a,every:a,any:b, some:b,collect:c,map:c,detect:d,findAll:g,select:g,filter:g,grep:function(a,b,e){var b=b||Prototype.K,c=[];Object.isString(a)&&(a=RegExp(RegExp.escape(a)));this.each(function(d,f){a.match(d)&&c.push(b.call(e,d,f))});return c},include:f,member:f,inGroupsOf:function(a,b){b=Object.isUndefined(b)?null:b;return this.eachSlice(a,function(e){for(;e.length<a;)e.push(b);return e})},inject:function(a,b,e){this.each(function(c,d){a=b.call(e,a,c,d)});return a},invoke:function(a){var b=$A(arguments).slice(1); return this.map(function(e){return e[a].apply(e,b)})},max:function(a,b){var a=a||Prototype.K,e;this.each(function(c,d){c=a.call(b,c,d);if(e==null||c>=e)e=c});return e},min:function(a,b){var a=a||Prototype.K,e;this.each(function(c,d){c=a.call(b,c,d);if(e==null||c<e)e=c});return e},partition:function(a,b){var a=a||Prototype.K,e=[],c=[];this.each(function(d,f){(a.call(b,d,f)?e:c).push(d)});return[e,c]},pluck:function(a){var b=[];this.each(function(e){b.push(e[a])});return b},reject:function(a,b){var e= [];this.each(function(c,d){a.call(b,c,d)||e.push(c)});return e},sortBy:function(a,b){return this.map(function(e,c){return{value:e,criteria:a.call(b,e,c)}}).sort(function(a,b){var e=a.criteria,c=b.criteria;return e<c?-1:e>c?1:0}).pluck("value")},toArray:e,entries:e,zip:function(){var a=Prototype.K,b=$A(arguments);Object.isFunction(b.last())&&(a=b.pop());var e=[this].concat(b).map($A);return this.map(function(b,c){return a(e.pluck(c))})},size:function(){return this.toArray().length},inspect:function(){return"#<Enumerable:"+ this.toArray().inspect()+">"},find:d}}();function $A(a){if(!a)return[];if("toArray"in Object(a))return a.toArray();for(var b=a.length||0,c=Array(b);b--;)c[b]=a[b];return c}function $w(a){return!Object.isString(a)?[]:(a=a.strip())?a.split(/\s+/):[]}Array.from=$A; (function(){function a(a,b){for(var e=0,c=this.length>>>0;e<c;e++)e in this&&a.call(b,this[e],e,this)}function b(){return e.call(this,0)}function c(a,b){b||(b=0);var e=this.length;for(b<0&&(b=e+b);b<e;b++)if(this[b]===a)return b;return-1}function d(a,b){var b=isNaN(b)?this.length:(b<0?this.length+b:b)+1,e=this.slice(0,b).reverse().indexOf(a);return e<0?e:b-e-1}function g(){for(var a=e.call(this,0),b,c=0,d=arguments.length;c<d;c++)if(b=arguments[c],Object.isArray(b)&&!("callee"in b))for(var f=0,i= b.length;f<i;f++)a.push(b[f]);else a.push(b);return a}var f=Array.prototype,e=f.slice,i=f.forEach;i||(i=a);Object.extend(f,Enumerable);if(!f._reverse)f._reverse=f.reverse;Object.extend(f,{_each:i,clear:function(){this.length=0;return this},first:function(){return this[0]},last:function(){return this[this.length-1]},compact:function(){return this.select(function(a){return a!=null})},flatten:function(){return this.inject([],function(a,b){if(Object.isArray(b))return a.concat(b.flatten());a.push(b);return a})}, without:function(){var a=e.call(arguments,0);return this.select(function(b){return!a.include(b)})},reverse:function(a){return(a===!1?this.toArray():this)._reverse()},uniq:function(a){return this.inject([],function(b,e,c){(0==c||(a?b.last()!=e:!b.include(e)))&&b.push(e);return b})},intersect:function(a){return this.uniq().findAll(function(b){return a.detect(function(a){return b===a})})},clone:b,toArray:b,size:function(){return this.length},inspect:function(){return"["+this.map(Object.inspect).join(", ")+ "]"}});if(function(){return[].concat(arguments)[0][0]!==1}(1,2))f.concat=g;if(!f.indexOf)f.indexOf=c;if(!f.lastIndexOf)f.lastIndexOf=d})();function $H(a){return new Hash(a)} var Hash=Class.create(Enumerable,function(){function a(){return Object.clone(this._object)}return{initialize:function(a){this._object=Object.isHash(a)?a.toObject():Object.clone(a)},_each:function(a){for(var c in this._object){var d=this._object[c],g=[c,d];g.key=c;g.value=d;a(g)}},set:function(a,c){return this._object[a]=c},get:function(a){if(this._object[a]!==Object.prototype[a])return this._object[a]},unset:function(a){var c=this._object[a];delete this._object[a];return c},toObject:a,toTemplateReplacements:a, keys:function(){return this.pluck("key")},values:function(){return this.pluck("value")},index:function(a){var c=this.detect(function(c){return c.value===a});return c&&c.key},merge:function(a){return this.clone().update(a)},update:function(a){return(new Hash(a)).inject(this,function(a,b){a.set(b.key,b.value);return a})},toQueryString:function(){return this.inject([],function(a,c){var d=encodeURIComponent(c.key),g=c.value;if(g&&typeof g=="object"){if(Object.isArray(g)){for(var f=[],e=0,i=g.length,h;e< i;e++)h=g[e],f.push(Object.isUndefined(h)?d:d+"="+encodeURIComponent(String.interpret(h)));return a.concat(f)}}else a.push(Object.isUndefined(g)?d:d+"="+encodeURIComponent(String.interpret(g)));return a}).join("&")},inspect:function(){return"#<Hash:{"+this.map(function(a){return a.map(Object.inspect).join(": ")}).join(", ")+"}>"},toJSON:a,clone:function(){return new Hash(this)}}}());Hash.from=$H; Object.extend(Number.prototype,function(){return{toColorPart:function(){return this.toPaddedString(2,16)},succ:function(){return this+1},times:function(a,b){$R(0,this,!0).each(a,b);return this},toPaddedString:function(a,b){var c=this.toString(b||10);return"0".times(a-c.length)+c},abs:function(){return Math.abs(this)},round:function(){return Math.round(this)},ceil:function(){return Math.ceil(this)},floor:function(){return Math.floor(this)}}}());function $R(a,b,c){return new ObjectRange(a,b,c)} var ObjectRange=Class.create(Enumerable,function(){return{initialize:function(a,b,c){this.start=a;this.end=b;this.exclusive=c},_each:function(a){for(var b=this.start;this.include(b);)a(b),b=b.succ()},include:function(a){return a<this.start?!1:this.exclusive?a<this.end:a<=this.end}}}()),Abstract={},Try={these:function(){for(var a,b=0,c=arguments.length;b<c;b++){var d=arguments[b];try{a=d();break}catch(g){}}return a}},Ajax={getTransport:function(){return Try.these(function(){return new XMLHttpRequest}, function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")})||!1},activeRequestCount:0,Responders:{responders:[],_each:function(a){this.responders._each(a)},register:function(a){this.include(a)||this.responders.push(a)},unregister:function(a){this.responders=this.responders.without(a)},dispatch:function(a,b,c,d){this.each(function(g){if(Object.isFunction(g[a]))try{g[a].apply(g,[b,c,d])}catch(f){}})}}};Object.extend(Ajax.Responders,Enumerable); Ajax.Responders.register({onCreate:function(){Ajax.activeRequestCount++},onComplete:function(){Ajax.activeRequestCount--}});Ajax.Base=Class.create({initialize:function(a){this.options={method:"post",asynchronous:!0,contentType:"application/x-www-form-urlencoded",encoding:"UTF-8",parameters:"",evalJSON:!0,evalJS:!0};Object.extend(this.options,a||{});this.options.method=this.options.method.toLowerCase();if(Object.isHash(this.options.parameters))this.options.parameters=this.options.parameters.toObject()}}); Ajax.Request=Class.create(Ajax.Base,{_complete:!1,initialize:function($super,b,c){$super(c);this.transport=Ajax.getTransport();this.request(b)},request:function(a){this.url=a;this.method=this.options.method;a=Object.isString(this.options.parameters)?this.options.parameters:Object.toQueryString(this.options.parameters);if(!["get","post"].include(this.method))a+=(a?"&":"")+"_method="+this.method,this.method="post";a&&this.method==="get"&&(this.url+=(this.url.include("?")?"&":"?")+a);this.parameters= a.toQueryParams();try{var b=new Ajax.Response(this);if(this.options.onCreate)this.options.onCreate(b);Ajax.Responders.dispatch("onCreate",this,b);this.transport.open(this.method.toUpperCase(),this.url,this.options.asynchronous);this.options.asynchronous&&this.respondToReadyState.bind(this).defer(1);this.transport.onreadystatechange=this.onStateChange.bind(this);this.setRequestHeaders();this.body=this.method=="post"?this.options.postBody||a:null;this.transport.send(this.body);if(!this.options.asynchronous&& this.transport.overrideMimeType)this.onStateChange()}catch(c){this.dispatchException(c)}},onStateChange:function(){var a=this.transport.readyState;a>1&&!(a==4&&this._complete)&&this.respondToReadyState(this.transport.readyState)},setRequestHeaders:function(){var a={"X-Requested-With":"XMLHttpRequest","X-Prototype-Version":Prototype.Version,Accept:"text/javascript, text/html, application/xml, text/xml, */*"};if(this.method=="post"&&(a["Content-type"]=this.options.contentType+(this.options.encoding? "; charset="+this.options.encoding:""),this.transport.overrideMimeType&&(navigator.userAgent.match(/Gecko\/(\d{4})/)||[0,2005])[1]<2005))a.Connection="close";if(typeof this.options.requestHeaders=="object"){var b=this.options.requestHeaders;if(Object.isFunction(b.push))for(var c=0,d=b.length;c<d;c+=2)a[b[c]]=b[c+1];else $H(b).each(function(b){a[b.key]=b.value})}for(var g in a)this.transport.setRequestHeader(g,a[g])},success:function(){var a=this.getStatus();return!a||a>=200&&a<300||a==304},getStatus:function(){try{return this.transport.status=== 1223?204:this.transport.status||0}catch(a){return 0}},respondToReadyState:function(a){var a=Ajax.Request.Events[a],b=new Ajax.Response(this);if(a=="Complete"){try{this._complete=!0,(this.options["on"+b.status]||this.options["on"+(this.success()?"Success":"Failure")]||Prototype.emptyFunction)(b,b.headerJSON)}catch(c){this.dispatchException(c)}var d=b.getHeader("Content-type");(this.options.evalJS=="force"||this.options.evalJS&&this.isSameOrigin()&&d&&d.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i))&& this.evalResponse()}try{(this.options["on"+a]||Prototype.emptyFunction)(b,b.headerJSON),Ajax.Responders.dispatch("on"+a,this,b,b.headerJSON)}catch(g){this.dispatchException(g)}if(a=="Complete")this.transport.onreadystatechange=Prototype.emptyFunction},isSameOrigin:function(){var a=this.url.match(/^\s*https?:\/\/[^\/]*/);return!a||a[0]=="#{protocol}//#{domain}#{port}".interpolate({protocol:location.protocol,domain:document.domain,port:location.port?":"+location.port:""})},getHeader:function(a){try{return this.transport.getResponseHeader(a)|| null}catch(b){return null}},evalResponse:function(){try{return eval((this.transport.responseText||"").unfilterJSON())}catch(a){this.dispatchException(a)}},dispatchException:function(a){(this.options.onException||Prototype.emptyFunction)(this,a);Ajax.Responders.dispatch("onException",this,a)}});Ajax.Request.Events=["Uninitialized","Loading","Loaded","Interactive","Complete"]; Ajax.Response=Class.create({initialize:function(a){this.request=a;var a=this.transport=a.transport,b=this.readyState=a.readyState;if(b>2&&!Prototype.Browser.IE||b==4)this.status=this.getStatus(),this.statusText=this.getStatusText(),this.responseText=String.interpret(a.responseText),this.headerJSON=this._getHeaderJSON();if(b==4)a=a.responseXML,this.responseXML=Object.isUndefined(a)?null:a,this.responseJSON=this._getResponseJSON()},status:0,statusText:"",getStatus:Ajax.Request.prototype.getStatus,getStatusText:function(){try{return this.transport.statusText|| ""}catch(a){return""}},getHeader:Ajax.Request.prototype.getHeader,getAllHeaders:function(){try{return this.getAllResponseHeaders()}catch(a){return null}},getResponseHeader:function(a){return this.transport.getResponseHeader(a)},getAllResponseHeaders:function(){return this.transport.getAllResponseHeaders()},_getHeaderJSON:function(){var a=this.getHeader("X-JSON");if(!a)return null;a=decodeURIComponent(escape(a));try{return a.evalJSON(this.request.options.sanitizeJSON||!this.request.isSameOrigin())}catch(b){this.request.dispatchException(b)}}, _getResponseJSON:function(){var a=this.request.options;if(!a.evalJSON||a.evalJSON!="force"&&!(this.getHeader("Content-type")||"").include("application/json")||this.responseText.blank())return null;try{return this.responseText.evalJSON(a.sanitizeJSON||!this.request.isSameOrigin())}catch(b){this.request.dispatchException(b)}}}); Ajax.Updater=Class.create(Ajax.Request,{initialize:function($super,b,c,d){this.container={success:b.success||b,failure:b.failure||(b.success?null:b)};var d=Object.clone(d),g=d.onComplete;d.onComplete=function(b,e){this.updateContent(b.responseText);Object.isFunction(g)&&g(b,e)}.bind(this);$super(c,d)},updateContent:function(a){var b=this.container[this.success()?"success":"failure"],c=this.options;c.evalScripts||(a=a.stripScripts());if(b=$(b))if(c.insertion)if(Object.isString(c.insertion)){var d= {};d[c.insertion]=a;b.protoinsert(d)}else c.insertion(b,a);else b.update(a)}}); Ajax.PeriodicalUpdater=Class.create(Ajax.Base,{initialize:function($super,b,c,d){$super(d);this.onComplete=this.options.onComplete;this.frequency=this.options.frequency||2;this.decay=this.options.decay||1;this.updater={};this.container=b;this.url=c;this.start()},start:function(){this.options.onComplete=this.updateComplete.bind(this);this.onTimerEvent()},stop:function(){this.updater.options.onComplete=void 0;clearTimeout(this.timer);(this.onComplete||Prototype.emptyFunction).apply(this,arguments)}, updateComplete:function(a){if(this.options.decay)this.decay=a.responseText==this.lastText?this.decay*this.options.decay:1,this.lastText=a.responseText;this.timer=this.onTimerEvent.bind(this).delay(this.decay*this.frequency)},onTimerEvent:function(){this.updater=new Ajax.Updater(this.container,this.url,this.options)}}); function $(a){if(arguments.length>1){for(var b=0,c=[],d=arguments.length;b<d;b++)c.push($(arguments[b]));return c}Object.isString(a)&&(a=document.getElementById(a));return Element.extend(a)}if(Prototype.BrowserFeatures.XPath)document._getElementsByXPath=function(a,b){for(var c=[],d=document.evaluate(a,$(b)||document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),g=0,f=d.snapshotLength;g<f;g++)c.push(Element.extend(d.snapshotItem(g)));return c};if(!Node)var Node={}; Node.ELEMENT_NODE||Object.extend(Node,{ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12}); (function(a){var b=function(){try{var a=document.createElement('<input name="x">');return a.tagName.toLowerCase()==="input"&&a.name==="x"}catch(b){return!1}}(),c=a.Element;a.Element=function(a,c){var c=c||{},a=a.toLowerCase(),f=Element.cache;if(b&&c.name)return a="<"+a+' name="'+c.name+'">',delete c.name,Element.writeAttribute(document.createElement(a),c);f[a]||(f[a]=Element.extend(document.createElement(a)));f=(a==="select"?0:!("type"in c))?f[a].cloneNode(!1):document.createElement(a);return Element.writeAttribute(f, c)};Object.extend(a.Element,c||{});if(c)a.Element.prototype=c.prototype})(this);Element.idCounter=1;Element.cache={};Element._purgeElement=function(a){var b=a._prototypeUID;if(b)Element.stopObserving(a),a._prototypeUID=void 0,delete Element.Storage[b]}; Element.Methods={visible:function(a){return $(a).style.display!="none"},toggle:function(a){a=$(a);Element[Element.visible(a)?"hide":"show"](a);return a},hide:function(a){a=$(a);a.style.display="none";return a},show:function(a){a=$(a);a.style.display="";return a},remove:function(a){a=$(a);a.parentNode.removeChild(a);return a},update:function(){var a=function(){var a=document.createElement("select"),b=!0;a.innerHTML='<option value="test">test</option>';a.options&&a.options[0]&&(b=a.options[0].nodeName.toUpperCase()!== "OPTION");return b}(),b=function(){try{var a=document.createElement("table");if(a&&a.tBodies)return a.innerHTML="<tbody><tr><td>test</td></tr></tbody>",typeof a.tBodies[0]=="undefined"}catch(b){return!0}}(),c=function(){try{var a=document.createElement("div");a.innerHTML="<link>";return a.childNodes.length===0}catch(b){return!0}}(),d=a||b||c,g=function(){var a=document.createElement("script"),b=!1;try{a.appendChild(document.createTextNode("")),b=!a.firstChild||a.firstChild&&a.firstChild.nodeType!== 3}catch(c){b=!0}return b}();return function(a,b){for(var a=$(a),i=Element._purgeElement,h=a.getElementsByTagName("*"),l=h.length;l--;)i(h[l]);b&&b.toElement&&(b=b.toElement());if(Object.isElement(b))return a.update().protoinsert(b);b=Object.toHTML(b);i=a.tagName.toUpperCase();if(i==="SCRIPT"&&g)return a.text=b,a;if(d)if(i in Element._insertionTranslations.tags){for(;a.firstChild;)a.removeChild(a.firstChild);Element._getContentFromAnonymousElement(i,b.stripScripts()).each(function(b){a.appendChild(b)})}else if(c&& Object.isString(b)&&b.indexOf("<link")>-1){for(;a.firstChild;)a.removeChild(a.firstChild);Element._getContentFromAnonymousElement(i,b.stripScripts(),!0).each(function(b){a.appendChild(b)})}else a.innerHTML=b.stripScripts();else a.innerHTML=b.stripScripts();b.evalScripts.bind(b).defer();return a}}(),replace:function(a,b){a=$(a);if(b&&b.toElement)b=b.toElement();else if(!Object.isElement(b)){var b=Object.toHTML(b),c=a.ownerDocument.createRange();c.selectNode(a);b.evalScripts.bind(b).defer();b=c.createContextualFragment(b.stripScripts())}a.parentNode.replaceChild(b, a);return a},protoinsert:function(a,b){a=$(a);if(Object.isString(b)||Object.isNumber(b)||Object.isElement(b)||b&&(b.toElement||b.toHTML))b={bottom:b};var c,d,g,f;for(f in b)c=b[f],f=f.toLowerCase(),d=Element._insertionTranslations[f],c&&c.toElement&&(c=c.toElement()),Object.isElement(c)?d(a,c):(c=Object.toHTML(c),g=(f=="before"||f=="after"?a.parentNode:a).tagName.toUpperCase(),g=Element._getContentFromAnonymousElement(g,c.stripScripts()),(f=="top"||f=="after")&&g.reverse(),g.each(d.curry(a)),c.evalScripts.bind(c).defer()); return a},wrap:function(a,b,c){a=$(a);Object.isElement(b)?$(b).writeAttribute(c||{}):b=Object.isString(b)?new Element(b,c):new Element("div",b);a.parentNode&&a.parentNode.replaceChild(b,a);b.appendChild(a);return b},inspect:function(a){var a=$(a),b="<"+a.tagName.toLowerCase();$H({id:"id",className:"class"}).each(function(c){var d=c.first(),c=c.last();(d=(a[d]||"").toString())&&(b+=" "+c+"="+d.inspect(!0))});return b+">"},recursivelyCollect:function(a,b,c){for(var a=$(a),c=c||-1,d=[];a=a[b];)if(a.nodeType== 1&&d.push(Element.extend(a)),d.length==c)break;return d},ancestors:function(a){return Element.recursivelyCollect(a,"parentNode")},descendants:function(a){return Element.select(a,"*")},firstDescendant:function(a){for(a=$(a).firstChild;a&&a.nodeType!=1;)a=a.nextSibling;return $(a)},immediateDescendants:function(a){for(var b=[],a=$(a).firstChild;a;)a.nodeType===1&&b.push(Element.extend(a)),a=a.nextSibling;return b},previousSiblings:function(a){return Element.recursivelyCollect(a,"previousSibling")}, nextSiblings:function(a){return Element.recursivelyCollect(a,"nextSibling")},siblings:function(a){a=$(a);return Element.previousSiblings(a).reverse().concat(Element.nextSiblings(a))},match:function(a,b){a=$(a);return Object.isString(b)?Prototype.Selector.match(a,b):b.match(a)},up:function(a,b,c){a=$(a);if(arguments.length==1)return $(a.parentNode);var d=Element.ancestors(a);return Object.isNumber(b)?d[b]:Prototype.Selector.find(d,b,c)},down:function(a,b,c){a=$(a);return arguments.length==1?Element.firstDescendant(a): Object.isNumber(b)?Element.descendants(a)[b]:Element.select(a,b)[c||0]},previous:function(a,b,c){a=$(a);Object.isNumber(b)&&(c=b,b=!1);Object.isNumber(c)||(c=0);return b?Prototype.Selector.find(a.previousSiblings(),b,c):a.recursivelyCollect("previousSibling",c+1)[c]},next:function(a,b,c){a=$(a);Object.isNumber(b)&&(c=b,b=!1);Object.isNumber(c)||(c=0);return b?Prototype.Selector.find(a.nextSiblings(),b,c):(Object.isNumber(c),a.recursivelyCollect("nextSibling",c+1)[c])},select:function(a){var a=$(a), b=Array.prototype.slice.call(arguments,1).join(", ");return Prototype.Selector.select(b,a)},adjacent:function(a){var a=$(a),b=Array.prototype.slice.call(arguments,1).join(", ");return Prototype.Selector.select(b,a.parentNode).without(a)},identify:function(a){var a=$(a),b=Element.readAttribute(a,"id");if(b)return b;do b="anonymous_element_"+Element.idCounter++;while($(b));Element.writeAttribute(a,"id",b);return b},readAttribute:function(a,b){a=$(a);if(Prototype.Browser.IE){var c=Element._attributeTranslations.read; if(c.values[b])return c.values[b](a,b);c.names[b]&&(b=c.names[b]);if(b.include(":"))return!a.attributes||!a.attributes[b]?null:a.attributes[b].value}return a.getAttribute(b)},writeAttribute:function(a,b,c){var a=$(a),d={},g=Element._attributeTranslations.write;typeof b=="object"?d=b:d[b]=Object.isUndefined(c)?!0:c;for(var f in d)b=g.names[f]||f,c=d[f],g.values[f]&&(b=g.values[f](a,c)),c===!1||c===null?a.removeAttribute(b):c===!0?a.setAttribute(b,b):a.setAttribute(b,c);return a},getHeight:function(a){return Element.getDimensions(a).height}, getWidth:function(a){return Element.getDimensions(a).width},classNames:function(a){return new Element.ClassNames(a)},hasClassName:function(a,b){if(a=$(a)){var c=a.className;return c.length>0&&(c==b||RegExp("(^|\\s)"+b+"(\\s|$)").test(c))}},addClassName:function(a,b){if(a=$(a))return Element.hasClassName(a,b)||(a.className+=(a.className?" ":"")+b),a},removeClassName:function(a,b){if(a=$(a))return a.className=a.className.replace(RegExp("(^|\\s+)"+b+"(\\s+|$)")," ").strip(),a},toggleClassName:function(a, b){return!(a=$(a))?void 0:Element[Element.hasClassName(a,b)?"removeClassName":"addClassName"](a,b)},cleanWhitespace:function(a){for(var a=$(a),b=a.firstChild;b;){var c=b.nextSibling;b.nodeType==3&&!/\S/.test(b.nodeValue)&&a.removeChild(b);b=c}return a},empty:function(a){return $(a).innerHTML.blank()},descendantOf:function(a,b){a=$(a);b=$(b);if(a.compareDocumentPosition)return(a.compareDocumentPosition(b)&8)===8;if(b.contains)return b.contains(a)&&b!==a;for(;a=a.parentNode;)if(a==b)return!0;return!1}, scrollTo:function(a){var a=$(a),b=Element.cumulativeOffset(a);window.scrollTo(b[0],b[1]);return a},getStyle:function(a,b){var a=$(a),b=b=="float"?"cssFloat":b.camelize(),c=a.style[b];if(!c||c=="auto")c=(c=document.defaultView.getComputedStyle(a,null))?c[b]:null;return b=="opacity"?c?parseFloat(c):1:c=="auto"?null:c},getOpacity:function(a){return $(a).getStyle("opacity")},setStyle:function(a,b){var a=$(a),c=a.style;if(Object.isString(b))return a.style.cssText+=";"+b,b.include("opacity")?a.setOpacity(b.match(/opacity:\s*(\d?\.?\d*)/)[1]): a;for(var d in b)d=="opacity"?a.setOpacity(b[d]):c[d=="float"||d=="cssFloat"?Object.isUndefined(c.styleFloat)?"cssFloat":"styleFloat":d]=b[d];return a},setOpacity:function(a,b){a=$(a);a.style.opacity=b==1||b===""?"":b<1.0E-5?0:b;return a},makePositioned:function(a){var a=$(a),b=Element.getStyle(a,"position");if(b=="static"||!b)if(a._madePositioned=!0,a.style.position="relative",Prototype.Browser.Opera)a.style.top=0,a.style.left=0;return a},undoPositioned:function(a){a=$(a);if(a._madePositioned)a._madePositioned= void 0,a.style.position=a.style.top=a.style.left=a.style.bottom=a.style.right="";return a},makeClipping:function(a){a=$(a);if(a._overflow)return a;a._overflow=Element.getStyle(a,"overflow")||"auto";if(a._overflow!=="hidden")a.style.overflow="hidden";return a},undoClipping:function(a){a=$(a);if(!a._overflow)return a;a.style.overflow=a._overflow=="auto"?"":a._overflow;a._overflow=null;return a},clonePosition:function(a,b,c){var c=Object.extend({setLeft:!0,setTop:!0,setWidth:!0,setHeight:!0,offsetTop:0, offsetLeft:0},c||{}),b=$(b),d=Element.viewportOffset(b),g=[0,0],f=null,a=$(a);Element.getStyle(a,"position")=="absolute"&&(f=Element.getOffsetParent(a),g=Element.viewportOffset(f));f==document.body&&(g[0]-=document.body.offsetLeft,g[1]-=document.body.offsetTop);if(c.setLeft)a.style.left=d[0]-g[0]+c.offsetLeft+"px";if(c.setTop)a.style.top=d[1]-g[1]+c.offsetTop+"px";if(c.setWidth)a.style.width=b.offsetWidth+"px";if(c.setHeight)a.style.height=b.offsetHeight+"px";return a}}; Object.extend(Element.Methods,{getElementsBySelector:Element.Methods.select,childElements:Element.Methods.immediateDescendants});Element._attributeTranslations={write:{names:{className:"class",htmlFor:"for"},values:{}}}; if(Prototype.Browser.Opera)Element.Methods.getStyle=Element.Methods.getStyle.wrap(function(a,b,c){switch(c){case "height":case "width":if(!Element.visible(b))return null;var d=parseInt(a(b,c),10);return d!==b["offset"+c.capitalize()]?d+"px":(c==="height"?["border-top-width","padding-top","padding-bottom","border-bottom-width"]:["border-left-width","padding-left","padding-right","border-right-width"]).inject(d,function(c,d){var e=a(b,d);return e===null?c:c-parseInt(e,10)})+"px";default:return a(b, c)}}),Element.Methods.readAttribute=Element.Methods.readAttribute.wrap(function(a,b,c){return c==="title"?b.title:a(b,c)});else if(Prototype.Browser.IE)Element.Methods.getStyle=function(a,b){var a=$(a),b=b=="float"||b=="cssFloat"?"styleFloat":b.camelize(),c=a.style[b];!c&&a.currentStyle&&(c=a.currentStyle[b]);return b=="opacity"?(c=(a.getStyle("filter")||"").match(/alpha\(opacity=(.*)\)/))&&c[1]?parseFloat(c[1])/100:1:c=="auto"?(b=="width"||b=="height")&&a.getStyle("display")!="none"?a["offset"+b.capitalize()]+ "px":null:c},Element.Methods.setOpacity=function(a,b){var a=$(a),c=a.currentStyle;if(c&&!c.hasLayout||!c&&a.style.zoom=="normal")a.style.zoom=1;var c=a.getStyle("filter"),d=a.style;if(b==1||b==="")return(c=c.replace(/alpha\([^\)]*\)/gi,""))?d.filter=c:d.removeAttribute("filter"),a;else b<1.0E-5&&(b=0);d.filter=c.replace(/alpha\([^\)]*\)/gi,"")+"alpha(opacity="+b*100+")";return a},Element._attributeTranslations=function(){var a="className",b="for",c=document.createElement("div");c.setAttribute(a,"x"); c.className!=="x"&&(c.setAttribute("class","x"),c.className==="x"&&(a="class"));c=null;c=document.createElement("label");c.setAttribute(b,"x");c.htmlFor!=="x"&&(c.setAttribute("htmlFor","x"),c.htmlFor==="x"&&(b="htmlFor"));c=null;return{read:{names:{"class":a,className:a,"for":b,htmlFor:b},values:{_getAttr:function(a,b){return a.getAttribute(b)},_getAttr2:function(a,b){return a.getAttribute(b,2)},_getAttrNode:function(a,b){var c=a.getAttributeNode(b);return c?c.value:""},_getEv:function(){var a=document.createElement("div"), b;a.onclick=Prototype.emptyFunction;a=a.getAttribute("onclick");String(a).indexOf("{")>-1?b=function(a,b){b=a.getAttribute(b);if(!b)return null;b=b.toString();b=b.split("{")[1];b=b.split("}")[0];return b.strip()}:a===""&&(b=function(a,b){b=a.getAttribute(b);return!b?null:b.strip()});a=null;return b}(),_flag:function(a,b){return $(a).hasAttribute(b)?b:null},style:function(a){return a.style.cssText.toLowerCase()},title:function(a){return a.title}}}}}(),Element._attributeTranslations.write={names:Object.extend({cellpadding:"cellPadding", cellspacing:"cellSpacing"},Element._attributeTranslations.read.names),values:{checked:function(a,b){a.checked=!!b},style:function(a,b){a.style.cssText=b?b:""}}},Element._attributeTranslations.has={},$w("colSpan rowSpan vAlign dateTime accessKey tabIndex encType maxLength readOnly longDesc frameBorder").each(function(a){Element._attributeTranslations.write.names[a.toLowerCase()]=a;Element._attributeTranslations.has[a.toLowerCase()]=a}),function(a){Object.extend(a,{href:a._getAttr2,src:a._getAttr2, type:a._getAttr,action:a._getAttrNode,disabled:a._flag,checked:a._flag,readonly:a._flag,multiple:a._flag,onload:a._getEv,onunload:a._getEv,onclick:a._getEv,ondblclick:a._getEv,onmousedown:a._getEv,onmouseup:a._getEv,onmouseover:a._getEv,onmousemove:a._getEv,onmouseout:a._getEv,onfocus:a._getEv,onblur:a._getEv,onkeypress:a._getEv,onkeydown:a._getEv,onkeyup:a._getEv,onsubmit:a._getEv,onreset:a._getEv,onselect:a._getEv,onchange:a._getEv})}(Element._attributeTranslations.read.values),Prototype.BrowserFeatures.ElementExtensions&& function(){Element.Methods.down=function(a,b,c){var a=$(a),d;if(arguments.length==1)d=a.firstDescendant();else if(Object.isNumber(b)){d=a.getElementsByTagName("*");for(var g=[],f=0,e;e=d[f];f++)e.tagName!=="!"&&g.push(e);d=g[b]}else d=Element.select(a,b)[c||0];return d}}();else if(Prototype.Browser.Gecko&&/rv:1\.8\.0/.test(navigator.userAgent))Element.Methods.setOpacity=function(a,b){a=$(a);a.style.opacity=b==1?0.999999:b===""?"":b<1.0E-5?0:b;return a};else if(Prototype.Browser.WebKit)Element.Methods.setOpacity= function(a,b){a=$(a);a.style.opacity=b==1||b===""?"":b<1.0E-5?0:b;if(b==1)if(a.tagName.toUpperCase()=="IMG"&&a.width)a.width++,a.width--;else try{var c=document.createTextNode(" ");a.appendChild(c);a.removeChild(c)}catch(d){}return a}; if("outerHTML"in document.documentElement)Element.Methods.replace=function(a,b){a=$(a);b&&b.toElement&&(b=b.toElement());if(Object.isElement(b))return a.parentNode.replaceChild(b,a),a;var b=Object.toHTML(b),c=a.parentNode,d=c.tagName.toUpperCase();if(Element._insertionTranslations.tags[d]){var g=a.next(),d=Element._getContentFromAnonymousElement(d,b.stripScripts());c.removeChild(a);g?d.each(function(a){c.insertBefore(a,g)}):d.each(function(a){c.appendChild(a)})}else a.outerHTML=b.stripScripts();b.evalScripts.bind(b).defer(); return a};Element._returnOffset=function(a,b){var c=[a,b];c.left=a;c.top=b;return c};Element._getContentFromAnonymousElement=function(a,b,c){var d=new Element("div"),a=Element._insertionTranslations.tags[a],g=!1;a?g=!0:c&&(g=!0,a=["","",0]);if(g){d.innerHTML="&nbsp;"+a[0]+b+a[1];d.removeChild(d.firstChild);for(b=a[2];b--;)d=d.firstChild}else d.innerHTML=b;return $A(d.childNodes)}; Element._insertionTranslations={before:function(a,b){a.parentNode.insertBefore(b,a)},top:function(a,b){a.insertBefore(b,a.firstChild)},bottom:function(a,b){a.appendChild(b)},after:function(a,b){a.parentNode.insertBefore(b,a.nextSibling)},tags:{TABLE:["<table>","</table>",1],TBODY:["<table><tbody>","</tbody></table>",2],TR:["<table><tbody><tr>","</tr></tbody></table>",3],TD:["<table><tbody><tr><td>","</td></tr></tbody></table>",4],SELECT:["<select>","</select>",1]}}; (function(){var a=Element._insertionTranslations.tags;Object.extend(a,{THEAD:a.TBODY,TFOOT:a.TBODY,TH:a.TD})})();Element.Methods.Simulated={hasAttribute:function(a,b){var b=Element._attributeTranslations.has[b]||b,c=$(a).getAttributeNode(b);return!(!c||!c.specified)}};Element.Methods.ByTag={};Object.extend(Element,Element.Methods); (function(a){if(!Prototype.BrowserFeatures.ElementExtensions&&a.__proto__)window.HTMLElement={},window.HTMLElement.prototype=a.__proto__,Prototype.BrowserFeatures.ElementExtensions=!0})(document.createElement("div")); Element.extend=function(){function a(a,b){for(var e in b){var c=b[e];Object.isFunction(c)&&!(e in a)&&(a[e]=c.methodize())}}var b=function(a){if(typeof window.Element!="undefined"){var b=window.Element.prototype;if(b){var e="_"+(Math.random()+"").slice(2),a=document.createElement(a);b[e]="x";a=a[e]!=="x";delete b[e];return a}}return!1}("object");if(Prototype.BrowserFeatures.SpecificElementExtensions)return b?function(b){if(b&&typeof b._extendedByPrototype=="undefined"){var c=b.tagName;c&&/^(?:object|applet|embed)$/i.test(c)&& (a(b,Element.Methods),a(b,Element.Methods.Simulated),a(b,Element.Methods.ByTag[c.toUpperCase()]))}return b}:Prototype.K;var c={},d=Element.Methods.ByTag,b=Object.extend(function(b){if(!b||typeof b._extendedByPrototype!="undefined"||b.nodeType!=1||b==window)return b;var f=Object.clone(c),e=b.tagName.toUpperCase();d[e]&&Object.extend(f,d[e]);a(b,f);b._extendedByPrototype=Prototype.emptyFunction;return b},{refresh:function(){Prototype.BrowserFeatures.ElementExtensions||(Object.extend(c,Element.Methods), Object.extend(c,Element.Methods.Simulated))}});b.refresh();return b}();Element.hasAttribute=document.documentElement.hasAttribute?function(a,b){return a.hasAttribute(b)}:Element.Methods.Simulated.hasAttribute; Element.addMethods=function(a){function b(b){b=b.toUpperCase();Element.Methods.ByTag[b]||(Element.Methods.ByTag[b]={});Object.extend(Element.Methods.ByTag[b],a)}function c(a,b,c){var c=c||!1,e;for(e in a){var d=a[e];if(Object.isFunction(d)&&(!c||!(e in b)))b[e]=d.methodize()}}function d(a){var b,e={OPTGROUP:"OptGroup",TEXTAREA:"TextArea",P:"Paragraph",FIELDSET:"FieldSet",UL:"UList",OL:"OList",DL:"DList",DIR:"Directory",H1:"Heading",H2:"Heading",H3:"Heading",H4:"Heading",H5:"Heading",H6:"Heading", Q:"Quote",INS:"Mod",DEL:"Mod",A:"Anchor",IMG:"Image",CAPTION:"TableCaption",COL:"TableCol",COLGROUP:"TableCol",THEAD:"TableSection",TFOOT:"TableSection",TBODY:"TableSection",TR:"TableRow",TH:"TableCell",TD:"TableCell",FRAMESET:"FrameSet",IFRAME:"IFrame"};e[a]&&(b="HTML"+e[a]+"Element");if(window[b])return window[b];b="HTML"+a+"Element";if(window[b])return window[b];b="HTML"+a.capitalize()+"Element";if(window[b])return window[b];a=document.createElement(a);return a.__proto__||a.constructor.prototype} var g=Prototype.BrowserFeatures,f=Element.Methods.ByTag;a||(Object.extend(Form,Form.Methods),Object.extend(Form.Element,Form.Element.Methods),Object.extend(Element.Methods.ByTag,{FORM:Object.clone(Form.Methods),INPUT:Object.clone(Form.Element.Methods),SELECT:Object.clone(Form.Element.Methods),TEXTAREA:Object.clone(Form.Element.Methods),BUTTON:Object.clone(Form.Element.Methods)}));if(arguments.length==2)var e=a,a=arguments[1];e?Object.isArray(e)?e.each(b):b(e):Object.extend(Element.Methods,a||{}); e=window.HTMLElement?HTMLElement.prototype:Element.prototype;g.ElementExtensions&&(c(Element.Methods,e),c(Element.Methods.Simulated,e,!0));if(g.SpecificElementExtensions)for(var i in Element.Methods.ByTag)g=d(i),Object.isUndefined(g)||c(f[i],g.prototype);Object.extend(Element,Element.Methods);delete Element.ByTag;Element.extend.refresh&&Element.extend.refresh();Element.cache={}}; document.viewport={getDimensions:function(){return{width:this.getWidth(),height:this.getHeight()}},getScrollOffsets:function(){return Element._returnOffset(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)}}; (function(a){function b(b){g||(g=c.WebKit&&!d.evaluate?document:c.Opera&&window.parseFloat(window.opera.version())<9.5?document.body:document.documentElement);f[b]="client"+b;a["get"+b]=function(){return g[f[b]]};return a["get"+b]()}var c=Prototype.Browser,d=document,g,f={};a.getWidth=b.curry("Width");a.getHeight=b.curry("Height")})(document.viewport);Element.Storage={UID:1}; Element.addMethods({getStorage:function(a){if(a=$(a)){if(a===window)a=0;else{if(typeof a._prototypeUID==="undefined")a._prototypeUID=Element.Storage.UID++;a=a._prototypeUID}Element.Storage[a]||(Element.Storage[a]=$H());return Element.Storage[a]}},store:function(a,b,c){if(a=$(a))return arguments.length===2?Element.getStorage(a).update(b):Element.getStorage(a).set(b,c),a},retrieve:function(a,b,c){if(a=$(a)){var a=Element.getStorage(a),d=a.get(b);Object.isUndefined(d)&&(a.set(b,c),d=c);return d}},clone:function(a, b){if(a=$(a)){var c=a.cloneNode(b);c._prototypeUID=void 0;if(b)for(var d=Element.select(c,"*"),g=d.length;g--;)d[g]._prototypeUID=void 0;return Element.extend(c)}},purge:function(a){if(a=$(a)){var b=Element._purgeElement;b(a);for(var a=a.getElementsByTagName("*"),c=a.length;c--;)b(a[c]);return null}}}); (function(){function a(a,b,c){var d=null;Object.isElement(a)&&(d=a,a=d.getStyle(b));if(a===null)return null;if(/^(?:-)?\d+(\.\d+)?(px)?$/i.test(a))return window.parseFloat(a);var f=a.include("%"),g=c===document.viewport;if(/\d/.test(a)&&d&&d.runtimeStyle&&(!f||!g))return c=d.style.left,b=d.runtimeStyle.left,d.runtimeStyle.left=d.currentStyle.left,d.style.left=a||0,a=d.style.pixelLeft,d.style.left=c,d.runtimeStyle.left=b,a;return d&&f?(c=c||d.parentNode,a=a.match(/^(\d+)%?$/i),a=!a?null:Number(a[1])/ 100,f=null,d.getStyle("position"),d=b.include("left")||b.include("right")||b.include("width"),b=b.include("top")||b.include("bottom")||b.include("height"),c===document.viewport?d?f=document.viewport.getWidth():b&&(f=document.viewport.getHeight()):d?f=$(c).measure("width"):b&&(f=$(c).measure("height")),f===null?0:f*a):0}function b(a){a=$(a);if(a.nodeType===Node.DOCUMENT_NODE||g(a)||a.nodeName.toUpperCase()==="BODY"||a.nodeName.toUpperCase()==="HTML")return $(document.body);if(Element.getStyle(a,"display")!== "inline"&&a.offsetParent)return $(a.offsetParent);for(;(a=a.parentNode)&&a!==document.body;)if(Element.getStyle(a,"position")!=="static")return a.nodeName.toUpperCase()==="HTML"?$(document.body):$(a);return $(document.body)}function c(a){var a=$(a),b=0,c=0;if(a.parentNode){do b+=a.offsetTop||0,c+=a.offsetLeft||0,a=a.offsetParent;while(a)}return new Element.Offset(c,b)}function d(a){var a=$(a),b=a.getLayout(),c=0,d=0;do if(c+=a.offsetTop||0,d+=a.offsetLeft||0,a=a.offsetParent){if(a.nodeName.toUpperCase()=== "BODY")break;if(Element.getStyle(a,"position")!=="static")break}while(a);d-=b.get("margin-top");c-=b.get("margin-left");return new Element.Offset(d,c)}function g(a){return a!==document.body&&!Element.descendantOf(a,document.body)}var f=Prototype.K;"currentStyle"in document.documentElement&&(f=function(a){if(!a.currentStyle.hasLayout)a.style.zoom=1;return a});Element.Layout=Class.create(Hash,{initialize:function($super,a,b){$super();this.element=$(a);Element.Layout.PROPERTIES.each(function(a){this._set(a, null)},this);if(b)this._preComputing=!0,this._begin(),Element.Layout.PROPERTIES.each(this._compute,this),this._end(),this._preComputing=!1},_set:function(a,b){return Hash.prototype.set.call(this,a,b)},set:function(){throw"Properties of Element.Layout are read-only.";},get:function($super,a){var b=$super(a);return b===null?this._compute(a):b},_begin:function(){if(!this._prepared){var b=this.element,c;a:{for(c=b;c&&c.parentNode;){if(c.getStyle("display")==="none"){c=!1;break a}c=$(c.parentNode)}c=!0}if(!c){b.store("prototype_original_styles", {position:b.style.position||"",width:b.style.width||"",visibility:b.style.visibility||"",display:b.style.display||""});c=b.getStyle("position");var d=b.getStyle("width");if(d==="0px"||d===null)b.style.display="block",d=b.getStyle("width");var f=c==="fixed"?document.viewport:b.parentNode;b.setStyle({position:"absolute",visibility:"hidden",display:"block"});var g=b.getStyle("width");c=d&&g===d?a(b,"width",f):c==="absolute"||c==="fixed"?a(b,"width",f):$(b.parentNode).getLayout().get("width")-this.get("margin-left")- this.get("border-left")-this.get("padding-left")-this.get("padding-right")-this.get("border-right")-this.get("margin-right");b.setStyle({width:c+"px"})}this._prepared=!0}},_end:function(){var a=this.element,b=a.retrieve("prototype_original_styles");a.store("prototype_original_styles",null);a.setStyle(b);this._prepared=!1},_compute:function(a){var b=Element.Layout.COMPUTATIONS;if(!(a in b))throw"Property not found.";return this._set(a,b[a].call(this,this.element))},toObject:function(){var a=$A(arguments), b={};(a.length===0?Element.Layout.PROPERTIES:a.join(" ").split(" ")).each(function(a){if(Element.Layout.PROPERTIES.include(a)){var c=this.get(a);c!=null&&(b[a]=c)}},this);return b},toHash:function(){var a=this.toObject.apply(this,arguments);return new Hash(a)},toCSS:function(){var a=$A(arguments),b={};(a.length===0?Element.Layout.PROPERTIES:a.join(" ").split(" ")).each(function(a){if(Element.Layout.PROPERTIES.include(a)&&!Element.Layout.COMPOSITE_PROPERTIES.include(a)){var c=this.get(a);if(c!=null){var e= b;a.include("border")&&(a+="-width");a=a.camelize();e[a]=c+"px"}}},this);return b},inspect:function(){return"#<Element.Layout>"}});Object.extend(Element.Layout,{PROPERTIES:$w("height width top left right bottom border-left border-right border-top border-bottom padding-left padding-right padding-top padding-bottom margin-top margin-bottom margin-left margin-right padding-box-width padding-box-height border-box-width border-box-height margin-box-width margin-box-height"),COMPOSITE_PROPERTIES:$w("padding-box-width padding-box-height margin-box-width margin-box-height border-box-width border-box-height"), COMPUTATIONS:{height:function(){this._preComputing||this._begin();var a=this.get("border-box-height");if(a<=0)return this._preComputing||this._end(),0;var b=this.get("border-top"),c=this.get("border-bottom"),d=this.get("padding-top"),f=this.get("padding-bottom");this._preComputing||this._end();return a-b-c-d-f},width:function(){this._preComputing||this._begin();var a=this.get("border-box-width");if(a<=0)return this._preComputing||this._end(),0;var b=this.get("border-left"),c=this.get("border-right"), d=this.get("padding-left"),f=this.get("padding-right");this._preComputing||this._end();return a-b-c-d-f},"padding-box-height":function(){var a=this.get("height"),b=this.get("padding-top"),c=this.get("padding-bottom");return a+b+c},"padding-box-width":function(){var a=this.get("width"),b=this.get("padding-left"),c=this.get("padding-right");return a+b+c},"border-box-height":function(a){this._preComputing||this._begin();a=a.offsetHeight;this._preComputing||this._end();return a},"border-box-width":function(a){this._preComputing|| this._begin();a=a.offsetWidth;this._preComputing||this._end();return a},"margin-box-height":function(){var a=this.get("border-box-height"),b=this.get("margin-top"),c=this.get("margin-bottom");return a<=0?0:a+b+c},"margin-box-width":function(){var a=this.get("border-box-width"),b=this.get("margin-left"),c=this.get("margin-right");return a<=0?0:a+b+c},top:function(a){return a.positionedOffset().top},bottom:function(a){var b=a.positionedOffset(),a=a.getOffsetParent().measure("height"),c=this.get("border-box-height"); return a-c-b.top},left:function(a){return a.positionedOffset().left},right:function(a){var b=a.positionedOffset(),a=a.getOffsetParent().measure("width"),c=this.get("border-box-width");return a-c-b.left},"padding-top":function(b){return a(b,"paddingTop")},"padding-bottom":function(b){return a(b,"paddingBottom")},"padding-left":function(b){return a(b,"paddingLeft")},"padding-right":function(b){return a(b,"paddingRight")},"border-top":function(b){return a(b,"borderTopWidth")},"border-bottom":function(b){return a(b, "borderBottomWidth")},"border-left":function(b){return a(b,"borderLeftWidth")},"border-right":function(b){return a(b,"borderRightWidth")},"margin-top":function(b){return a(b,"marginTop")},"margin-bottom":function(b){return a(b,"marginBottom")},"margin-left":function(b){return a(b,"marginLeft")},"margin-right":function(b){return a(b,"marginRight")}}});"getBoundingClientRect"in document.documentElement&&Object.extend(Element.Layout.COMPUTATIONS,{right:function(a){var b=f(a.getOffsetParent()),a=a.getBoundingClientRect(); return(b.getBoundingClientRect().right-a.right).round()},bottom:function(a){var b=f(a.getOffsetParent()),a=a.getBoundingClientRect();return(b.getBoundingClientRect().bottom-a.bottom).round()}});Element.Offset=Class.create({initialize:function(a,b){this.left=a.round();this.top=b.round();this[0]=this.left;this[1]=this.top},relativeTo:function(a){return new Element.Offset(this.left-a.left,this.top-a.top)},inspect:function(){return"#<Element.Offset left: #{left} top: #{top}>".interpolate(this)},toString:function(){return"[#{left}, #{top}]".interpolate(this)}, toArray:function(){return[this.left,this.top]}});Prototype.Browser.IE?(b=b.wrap(function(a,b){b=$(b);if(b.nodeType===Node.DOCUMENT_NODE||g(b)||b.nodeName.toUpperCase()==="BODY"||b.nodeName.toUpperCase()==="HTML")return $(document.body);var c=b.getStyle("position");if(c!=="static")return a(b);b.setStyle({position:"relative"});var d=a(b);b.setStyle({position:c});return d}),d=d.wrap(function(a,b){b=$(b);if(!b.parentNode)return new Element.Offset(0,0);var c=b.getStyle("position");if(c!=="static")return a(b); var d=b.getOffsetParent();d&&d.getStyle("position")==="fixed"&&f(d);b.setStyle({position:"relative"});d=a(b);b.setStyle({position:c});return d})):Prototype.Browser.Webkit&&(c=function(a){var a=$(a),b=0,c=0;do{b+=a.offsetTop||0;c+=a.offsetLeft||0;if(a.offsetParent==document.body&&Element.getStyle(a,"position")=="absolute")break;a=a.offsetParent}while(a);return new Element.Offset(c,b)});Element.addMethods({getLayout:function(a,b){return new Element.Layout(a,b)},measure:function(a,b){return $(a).getLayout().get(b)}, getDimensions:function(a){var a=$(a),b=Element.getStyle(a,"display");if(b&&b!=="none")return{width:a.offsetWidth,height:a.offsetHeight};var b=a.style,b={visibility:b.visibility,position:b.position,display:b.display},c={visibility:"hidden",display:"block"};if(b.position!=="fixed")c.position="absolute";Element.setStyle(a,c);c={width:a.offsetWidth,height:a.offsetHeight};Element.setStyle(a,b);return c},getOffsetParent:b,cumulativeOffset:c,positionedOffset:d,cumulativeScrollOffset:function(a){var b=0, c=0;do b+=a.scrollTop||0,c+=a.scrollLeft||0,a=a.parentNode;while(a);return new Element.Offset(c,b)},viewportOffset:function(a){$(f);var b=0,c=0,d=document.body,f=a;do if(b+=f.offsetTop||0,c+=f.offsetLeft||0,f.offsetParent==d&&Element.getStyle(f,"position")=="absolute")break;while(f=f.offsetParent);f=a;do f!=d&&(b-=f.scrollTop||0,c-=f.scrollLeft||0);while(f=f.parentNode);return new Element.Offset(c,b)},absolutize:function(a){a=$(a);if(Element.getStyle(a,"position")==="absolute")return a;var c=b(a), d=a.viewportOffset(),c=c.viewportOffset(),d=d.relativeTo(c),c=a.getLayout();a.store("prototype_absolutize_original_styles",{left:a.getStyle("left"),top:a.getStyle("top"),width:a.getStyle("width"),height:a.getStyle("height")});a.setStyle({position:"absolute",top:d.top+"px",left:d.left+"px",width:c.get("width")+"px",height:c.get("height")+"px"});return a},relativize:function(a){a=$(a);if(Element.getStyle(a,"position")==="relative")return a;var b=a.retrieve("prototype_absolutize_original_styles");b&& a.setStyle(b);return a}});"getBoundingClientRect"in document.documentElement&&Element.addMethods({viewportOffset:function(a){a=$(a);if(g(a))return new Element.Offset(0,0);var a=a.getBoundingClientRect(),b=document.documentElement;return new Element.Offset(a.left-b.clientLeft,a.top-b.clientTop)}})})();window.$$=function(){var a=$A(arguments).join(", ");return Prototype.Selector.select(a,document)}; Prototype.Selector=function(){function a(a){for(var b=0,g=a.length;b<g;b++)Element.extend(a[b]);return a}var b=Prototype.K;return{select:function(){throw Error('Method "Prototype.Selector.select" must be defined.');},match:function(){throw Error('Method "Prototype.Selector.match" must be defined.');},find:function(a,b,g){var g=g||0,f=Prototype.Selector.match,e=a.length,i=0,h;for(h=0;h<e;h++)if(f(a[h],b)&&g==i++)return Element.extend(a[h])},extendElements:Element.extend===b?b:a,extendElement:Element.extend}}(); (function(){function a(a,b,c,d,e,f){for(var e=a=="previousSibling"&&!f,j=0,g=d.length;j<g;j++){var h=d[j];if(h){if(e&&h.nodeType===1)h.sizcache=c,h.sizset=j;for(var h=h[a],i=!1;h;){if(h.sizcache===c){i=d[h.sizset];break}if(h.nodeType===1&&!f)h.sizcache=c,h.sizset=j;if(h.nodeName===b){i=h;break}h=h[a]}d[j]=i}}}function b(a,b,c,d,e,f){for(var e=a=="previousSibling"&&!f,j=0,g=d.length;j<g;j++){var h=d[j];if(h){if(e&&h.nodeType===1)h.sizcache=c,h.sizset=j;for(var h=h[a],l=!1;h;){if(h.sizcache===c){l= d[h.sizset];break}if(h.nodeType===1){if(!f)h.sizcache=c,h.sizset=j;if(typeof b!=="string"){if(h===b){l=!0;break}}else if(i.filter(b,[h]).length>0){l=h;break}}h=h[a]}d[j]=l}}}var c=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d=0,g=Object.prototype.toString,f=!1,e=!0;[0,0].sort(function(){e=!1;return 0});var i=function(a,b,d,e){var d=d||[],f=b=b||document;if(b.nodeType!==1&&b.nodeType!==9)return[];if(!a||typeof a!== "string")return d;for(var m=[],j,t,o,n,D=!0,A=r(b),u=a;(c.exec(""),j=c.exec(u))!==null;)if(u=j[3],m.push(j[1]),j[2]){n=j[3];break}if(m.length>1&&l.exec(a))if(m.length===2&&h.relative[m[0]])t=v(m[0]+m[1],b);else for(t=h.relative[m[0]]?[b]:i(m.shift(),b);m.length;)a=m.shift(),h.relative[a]&&(a+=m.shift()),t=v(a,t);else if(!e&&m.length>1&&b.nodeType===9&&!A&&h.match.ID.test(m[0])&&!h.match.ID.test(m[m.length-1])&&(j=i.find(m.shift(),b,A),b=j.expr?i.filter(j.expr,j.set)[0]:j.set[0]),b){j=e?{expr:m.pop(), set:k(e)}:i.find(m.pop(),m.length===1&&(m[0]==="~"||m[0]==="+")&&b.parentNode?b.parentNode:b,A);t=j.expr?i.filter(j.expr,j.set):j.set;for(m.length>0?o=k(t):D=!1;m.length;){var s=m.pop();j=s;h.relative[s]?j=m.pop():s="";j==null&&(j=b);h.relative[s](o,j,A)}}else o=[];o||(o=t);if(!o)throw"Syntax error, unrecognized expression: "+(s||a);if(g.call(o)==="[object Array]")if(D)if(b&&b.nodeType===1)for(a=0;o[a]!=null;a++)o[a]&&(o[a]===!0||o[a].nodeType===1&&q(b,o[a]))&&d.push(t[a]);else for(a=0;o[a]!=null;a++)o[a]&& o[a].nodeType===1&&d.push(t[a]);else d.push.apply(d,o);else k(o,d);n&&(i(n,f,d,e),i.uniqueSort(d));return d};i.uniqueSort=function(a){if(p&&(f=e,a.sort(p),f))for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1);return a};i.matches=function(a,b){return i(a,null,null,b)};i.find=function(a,b,c){var d,e;if(!a)return[];for(var f=0,j=h.order.length;f<j;f++){var g=h.order[f];if(e=h.leftMatch[g].exec(a)){var i=e[1];e.splice(1,1);if(i.substr(i.length-1)!=="\\"&&(e[1]=(e[1]||"").replace(/\\/g,""),d=h.find[g](e, b,c),d!=null)){a=a.replace(h.match[g],"");break}}}d||(d=b.getElementsByTagName("*"));return{set:d,expr:a}};i.filter=function(a,b,c,d){for(var e=a,f=[],j=b,g,i,l=b&&b[0]&&r(b[0]);a&&b.length;){for(var k in h.filter)if((g=h.match[k].exec(a))!=null){var n=h.filter[k],u,s;i=!1;j==f&&(f=[]);if(h.preFilter[k])if(g=h.preFilter[k](g,j,c,f,d,l)){if(g===!0)continue}else i=u=!0;if(g)for(var p=0;(s=j[p])!=null;p++)if(s){u=n(s,g,p,j);var q=d^!!u;c&&u!=null?q?i=!0:j[p]=!1:q&&(f.push(s),i=!0)}if(u!==void 0){c|| (j=f);a=a.replace(h.match[k],"");if(!i)return[];break}}if(a==e)if(i==null)throw"Syntax error, unrecognized expression: "+a;else break;e=a}return j};var h=i.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/, POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")}},relative:{"+":function(a,b,c){var d=typeof b==="string",e=d&&!/\W/.test(b),d=d&&!e;e&&!c&&(b=b.toUpperCase());for(var c=0,e=a.length,f;c<e;c++)if(f=a[c]){for(;(f=f.previousSibling)&&f.nodeType!==1;);a[c]=d||f&&f.nodeName===b?f|| !1:f===b}d&&i.filter(b,a,!0)},">":function(a,b,c){var d=typeof b==="string";if(d&&!/\W/.test(b))for(var b=c?b:b.toUpperCase(),c=0,e=a.length;c<e;c++){var f=a[c];if(f)d=f.parentNode,a[c]=d.nodeName===b?d:!1}else{c=0;for(e=a.length;c<e;c++)(f=a[c])&&(a[c]=d?f.parentNode:f.parentNode===b);d&&i.filter(b,a,!0)}},"":function(c,e,f){var g=d++,h=b;if(!/\W/.test(e))var i=e=f?e:e.toUpperCase(),h=a;h("parentNode",e,g,c,i,f)},"~":function(c,e,f){var g=d++,h=b;if(typeof e==="string"&&!/\W/.test(e))var i=e=f?e: e.toUpperCase(),h=a;h("previousSibling",e,g,c,i,f)}},find:{ID:function(a,b,c){if(typeof b.getElementById!=="undefined"&&!c)return(a=b.getElementById(a[1]))?[a]:[]},NAME:function(a,b){if(typeof b.getElementsByName!=="undefined"){for(var c=[],d=b.getElementsByName(a[1]),e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(/\\/g,"")+" ";if(f)return a; for(var f=0,j;(j=b[f])!=null;f++)j&&(e^(j.className&&(" "+j.className+" ").indexOf(a)>=0)?c||d.push(j):c&&(b[f]=!1));return!1},ID:function(a){return a[1].replace(/\\/g,"")},TAG:function(a,b){for(var c=0;b[c]===!1;c++);return b[c]&&r(b[c])?a[1]:a[1].toUpperCase()},CHILD:function(a){if(a[1]=="nth"){var b=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(a[2]=="even"&&"2n"||a[2]=="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0;a[3]=b[3]-0}a[0]=d++;return a},ATTR:function(a,b,c,d,e,f){b=a[1].replace(/\\/g, "");!f&&h.attrMap[b]&&(a[1]=h.attrMap[b]);a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(a,b,d,e,f){if(a[1]==="not")if((c.exec(a[3])||"").length>1||/^\w/.test(a[3]))a[3]=i(a[3],null,null,b);else return a=i.filter(a[3],b,d,1^f),d||e.push.apply(e,a),!1;else if(h.match.POS.test(a[0])||h.match.CHILD.test(a[0]))return!0;return a},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked=== !0},selected:function(a){return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!i(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){return"text"===a.type},radio:function(a){return"radio"===a.type},checkbox:function(a){return"checkbox"===a.type},file:function(a){return"file"===a.type},password:function(a){return"password"===a.type},submit:function(a){return"submit"===a.type},image:function(a){return"image"=== a.type},reset:function(a){return"reset"===a.type},button:function(a){return"button"===a.type||a.nodeName.toUpperCase()==="BUTTON"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0==b},eq:function(a,b,c){return c[3]- 0==b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=h.filters[e];if(f)return f(a,c,b,d);else if(e==="contains")return(a.textContent||a.innerText||"").indexOf(b[3])>=0;else if(e==="not"){b=b[3];c=0;for(d=b.length;c<d;c++)if(b[c]===a)return!1;return!0}},CHILD:function(a,b){var c=b[1],d=a;switch(c){case "only":case "first":for(;d=d.previousSibling;)if(d.nodeType===1)return!1;if(c=="first")return!0;d=a;case "last":for(;d=d.nextSibling;)if(d.nodeType===1)return!1;return!0;case "nth":var c=b[2],e=b[3]; if(c==1&&e==0)return!0;var f=b[0],j=a.parentNode;if(j&&(j.sizcache!==f||!a.nodeIndex)){for(var g=0,d=j.firstChild;d;d=d.nextSibling)if(d.nodeType===1)d.nodeIndex=++g;j.sizcache=f}d=a.nodeIndex-e;return c==0?d==0:d%c==0&&d/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],c=h.attrHandle[c]?h.attrHandle[c](a): a[c]!=null?a[c]:a.getAttribute(c),d=c+"",e=b[2],f=b[4];return c==null?e==="!=":e==="="?d===f:e==="*="?d.indexOf(f)>=0:e==="~="?(" "+d+" ").indexOf(f)>=0:!f?d&&c!==!1:e==="!="?d!=f:e==="^="?d.indexOf(f)===0:e==="$="?d.substr(d.length-f.length)===f:e==="|="?d===f||d.substr(0,f.length+1)===f+"-":!1},POS:function(a,b,c,d){var e=h.setFilters[b[2]];if(e)return e(a,c,b,d)}}},l=h.match.POS,n;for(n in h.match)h.match[n]=RegExp(h.match[n].source+/(?![^\[]*\])(?![^\(]*\))/.source),h.leftMatch[n]=RegExp(/(^(?:.|\r|\n)*?)/.source+ h.match[n].source);var k=function(a,b){a=Array.prototype.slice.call(a,0);return b?(b.push.apply(b,a),b):a};try{Array.prototype.slice.call(document.documentElement.childNodes,0)}catch(w){k=function(a,b){var c=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(c,a);else if(typeof a.length==="number")for(var d=0,e=a.length;d<e;d++)c.push(a[d]);else for(d=0;a[d];d++)c.push(a[d]);return c}}var p;document.documentElement.compareDocumentPosition?p=function(a,b){if(!a.compareDocumentPosition|| !b.compareDocumentPosition)return a==b&&(f=!0),0;var c=a.compareDocumentPosition(b)&4?-1:a===b?0:1;c===0&&(f=!0);return c}:"sourceIndex"in document.documentElement?p=function(a,b){if(!a.sourceIndex||!b.sourceIndex)return a==b&&(f=!0),0;var c=a.sourceIndex-b.sourceIndex;c===0&&(f=!0);return c}:document.createRange&&(p=function(a,b){if(!a.ownerDocument||!b.ownerDocument)return a==b&&(f=!0),0;var c=a.ownerDocument.createRange(),d=b.ownerDocument.createRange();c.setStart(a,0);c.setEnd(a,0);d.setStart(b, 0);d.setEnd(b,0);c=c.compareBoundaryPoints(Range.START_TO_END,d);c===0&&(f=!0);return c});(function(){var a=document.createElement("div"),b="script"+(new Date).getTime();a.innerHTML="<a name='"+b+"'/>";var c=document.documentElement;c.insertBefore(a,c.firstChild);if(document.getElementById(b))h.find.ID=function(a,b,c){if(typeof b.getElementById!=="undefined"&&!c)return(b=b.getElementById(a[1]))?b.id===a[1]||typeof b.getAttributeNode!=="undefined"&&b.getAttributeNode("id").nodeValue===a[1]?[b]:void 0: []},h.filter.ID=function(a,b){var c=typeof a.getAttributeNode!=="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b};c.removeChild(a);c=a=null})();(function(){var a=document.createElement("div");a.appendChild(document.createComment(""));if(a.getElementsByTagName("*").length>0)h.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){for(var d=[],e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c};a.innerHTML="<a href='#'></a>";if(a.firstChild&&typeof a.firstChild.getAttribute!== "undefined"&&a.firstChild.getAttribute("href")!=="#")h.attrHandle.href=function(a){return a.getAttribute("href",2)};a=null})();document.querySelectorAll&&function(){var a=i,b=document.createElement("div");b.innerHTML="<p class='TEST'></p>";if(!(b.querySelectorAll&&b.querySelectorAll(".TEST").length===0)){i=function(b,c,d,e){c=c||document;if(!e&&c.nodeType===9&&!r(c))try{return k(c.querySelectorAll(b),d)}catch(f){}return a(b,c,d,e)};for(var c in a)i[c]=a[c];b=null}}();document.getElementsByClassName&& document.documentElement.getElementsByClassName&&function(){var a=document.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(a.getElementsByClassName("e").length!==0&&(a.lastChild.className="e",a.getElementsByClassName("e").length!==1))h.order.splice(1,0,"CLASS"),h.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!=="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}();var q=document.compareDocumentPosition?function(a,b){return a.compareDocumentPosition(b)& 16}:function(a,b){return a!==b&&(a.contains?a.contains(b):!0)},r=function(a){return a.nodeType===9&&a.documentElement.nodeName!=="HTML"||!!a.ownerDocument&&a.ownerDocument.documentElement.nodeName!=="HTML"},v=function(a,b){for(var c=[],d="",e,f=b.nodeType?[b]:b;e=h.match.PSEUDO.exec(a);)d+=e[0],a=a.replace(h.match.PSEUDO,"");a=h.relative[a]?a+"*":a;e=0;for(var j=f.length;e<j;e++)i(a,f[e],c);return i.filter(d,c)};window.Sizzle=i})();Prototype._original_property=window.Sizzle; (function(a){var b=Prototype.Selector.extendElements;Prototype.Selector.engine=a;Prototype.Selector.select=function(c,d){return b(a(c,d||document))};Prototype.Selector.match=function(b,d){return a.matches(d,[b]).length==1}})(Sizzle);window.Sizzle=Prototype._original_property;delete Prototype._original_property; var Form={reset:function(a){a=$(a);a.reset();return a},serializeElements:function(a,b){if(typeof b!="object")b={hash:!!b};else if(Object.isUndefined(b.hash))b.hash=!0;var c,d,g=!1,f=b.submit,e,i;b.hash?(i={},e=function(a,b,c){b in a?(Object.isArray(a[b])||(a[b]=[a[b]]),a[b].push(c)):a[b]=c;return a}):(i="",e=function(a,b,c){return a+(a?"&":"")+encodeURIComponent(b)+"="+encodeURIComponent(c)});return a.inject(i,function(a,b){if(!b.disabled&&b.name&&(c=b.name,d=$(b).getValue(),d!=null&&b.type!="file"&& (b.type!="submit"||!g&&f!==!1&&(!f||c==f)&&(g=!0))))a=e(a,c,d);return a})}}; Form.Methods={serialize:function(a,b){return Form.serializeElements(Form.getElements(a),b)},getElements:function(a){for(var a=$(a).getElementsByTagName("*"),b,c=[],d=Form.Element.Serializers,g=0;b=a[g];g++)c.push(b);return c.inject([],function(a,b){d[b.tagName.toLowerCase()]&&a.push(Element.extend(b));return a})},getInputs:function(a,b,c){a=$(a);a=a.getElementsByTagName("input");if(!b&&!c)return $A(a).map(Element.extend);for(var d=0,g=[],f=a.length;d<f;d++){var e=a[d];b&&e.type!=b||c&&e.name!=c|| g.push(Element.extend(e))}return g},disable:function(a){a=$(a);Form.getElements(a).invoke("disable");return a},enable:function(a){a=$(a);Form.getElements(a).invoke("enable");return a},findFirstElement:function(a){var a=$(a).getElements().findAll(function(a){return"hidden"!=a.type&&!a.disabled}),b=a.findAll(function(a){return a.hasAttribute("tabIndex")&&a.tabIndex>=0}).sortBy(function(a){return a.tabIndex}).first();return b?b:a.find(function(a){return/^(?:input|select|textarea)$/i.test(a.tagName)})}, focusFirstElement:function(a){var a=$(a),b=a.findFirstElement();b&&b.activate();return a},request:function(a,b){a=$(a);b=Object.clone(b||{});var c=b.parameters,d=a.readAttribute("action")||"";if(d.blank())d=window.location.href;b.parameters=a.serialize(!0);c&&(Object.isString(c)&&(c=c.toQueryParams()),Object.extend(b.parameters,c));if(a.hasAttribute("method")&&!b.method)b.method=a.method;return new Ajax.Request(d,b)}}; Form.Element={focus:function(a){$(a).focus();return a},select:function(a){$(a).select();return a}}; Form.Element.Methods={serialize:function(a){a=$(a);if(!a.disabled&&a.name){var b=a.getValue();if(b!=void 0){var c={};c[a.name]=b;return Object.toQueryString(c)}}return""},getValue:function(a){var a=$(a),b=a.tagName.toLowerCase();return Form.Element.Serializers[b](a)},setValue:function(a,b){var a=$(a),c=a.tagName.toLowerCase();Form.Element.Serializers[c](a,b);return a},clear:function(a){$(a).value="";return a},present:function(a){return $(a).value!=""},activate:function(a){a=$(a);try{a.focus(),a.select&& (a.tagName.toLowerCase()!="input"||!/^(?:button|reset|submit)$/i.test(a.type))&&a.select()}catch(b){}return a},disable:function(a){a=$(a);a.disabled=!0;return a},enable:function(a){a=$(a);a.disabled=!1;return a}};var Field=Form.Element,$F=Form.Element.Methods.getValue; Form.Element.Serializers=function(){function a(a,b){if(Object.isUndefined(b))return a.checked?a.value:null;else a.checked=!!b}function b(a,b){if(Object.isUndefined(b))return a.value;else a.value=b}function c(a){var b=a.selectedIndex;return b>=0?g(a.options[b]):null}function d(a){var b,c=a.length;if(!c)return null;var d=0;for(b=[];d<c;d++){var l=a.options[d];l.selected&&b.push(g(l))}return b}function g(a){return Element.hasAttribute(a,"value")?a.value:a.text}return{input:function(c,d){switch(c.type.toLowerCase()){case "checkbox":case "radio":return a(c, d);default:return b(c,d)}},inputSelector:a,textarea:b,select:function(a,b){if(Object.isUndefined(b))return(a.type==="select-one"?c:d)(a);for(var g,h,l=!Object.isArray(b),n=0,k=a.length;n<k;n++)if(g=a.options[n],h=this.optionValue(g),l){if(h==b){g.selected=!0;break}}else g.selected=b.include(h)},selectOne:c,selectMany:d,optionValue:g,button:b}}(); Abstract.TimedObserver=Class.create(PeriodicalExecuter,{initialize:function($super,b,c,d){$super(d,c);this.element=$(b);this.lastValue=this.getValue()},execute:function(){var a=this.getValue();if(Object.isString(this.lastValue)&&Object.isString(a)?this.lastValue!=a:String(this.lastValue)!=String(a))this.callback(this.element,a),this.lastValue=a}});Form.Element.Observer=Class.create(Abstract.TimedObserver,{getValue:function(){return Form.Element.getValue(this.element)}}); Form.Observer=Class.create(Abstract.TimedObserver,{getValue:function(){return Form.serialize(this.element)}}); Abstract.EventObserver=Class.create({initialize:function(a,b){this.element=$(a);this.callback=b;this.lastValue=this.getValue();this.element.tagName.toLowerCase()=="form"?this.registerFormCallbacks():this.registerCallback(this.element)},onElementEvent:function(){var a=this.getValue();if(this.lastValue!=a)this.callback(this.element,a),this.lastValue=a},registerFormCallbacks:function(){Form.getElements(this.element).each(this.registerCallback,this)},registerCallback:function(a){if(a.type)switch(a.type.toLowerCase()){case "checkbox":case "radio":Event.observe(a, "click",this.onElementEvent.bind(this));break;default:Event.observe(a,"change",this.onElementEvent.bind(this))}}});Form.Element.EventObserver=Class.create(Abstract.EventObserver,{getValue:function(){return Form.Element.getValue(this.element)}});Form.EventObserver=Class.create(Abstract.EventObserver,{getValue:function(){return Form.serialize(this.element)}}); (function(){function a(a,b){return a.which?a.which===b+1:a.button===b}function b(a,b){return a.button===v[b]}function c(a,b){switch(b){case 0:return a.which==1&&!a.metaKey;case 1:return a.which==2||a.which==1&&a.metaKey;case 2:return a.which==3;default:return!1}}function d(a){var b=document.documentElement,c=document.body||{scrollLeft:0};return a.pageX||a.clientX+(b.scrollLeft||c.scrollLeft)-(b.clientLeft||0)}function g(a){var b=document.documentElement,c=document.body||{scrollTop:0};return a.pageY|| a.clientY+(b.scrollTop||c.scrollTop)-(b.clientTop||0)}function f(a,b,c){var d=Element.retrieve(a,"prototype_event_registry");Object.isUndefined(d)&&(y.push(a),d=Element.retrieve(a,"prototype_event_registry",$H()));var e=d.get(b);Object.isUndefined(e)&&(e=[],d.set(b,e));if(e.pluck("handler").include(c))return!1;var f;if(b.include(":"))f=function(d){if(Object.isUndefined(d.eventName))return!1;if(d.eventName!==b)return!1;k.extend(d,a);c.call(a,d)};else if(!p&&(b==="mouseenter"||b==="mouseleave")){if(b=== "mouseenter"||b==="mouseleave")f=function(b){k.extend(b,a);for(var d=b.relatedTarget;d&&d!==a;)try{d=d.parentNode}catch(e){d=a}d!==a&&c.call(a,b)}}else f=function(b){k.extend(b,a);c.call(a,b)};f.handler=c;e.push(f);return f}function e(){for(var a=0,b=y.length;a<b;a++)k.stopObserving(y[a]),y[a]=null}function i(a,b,c){a=$(a);c=f(a,b,c);if(!c)return a;b.include(":")?a.addEventListener?a.addEventListener("dataavailable",c,!1):(a.attachEvent("ondataavailable",c),a.attachEvent("onlosecapture",c)):(b=B(b), a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c));return a}function h(a,b,c){var a=$(a),d=Element.retrieve(a,"prototype_event_registry");if(!d)return a;if(!b)return d.each(function(b){h(a,b.key)}),a;var e=d.get(b);if(!e)return a;if(!c)return e.each(function(c){h(a,b,c.handler)}),a;for(var f=e.length,g;f--;)if(e[f].handler===c){g=e[f];break}if(!g)return a;b.include(":")?a.removeEventListener?a.removeEventListener("dataavailable",g,!1):(a.detachEvent("ondataavailable",g),a.detachEvent("onlosecapture", g)):(c=B(b),a.removeEventListener?a.removeEventListener(c,g,!1):a.detachEvent("on"+c,g));d.set(b,e.without(g));return a}function l(a,b,c,d){a=$(a);Object.isUndefined(d)&&(d=!0);if(a==document&&document.createEvent&&!a.dispatchEvent)a=document.documentElement;var e;document.createEvent?(e=document.createEvent("HTMLEvents"),e.initEvent("dataavailable",d,!0)):(e=document.createEventObject(),e.eventType=d?"ondataavailable":"onlosecapture");e.eventName=b;e.memo=c||{};document.createEvent?a.dispatchEvent(e): a.fireEvent(e.eventType,e);return k.extend(e)}function n(a,b,c,d){a=$(a);Object.isFunction(c)&&Object.isUndefined(d)&&(d=c,c=null);return(new k.Handler(a,b,c,d)).start()}var k={KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,KEY_INSERT:45,cache:{}},w=document.documentElement,p="onmouseenter"in w&&"onmouseleave"in w,q=function(){return!1};window.attachEvent&&(q=window.addEventListener? function(a){return!(a instanceof window.Event)}:function(){return!0});var r,v={0:1,1:4,2:2};r=window.attachEvent?window.addEventListener?function(c,d){return q(c)?b(c,d):a(c,d)}:b:Prototype.Browser.WebKit?c:a;k.Methods={isLeftClick:function(a){return r(a,0)},isMiddleClick:function(a){return r(a,1)},isRightClick:function(a){return r(a,2)},element:function(a){var a=k.extend(a),b=a.target,c=a.type;if((a=a.currentTarget)&&a.tagName&&(c==="load"||c==="error"||c==="click"&&a.tagName.toLowerCase()==="input"&& a.type==="radio"))b=a;if(b.nodeType==Node.TEXT_NODE)b=b.parentNode;return Element.extend(b)},findElement:function(a,b){var c=k.element(a);if(!b)return c;for(;c;){if(Object.isElement(c)&&Prototype.Selector.match(c,b))return Element.extend(c);c=c.parentNode}},pointer:function(a){return{x:d(a),y:g(a)}},pointerX:d,pointerY:g,stop:function(a){k.extend(a);a.preventDefault();a.stopPropagation();a.stopped=!0}};var x=Object.keys(k.Methods).inject({},function(a,b){a[b]=k.Methods[b].methodize();return a});if(window.attachEvent){var z= function(a){switch(a.type){case "mouseover":case "mouseenter":a=a.fromElement;break;case "mouseout":case "mouseleave":a=a.toElement;break;default:return null}return Element.extend(a)},C={stopPropagation:function(){this.cancelBubble=!0},preventDefault:function(){this.returnValue=!1},inspect:function(){return"[object Event]"}};k.extend=function(a,b){if(!a)return!1;if(!q(a))return a;if(a._extendedByPrototype)return a;a._extendedByPrototype=Prototype.emptyFunction;var c=k.pointer(a);Object.extend(a,{target:a.srcElement|| b,relatedTarget:z(a),pageX:c.x,pageY:c.y});Object.extend(a,x);Object.extend(a,C);return a}}else k.extend=Prototype.K;if(window.addEventListener)k.prototype=window.Event.prototype||document.createEvent("HTMLEvents").__proto__,Object.extend(k.prototype,x);var y=[];Prototype.Browser.IE&&window.attachEvent("onunload",e);Prototype.Browser.WebKit&&window.addEventListener("unload",Prototype.emptyFunction,!1);var B=Prototype.K,m={mouseenter:"mouseover",mouseleave:"mouseout"};p||(B=function(a){return m[a]|| a});k.Handler=Class.create({initialize:function(a,b,c,d){this.element=$(a);this.eventName=b;this.selector=c;this.callback=d;this.handler=this.handleEvent.bind(this)},start:function(){k.observe(this.element,this.eventName,this.handler);return this},stop:function(){k.stopObserving(this.element,this.eventName,this.handler);return this},handleEvent:function(a){var b=k.findElement(a,this.selector);b&&this.callback.call(this.element,a,b)}});Object.extend(k,k.Methods);Object.extend(k,{fire:l,observe:i,stopObserving:h, on:n});Element.addMethods({fire:l,observe:i,stopObserving:h,on:n});Object.extend(document,{fire:l.methodize(),observe:i.methodize(),stopObserving:h.methodize(),on:n.methodize(),loaded:!1});window.Event?Object.extend(window.Event,k):window.Event=k})(); (function(){function a(){if(!document.loaded)d&&window.clearTimeout(d),document.loaded=!0,document.fire("dom:loaded")}function b(){document.readyState==="complete"&&(document.stopObserving("readystatechange",b),a())}function c(){try{document.documentElement.doScroll("left")}catch(b){d=c.defer();return}a()}var d;document.addEventListener?document.addEventListener("DOMContentLoaded",a,!1):(document.observe("readystatechange",b),window==top&&(d=c.defer()));Event.observe(window,"load",a)})();Element.addMethods(); Hash.toQueryString=Object.toQueryString;var Toggle={display:Element.toggle};Element.Methods.childOf=Element.Methods.descendantOf; var Insertion={Before:function(a,b){return Element.protoinsert(a,{before:b})},Top:function(a,b){return Element.protoinsert(a,{top:b})},Bottom:function(a,b){return Element.protoinsert(a,{bottom:b})},After:function(a,b){return Element.protoinsert(a,{after:b})}},$continue=Error('"throw $continue" is deprecated, use "return" instead'),Position={includeScrollOffsets:!1,prepare:function(){this.deltaX=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;this.deltaY=window.pageYOffset||document.documentElement.scrollTop|| document.body.scrollTop||0},within:function(a,b,c){if(this.includeScrollOffsets)return this.withinIncludingScrolloffsets(a,b,c);this.xcomp=b;this.ycomp=c;this.offset=Element.cumulativeOffset(a);return c>=this.offset[1]&&c<this.offset[1]+a.offsetHeight&&b>=this.offset[0]&&b<this.offset[0]+a.offsetWidth},withinIncludingScrolloffsets:function(a,b,c){var d=Element.cumulativeScrollOffset(a);this.xcomp=b+d[0]-this.deltaX;this.ycomp=c+d[1]-this.deltaY;this.offset=Element.cumulativeOffset(a);return this.ycomp>= this.offset[1]&&this.ycomp<this.offset[1]+a.offsetHeight&&this.xcomp>=this.offset[0]&&this.xcomp<this.offset[0]+a.offsetWidth},overlap:function(a,b){if(!a)return 0;if(a=="vertical")return(this.offset[1]+b.offsetHeight-this.ycomp)/b.offsetHeight;if(a=="horizontal")return(this.offset[0]+b.offsetWidth-this.xcomp)/b.offsetWidth},cumulativeOffset:Element.Methods.cumulativeOffset,positionedOffset:Element.Methods.positionedOffset,absolutize:function(a){Position.prepare();return Element.absolutize(a)},relativize:function(a){Position.prepare(); return Element.relativize(a)},realOffset:Element.Methods.cumulativeScrollOffset,offsetParent:Element.Methods.getOffsetParent,page:Element.Methods.viewportOffset,clone:function(a,b,c){c=c||{};return Element.clonePosition(b,a,c)}}; if(!document.getElementsByClassName)document.getElementsByClassName=function(a){function b(a){return a.blank()?null:"[contains(concat(' ', @class, ' '), ' "+a+" ')]"}a.getElementsByClassName=Prototype.BrowserFeatures.XPath?function(a,d){var d=d.toString().strip(),g=/\s/.test(d)?$w(d).map(b).join(""):b(d);return g?document._getElementsByXPath(".//*"+g,a):[]}:function(a,b){var b=b.toString().strip(),g=[],f=/\s/.test(b)?$w(b):null;if(!f&&!b)return g;for(var e=$(a).getElementsByTagName("*"),b=" "+b+" ", i=0,h,l;h=e[i];i++)h.className&&(l=" "+h.className+" ")&&(l.include(b)||f&&f.all(function(a){return!a.toString().blank()&&l.include(" "+a+" ")}))&&g.push(Element.extend(h));return g};return function(a,b){return $(b||document.body).getElementsByClassName(a)}}(Element.Methods);Element.ClassNames=Class.create(); Element.ClassNames.prototype={initialize:function(a){this.element=$(a)},_each:function(a){this.element.className.split(/\s+/).select(function(a){return a.length>0})._each(a)},set:function(a){this.element.className=a},add:function(a){this.include(a)||this.set($A(this).concat(a).join(" "))},remove:function(a){this.include(a)&&this.set($A(this).without(a).join(" "))},toString:function(){return $A(this).join(" ")}};Object.extend(Element.ClassNames.prototype,Enumerable); (function(){window.Selector=Class.create({initialize:function(a){this.expression=a.strip()},findElements:function(a){return Prototype.Selector.select(this.expression,a)},match:function(a){return Prototype.Selector.match(a,this.expression)},toString:function(){return this.expression},inspect:function(){return"#<Selector: "+this.expression+">"}});Object.extend(Selector,{matchElements:function(a,b){for(var c=Prototype.Selector.match,d=[],g=0,f=a.length;g<f;g++){var e=a[g];c(e,b)&&d.push(Element.extend(e))}return d}, findElement:function(a,b,c){for(var c=c||0,d=0,g,f=0,e=a.length;f<e;f++)if(g=a[f],Prototype.Selector.match(g,b)&&c===d++)return Element.extend(g)},findChildElements:function(a,b){var c=b.toArray().join(", ");return Prototype.Selector.select(c,a||document)}})})();
//Scriptaculous
var Scriptaculous={Version:"1.9.0",require:function(c){try{document.write('<script type="text/javascript" src="'+c+'"><\/script>')}catch(d){var a=document.createElement("script");a.type="text/javascript";a.src=c;document.getElementsByTagName("head")[0].appendChild(a)}},REQUIRED_PROTOTYPE:"1.6.0.3",load:function(){function c(a){var b=a.replace(/_.*|\./g,""),b=parseInt(b+"0".times(4-b.length));return a.indexOf("_")>-1?b-1:b}if(typeof Prototype=="undefined"||typeof Element=="undefined"||typeof Element.Methods== "undefined"||c(Prototype.Version)<c(Scriptaculous.REQUIRED_PROTOTYPE))throw"script.aculo.us requires the Prototype JavaScript framework >= "+Scriptaculous.REQUIRED_PROTOTYPE;var d=/scriptaculous\.js(\?.*)?$/;$$("script[src]").findAll(function(a){return a.src.match(d)}).each(function(a){var b=a.src.replace(d,""),a=a.src.match(/\?.*load=([a-z,]*)/);(a?a[1]:"builder,effects,dragdrop,controls,slider,sound").split(",").each(function(a){Scriptaculous.require(b+a+".js")})})}};Scriptaculous.load();
//effects
String.prototype.parseColor=function(a){var b="#";if(this.slice(0,4)=="rgb("){var c=this.slice(4,this.length-1).split(","),d=0;do b+=parseInt(c[d]).toColorPart();while(++d<3)}else if(this.slice(0,1)=="#"){if(this.length==4)for(d=1;d<4;d++)b+=(this.charAt(d)+this.charAt(d)).toLowerCase();this.length==7&&(b=this.toLowerCase())}return b.length==7?b:a||this}; Element.collectTextNodes=function(a){return $A($(a).childNodes).collect(function(a){return a.nodeType==3?a.nodeValue:a.hasChildNodes()?Element.collectTextNodes(a):""}).flatten().join("")};Element.collectTextNodesIgnoreClass=function(a,b){return $A($(a).childNodes).collect(function(a){return a.nodeType==3?a.nodeValue:a.hasChildNodes()&&!Element.hasClassName(a,b)?Element.collectTextNodesIgnoreClass(a,b):""}).flatten().join("")}; Element.setContentZoom=function(a,b){a=$(a);a.setStyle({fontSize:b/100+"em"});Prototype.Browser.WebKit&&window.scrollBy(0,0);return a};Element.getInlineOpacity=function(a){return $(a).style.opacity||""};Element.forceRerendering=function(a){try{var a=$(a),b=document.createTextNode(" ");a.appendChild(b);a.removeChild(b)}catch(c){}}; var Effect={_elementDoesNotExistError:{name:"ElementDoesNotExistError",message:"The specified DOM element does not exist, but is required for this effect to operate"},Transitions:{linear:Prototype.K,sinoidal:function(a){return-Math.cos(a*Math.PI)/2+0.5},reverse:function(a){return 1-a},flicker:function(a){a=-Math.cos(a*Math.PI)/4+0.75+Math.random()/4;return a>1?1:a},wobble:function(a){return-Math.cos(a*Math.PI*9*a)/2+0.5},pulse:function(a,b){return-Math.cos(a*((b||5)-0.5)*2*Math.PI)/2+0.5},spring:function(a){return 1- Math.cos(a*4.5*Math.PI)*Math.exp(-a*6)},none:function(){return 0},full:function(){return 1}},DefaultOptions:{duration:1,fps:100,sync:!1,from:0,to:1,delay:0,queue:"parallel"},tagifyText:function(a){var b="position:relative";Prototype.Browser.IE&&(b+=";zoom:1");a=$(a);$A(a.childNodes).each(function(c){c.nodeType==3&&(c.nodeValue.toArray().each(function(d){a.insertBefore((new Element("span",{style:b})).update(d==" "?String.fromCharCode(160):d),c)}),Element.remove(c))})},multiple:function(a,b,c){var a= (typeof a=="object"||Object.isFunction(a))&&a.length?a:$(a).childNodes,d=Object.extend({speed:0.1,delay:0},c||{}),e=d.delay;$A(a).each(function(a,c){new b(a,Object.extend(d,{delay:c*d.speed+e}))})},PAIRS:{slide:["SlideDown","SlideUp"],blind:["BlindDown","BlindUp"],appear:["Appear","Fade"]},toggle:function(a,b,c){a=$(a);b=(b||"appear").toLowerCase();return Effect[Effect.PAIRS[b][a.visible()?1:0]](a,Object.extend({queue:{position:"end",scope:a.id||"global",limit:1}},c||{}))}}; Effect.DefaultOptions.transition=Effect.Transitions.sinoidal; Effect.ScopedQueue=Class.create(Enumerable,{initialize:function(){this.effects=[];this.interval=null},_each:function(a){this.effects._each(a)},add:function(a){var b=(new Date).getTime();switch(Object.isString(a.options.queue)?a.options.queue:a.options.queue.position){case "front":this.effects.findAll(function(a){return a.state=="idle"}).each(function(b){b.startOn+=a.finishOn;b.finishOn+=a.finishOn});break;case "with-last":b=this.effects.pluck("startOn").max()||b;break;case "end":b=this.effects.pluck("finishOn").max()|| b}a.startOn+=b;a.finishOn+=b;(!a.options.queue.limit||this.effects.length<a.options.queue.limit)&&this.effects.push(a);if(!this.interval)this.interval=setInterval(this.loop.bind(this),15)},remove:function(a){this.effects=this.effects.reject(function(b){return b==a});if(this.effects.length==0)clearInterval(this.interval),this.interval=null},loop:function(){for(var a=(new Date).getTime(),b=0,c=this.effects.length;b<c;b++)this.effects[b]&&this.effects[b].loop(a)}}); Effect.Queues={instances:$H(),get:function(a){return!Object.isString(a)?a:this.instances.get(a)||this.instances.set(a,new Effect.ScopedQueue)}};Effect.Queue=Effect.Queues.get("global"); Effect.Base=Class.create({position:null,start:function(a){if(a&&a.transition===!1)a.transition=Effect.Transitions.linear;this.options=Object.extend(Object.extend({},Effect.DefaultOptions),a||{});this.currentFrame=0;this.state="idle";this.startOn=this.options.delay*1E3;this.finishOn=this.startOn+this.options.duration*1E3;this.fromToDelta=this.options.to-this.options.from;this.totalTime=this.finishOn-this.startOn;this.totalFrames=this.options.fps*this.options.duration;this.render=function(){function a(b, d){if(b.options[d+"Internal"])b.options[d+"Internal"](b);if(b.options[d])b.options[d](b)}return function(c){if(this.state==="idle")this.state="running",a(this,"beforeSetup"),this.setup&&this.setup(),a(this,"afterSetup");if(this.state==="running"){if(typeof this.options.transition=="undefined")this.options.transition=Effect.Transitions.linear;this.position=c=this.options.transition(c)*this.fromToDelta+this.options.from;a(this,"beforeUpdate");this.update&&this.update(c);a(this,"afterUpdate")}}}();this.event("beforeStart"); this.options.sync||Effect.Queues.get(Object.isString(this.options.queue)?"global":this.options.queue.scope).add(this)},loop:function(a){if(a>=this.startOn)if(a>=this.finishOn)this.render(1),this.cancel(),this.event("beforeFinish"),this.finish&&this.finish(),this.event("afterFinish");else{var a=(a-this.startOn)/this.totalTime,b=(a*this.totalFrames).round();if(b>this.currentFrame)this.render(a),this.currentFrame=b}},cancel:function(){this.options.sync||Effect.Queues.get(Object.isString(this.options.queue)? "global":this.options.queue.scope).remove(this);this.state="finished"},event:function(a){if(this.options[a+"Internal"])this.options[a+"Internal"](this);if(this.options[a])this.options[a](this)},inspect:function(){var a=$H();for(property in this)Object.isFunction(this[property])||a.set(property,this[property]);return"#<Effect:"+a.inspect()+",options:"+$H(this.options).inspect()+">"}}); Effect.Parallel=Class.create(Effect.Base,{initialize:function(a,b){this.effects=a||[];this.start(b)},update:function(a){this.effects.invoke("render",a)},finish:function(a){this.effects.each(function(b){b.render(1);b.cancel();b.event("beforeFinish");b.finish&&b.finish(a);b.event("afterFinish")})}}); Effect.Tween=Class.create(Effect.Base,{initialize:function(a,b,c){var a=Object.isString(a)?$(a):a,d=$A(arguments),e=d.last(),d=d.length==5?d[3]:null;this.method=Object.isFunction(e)?e.bind(a):Object.isFunction(a[e])?a[e].bind(a):function(b){a[e]=b};this.start(Object.extend({from:b,to:c},d||{}))},update:function(a){this.method(a)}});Effect.Event=Class.create(Effect.Base,{initialize:function(a){this.start(Object.extend({duration:0},a||{}))},update:Prototype.emptyFunction}); Effect.Opacity=Class.create(Effect.Base,{initialize:function(a,b){this.element=$(a);if(!this.element)throw Effect._elementDoesNotExistError;Prototype.Browser.IE&&!this.element.currentStyle.hasLayout&&this.element.setStyle({zoom:1});this.start(Object.extend({from:this.element.getOpacity()||0,to:1},b||{}))},update:function(a){this.element.setOpacity(a)}}); Effect.Move=Class.create(Effect.Base,{initialize:function(a,b){this.element=$(a);if(!this.element)throw Effect._elementDoesNotExistError;this.start(Object.extend({x:0,y:0,mode:"relative"},b||{}))},setup:function(){this.element.makePositioned();this.originalLeft=parseFloat(this.element.getStyle("left")||"0");this.originalTop=parseFloat(this.element.getStyle("top")||"0");this.options.mode=="absolute"&&(this.options.x-=this.originalLeft,this.options.y-=this.originalTop)},update:function(a){this.element.setStyle({left:(this.options.x* a+this.originalLeft).round()+"px",top:(this.options.y*a+this.originalTop).round()+"px"})}});Effect.MoveBy=function(a,b,c,d){return new Effect.Move(a,Object.extend({x:c,y:b},d||{}))}; Effect.Scale=Class.create(Effect.Base,{initialize:function(a,b,c){this.element=$(a);if(!this.element)throw Effect._elementDoesNotExistError;this.start(Object.extend({scaleX:!0,scaleY:!0,scaleContent:!0,scaleFromCenter:!1,scaleMode:"box",scaleFrom:100,scaleTo:b},c||{}))},setup:function(){this.restoreAfterFinish=this.options.restoreAfterFinish||!1;this.elementPositioning=this.element.getStyle("position");this.originalStyle={};["top","left","width","height","fontSize"].each(function(a){this.originalStyle[a]= this.element.style[a]}.bind(this));this.originalTop=this.element.offsetTop;this.originalLeft=this.element.offsetLeft;var a=this.element.getStyle("font-size")||"100%";["em","px","%","pt"].each(function(b){if(a.indexOf(b)>0)this.fontSize=parseFloat(a),this.fontSizeType=b}.bind(this));this.factor=(this.options.scaleTo-this.options.scaleFrom)/100;this.dims=null;if(this.options.scaleMode=="box")this.dims=[this.element.offsetHeight,this.element.offsetWidth];if(/^content/.test(this.options.scaleMode))this.dims= [this.element.scrollHeight,this.element.scrollWidth];if(!this.dims)this.dims=[this.options.scaleMode.originalHeight,this.options.scaleMode.originalWidth]},update:function(a){a=this.options.scaleFrom/100+this.factor*a;this.options.scaleContent&&this.fontSize&&this.element.setStyle({fontSize:this.fontSize*a+this.fontSizeType});this.setDimensions(this.dims[0]*a,this.dims[1]*a)},finish:function(){this.restoreAfterFinish&&this.element.setStyle(this.originalStyle)},setDimensions:function(a,b){var c={}; if(this.options.scaleX)c.width=b.round()+"px";if(this.options.scaleY)c.height=a.round()+"px";if(this.options.scaleFromCenter){var d=(a-this.dims[0])/2,e=(b-this.dims[1])/2;if(this.elementPositioning=="absolute"){if(this.options.scaleY)c.top=this.originalTop-d+"px";if(this.options.scaleX)c.left=this.originalLeft-e+"px"}else{if(this.options.scaleY)c.top=-d+"px";if(this.options.scaleX)c.left=-e+"px"}}this.element.setStyle(c)}}); Effect.Highlighteffect=Class.create(Effect.Base,{initialize:function(a,b){this.element=$(a);if(!this.element)throw Effect._elementDoesNotExistError;this.start(Object.extend({startcolor:"#ffff99"},b||{}))},setup:function(){if(this.element.getStyle("display")=="none")this.cancel();else{this.oldStyle={};if(!this.options.keepBackgroundImage)this.oldStyle.backgroundImage=this.element.getStyle("background-image"),this.element.setStyle({backgroundImage:"none"});if(!this.options.endcolor)this.options.endcolor= this.element.getStyle("background-color").parseColor("#ffffff");if(!this.options.restorecolor)this.options.restorecolor=this.element.getStyle("background-color");this._base=$R(0,2).map(function(a){return parseInt(this.options.startcolor.slice(a*2+1,a*2+3),16)}.bind(this));this._delta=$R(0,2).map(function(a){return parseInt(this.options.endcolor.slice(a*2+1,a*2+3),16)-this._base[a]}.bind(this))}},update:function(a){this.element.setStyle({backgroundColor:$R(0,2).inject("#",function(b,c,d){return b+ (this._base[d]+this._delta[d]*a).round().toColorPart()}.bind(this))})},finish:function(){this.element.setStyle(Object.extend(this.oldStyle,{backgroundColor:this.options.restorecolor}))}});Effect.ScrollTo=function(a,b){var c=b||{},d=document.viewport.getScrollOffsets(),e=$(a).cumulativeOffset();c.offset&&(e[1]+=c.offset);return new Effect.Tween(null,d.top,e[1],c,function(a){scrollTo(d.left,a.round())})}; Effect.Fade=function(a,b){var a=$(a),c=a.getInlineOpacity(),d=Object.extend({from:a.getOpacity()||1,to:0,afterFinishInternal:function(a){a.options.to==0&&a.element.hide().setStyle({opacity:c})}},b||{});return new Effect.Opacity(a,d)}; Effect.Appear=function(a,b){var a=$(a),c=Object.extend({from:a.getStyle("display")=="none"?0:a.getOpacity()||0,to:1,afterFinishInternal:function(a){a.element.forceRerendering()},beforeSetup:function(a){a.element.setOpacity(a.options.from).show()}},b||{});return new Effect.Opacity(a,c)}; Effect.Puff=function(a,b){var a=$(a),c={opacity:a.getInlineOpacity(),position:a.getStyle("position"),top:a.style.top,left:a.style.left,width:a.style.width,height:a.style.height};return new Effect.Parallel([new Effect.Scale(a,200,{sync:!0,scaleFromCenter:!0,scaleContent:!0,restoreAfterFinish:!0}),new Effect.Opacity(a,{sync:!0,to:0})],Object.extend({duration:1,beforeSetupInternal:function(a){Position.absolutize(a.effects[0].element)},afterFinishInternal:function(a){a.effects[0].element.hide().setStyle(c)}}, b||{}))};Effect.BlindUp=function(a,b){a=$(a);a.makeClipping();return new Effect.Scale(a,0,Object.extend({scaleContent:!1,scaleX:!1,restoreAfterFinish:!0,afterFinishInternal:function(a){a.element.hide().undoClipping()}},b||{}))}; Effect.BlindDown=function(a,b){var a=$(a),c=a.getDimensions();return new Effect.Scale(a,100,Object.extend({scaleContent:!1,scaleX:!1,scaleFrom:0,scaleMode:{originalHeight:c.height,originalWidth:c.width},restoreAfterFinish:!0,afterSetup:function(a){a.element.makeClipping().setStyle({height:"0px"}).show()},afterFinishInternal:function(a){a.element.undoClipping()}},b||{}))}; Effect.SwitchOff=function(a,b){var a=$(a),c=a.getInlineOpacity();return new Effect.Appear(a,Object.extend({duration:0.4,from:0,transition:Effect.Transitions.flicker,afterFinishInternal:function(a){new Effect.Scale(a.element,1,{duration:0.3,scaleFromCenter:!0,scaleX:!1,scaleContent:!1,restoreAfterFinish:!0,beforeSetup:function(a){a.element.makePositioned().makeClipping()},afterFinishInternal:function(a){a.element.hide().undoClipping().undoPositioned().setStyle({opacity:c})}})}},b||{}))}; Effect.DropOut=function(a,b){var a=$(a),c={top:a.getStyle("top"),left:a.getStyle("left"),opacity:a.getInlineOpacity()};return new Effect.Parallel([new Effect.Move(a,{x:0,y:100,sync:!0}),new Effect.Opacity(a,{sync:!0,to:0})],Object.extend({duration:0.5,beforeSetup:function(a){a.effects[0].element.makePositioned()},afterFinishInternal:function(a){a.effects[0].element.hide().undoPositioned().setStyle(c)}},b||{}))}; Effect.Shake=function(a,b){var a=$(a),c=Object.extend({distance:20,duration:0.5},b||{}),d=parseFloat(c.distance),e=parseFloat(c.duration)/10,f={top:a.getStyle("top"),left:a.getStyle("left")};return new Effect.Move(a,{x:d,y:0,duration:e,afterFinishInternal:function(a){new Effect.Move(a.element,{x:-d*2,y:0,duration:e*2,afterFinishInternal:function(a){new Effect.Move(a.element,{x:d*2,y:0,duration:e*2,afterFinishInternal:function(a){new Effect.Move(a.element,{x:-d*2,y:0,duration:e*2,afterFinishInternal:function(a){new Effect.Move(a.element, {x:d*2,y:0,duration:e*2,afterFinishInternal:function(a){new Effect.Move(a.element,{x:-d,y:0,duration:e,afterFinishInternal:function(a){a.element.undoPositioned().setStyle(f)}})}})}})}})}})}})}; Effect.SlideDown=function(a,b){var a=$(a).cleanWhitespace(),c=a.down().getStyle("bottom"),d=a.getDimensions();return new Effect.Scale(a,100,Object.extend({scaleContent:!1,scaleX:!1,scaleFrom:window.opera?0:1,scaleMode:{originalHeight:d.height,originalWidth:d.width},restoreAfterFinish:!0,afterSetup:function(a){a.element.makePositioned();a.element.down().makePositioned();window.opera&&a.element.setStyle({top:""});a.element.makeClipping().setStyle({height:"0px"}).show()},afterUpdateInternal:function(a){a.element.down().setStyle({bottom:a.dims[0]- a.element.clientHeight+"px"})},afterFinishInternal:function(a){a.element.undoClipping().undoPositioned();a.element.down().undoPositioned().setStyle({bottom:c})}},b||{}))}; Effect.SlideUp=function(a,b){var a=$(a).cleanWhitespace(),c=a.down().getStyle("bottom"),d=a.getDimensions();return new Effect.Scale(a,window.opera?0:1,Object.extend({scaleContent:!1,scaleX:!1,scaleMode:"box",scaleFrom:100,scaleMode:{originalHeight:d.height,originalWidth:d.width},restoreAfterFinish:!0,afterSetup:function(a){a.element.makePositioned();a.element.down().makePositioned();window.opera&&a.element.setStyle({top:""});a.element.makeClipping().show()},afterUpdateInternal:function(a){a.element.down().setStyle({bottom:a.dims[0]- a.element.clientHeight+"px"})},afterFinishInternal:function(a){a.element.hide().undoClipping().undoPositioned();a.element.down().undoPositioned().setStyle({bottom:c})}},b||{}))};Effect.Squish=function(a){return new Effect.Scale(a,window.opera?1:0,{restoreAfterFinish:!0,beforeSetup:function(a){a.element.makeClipping()},afterFinishInternal:function(a){a.element.hide().undoClipping()}})}; Effect.Grow=function(a,b){var a=$(a),c=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.full},b||{}),d={top:a.style.top,left:a.style.left,height:a.style.height,width:a.style.width,opacity:a.getInlineOpacity()},e=a.getDimensions(),f,g,h,i;switch(c.direction){case "top-left":f=g=h=i=0;break;case "top-right":f=e.width;g=i=0;h=-e.width;break;case "bottom-left":f=h=0;g=e.height;i=-e.height;break; case "bottom-right":f=e.width;g=e.height;h=-e.width;i=-e.height;break;case "center":f=e.width/2,g=e.height/2,h=-e.width/2,i=-e.height/2}return new Effect.Move(a,{x:f,y:g,duration:0.01,beforeSetup:function(a){a.element.hide().makeClipping().makePositioned()},afterFinishInternal:function(a){new Effect.Parallel([new Effect.Opacity(a.element,{sync:!0,to:1,from:0,transition:c.opacityTransition}),new Effect.Move(a.element,{x:h,y:i,sync:!0,transition:c.moveTransition}),new Effect.Scale(a.element,100,{scaleMode:{originalHeight:e.height, originalWidth:e.width},sync:!0,scaleFrom:window.opera?1:0,transition:c.scaleTransition,restoreAfterFinish:!0})],Object.extend({beforeSetup:function(a){a.effects[0].element.setStyle({height:"0px"}).show()},afterFinishInternal:function(a){a.effects[0].element.undoClipping().undoPositioned().setStyle(d)}},c))}})}; Effect.Shrink=function(a,b){var a=$(a),c=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.none},b||{}),d={top:a.style.top,left:a.style.left,height:a.style.height,width:a.style.width,opacity:a.getInlineOpacity()},e=a.getDimensions(),f,g;switch(c.direction){case "top-left":f=g=0;break;case "top-right":f=e.width;g=0;break;case "bottom-left":f=0;g=e.height;break;case "bottom-right":f=e.width;g= e.height;break;case "center":f=e.width/2,g=e.height/2}return new Effect.Parallel([new Effect.Opacity(a,{sync:!0,to:0,from:1,transition:c.opacityTransition}),new Effect.Scale(a,window.opera?1:0,{sync:!0,transition:c.scaleTransition,restoreAfterFinish:!0}),new Effect.Move(a,{x:f,y:g,sync:!0,transition:c.moveTransition})],Object.extend({beforeStartInternal:function(a){a.effects[0].element.makePositioned().makeClipping()},afterFinishInternal:function(a){a.effects[0].element.hide().undoClipping().undoPositioned().setStyle(d)}}, c))};Effect.Pulsate=function(a,b){var a=$(a),c=b||{},d=a.getInlineOpacity(),e=c.transition||Effect.Transitions.linear;return new Effect.Opacity(a,Object.extend(Object.extend({duration:2,from:0,afterFinishInternal:function(a){a.element.setStyle({opacity:d})}},c),{transition:function(a){return 1-e(-Math.cos(a*(c.pulses||5)*2*Math.PI)/2+0.5)}}))}; Effect.Fold=function(a,b){var a=$(a),c={top:a.style.top,left:a.style.left,width:a.style.width,height:a.style.height};a.makeClipping();return new Effect.Scale(a,5,Object.extend({scaleContent:!1,scaleX:!1,afterFinishInternal:function(){new Effect.Scale(a,1,{scaleContent:!1,scaleY:!1,afterFinishInternal:function(a){a.element.hide().undoClipping().setStyle(c)}})}},b||{}))}; Effect.Morph=Class.create(Effect.Base,{initialize:function(a,b){this.element=$(a);if(!this.element)throw Effect._elementDoesNotExistError;var c=Object.extend({style:{}},b||{});if(Object.isString(c.style))if(c.style.include(":"))this.style=c.style.parseStyle();else{this.element.addClassName(c.style);this.style=$H(this.element.getStyles());this.element.removeClassName(c.style);var d=this.element.getStyles();this.style=this.style.reject(function(a){return a.value==d[a.key]});c.afterFinishInternal=function(a){a.element.addClassName(a.options.style); a.transforms.each(function(b){a.element.style[b.style]=""})}}else this.style=$H(c.style);this.start(c)},setup:function(){function a(a){if(!a||["rgba(0, 0, 0, 0)","transparent"].include(a))a="#ffffff";a=a.parseColor();return $R(0,2).map(function(c){return parseInt(a.slice(c*2+1,c*2+3),16)})}this.transforms=this.style.map(function(b){var c=b[0],b=b[1],d=null;b.parseColor("#zzzzzz")!="#zzzzzz"?(b=b.parseColor(),d="color"):c=="opacity"?(b=parseFloat(b),Prototype.Browser.IE&&!this.element.currentStyle.hasLayout&& this.element.setStyle({zoom:1})):Element.CSS_LENGTH.test(b)&&(d=b.match(/^([\+\-]?[0-9\.]+)(.*)$/),b=parseFloat(d[1]),d=d.length==3?d[2]:null);var e=this.element.getStyle(c);return{style:c.camelize(),originalValue:d=="color"?a(e):parseFloat(e||0),targetValue:d=="color"?a(b):b,unit:d}}.bind(this)).reject(function(a){return a.originalValue==a.targetValue||a.unit!="color"&&(isNaN(a.originalValue)||isNaN(a.targetValue))})},update:function(a){for(var b={},c,d=this.transforms.length;d--;)b[(c=this.transforms[d]).style]= c.unit=="color"?"#"+Math.round(c.originalValue[0]+(c.targetValue[0]-c.originalValue[0])*a).toColorPart()+Math.round(c.originalValue[1]+(c.targetValue[1]-c.originalValue[1])*a).toColorPart()+Math.round(c.originalValue[2]+(c.targetValue[2]-c.originalValue[2])*a).toColorPart():(c.originalValue+(c.targetValue-c.originalValue)*a).toFixed(3)+(c.unit===null?"":c.unit);this.element.setStyle(b,!0)}}); Effect.Transform=Class.create({initialize:function(a,b){this.tracks=[];this.options=b||{};this.addTracks(a)},addTracks:function(a){a.each(function(a){var a=$H(a),c=a.values().first();this.tracks.push($H({ids:a.keys().first(),effect:Effect.Morph,options:{style:c}}))}.bind(this));return this},play:function(){return new Effect.Parallel(this.tracks.map(function(a){var b=a.get("ids"),c=a.get("effect"),d=a.get("options");return[$(b)||$$(b)].flatten().map(function(a){return new c(a,Object.extend({sync:!0}, d))})}).flatten(),this.options)}});Element.CSS_PROPERTIES=$w("backgroundColor backgroundPosition borderBottomColor borderBottomStyle borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderSpacing borderTopColor borderTopStyle borderTopWidth bottom clip color fontSize fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop markerOffset maxHeight maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft paddingRight paddingTop right textIndent top width wordSpacing zIndex"); Element.CSS_LENGTH=/^(([\+\-]?[0-9\.]+)(em|ex|px|in|cm|mm|pt|pc|\%))|0$/;String.__parseStyleElement=document.createElement("div"); String.prototype.parseStyle=function(){var a,b=$H();Prototype.Browser.WebKit?a=(new Element("div",{style:this})).style:(String.__parseStyleElement.innerHTML='<div style="'+this+'"></div>',a=String.__parseStyleElement.childNodes[0].style);Element.CSS_PROPERTIES.each(function(c){a[c]&&b.set(c,a[c])});Prototype.Browser.IE&&this.include("opacity")&&b.set("opacity",this.match(/opacity:\s*((?:0|1)?(?:\.\d*)?)/)[1]);return b}; Element.getStyles=document.defaultView&&document.defaultView.getComputedStyle?function(a){var b=document.defaultView.getComputedStyle($(a),null);return Element.CSS_PROPERTIES.inject({},function(a,d){a[d]=b[d];return a})}:function(a){var a=$(a),b=a.currentStyle,c;c=Element.CSS_PROPERTIES.inject({},function(a,c){a[c]=b[c];return a});if(!c.opacity)c.opacity=a.getOpacity();return c}; Effect.Methods={morph:function(a,b,c){a=$(a);new Effect.Morph(a,Object.extend({style:b},c||{}));return a},visualEffect:function(a,b,c){a=$(a);b=b.dasherize().camelize();b=b.charAt(0).toUpperCase()+b.substring(1);new Effect[b](a,c);return a},highlighteffect:function(a,b){a=$(a);new Effect.Highlighteffect(a,b);return a}}; $w("fade appear grow shrink fold blindUp blindDown slideUp slideDown pulsate shake puff squish switchOff dropOut").each(function(a){Effect.Methods[a]=function(b,c){b=$(b);Effect[a.charAt(0).toUpperCase()+a.substring(1)](b,c);return b}});$w("getInlineOpacity forceRerendering setContentZoom collectTextNodes collectTextNodesIgnoreClass getStyles").each(function(a){Effect.Methods[a]=Element[a]});Element.addMethods(Effect.Methods);
//builder
var Builder={NODEMAP:{AREA:"map",CAPTION:"table",COL:"table",COLGROUP:"table",LEGEND:"fieldset",OPTGROUP:"select",OPTION:"select",PARAM:"object",TBODY:"table",TD:"table",TFOOT:"table",TH:"table",THEAD:"table",TR:"table"},node:function(a,b,e){var a=a.toUpperCase(),d=document.createElement(this.NODEMAP[a]||"div");try{d.innerHTML="<"+a+"></"+a+">"}catch(g){}var c=d.firstChild||null;c&&c.tagName.toUpperCase()!=a&&(c=c.getElementsByTagName(a)[0]);c||(c=document.createElement(a));if(c){if(b)if(this._isStringOrNumber(b)|| b instanceof Array||b.tagName)this._children(c,b);else{var f=this._attributes(b);if(f.length){try{d.innerHTML="<"+a+" "+f+"></"+a+">"}catch(h){}c=d.firstChild||null;if(!c)for(attr in c=document.createElement(a),b)c[attr=="class"?"className":attr]=b[attr];c.tagName.toUpperCase()!=a&&(c=d.getElementsByTagName(a)[0])}}e&&this._children(c,e);return $(c)}},_text:function(a){return document.createTextNode(a)},ATTR_MAP:{className:"class",htmlFor:"for"},_attributes:function(a){var b=[];for(attribute in a)b.push((attribute in this.ATTR_MAP?this.ATTR_MAP[attribute]:attribute)+'="'+a[attribute].toString().escapeHTML().gsub(/"/,"&quot;")+'"');return b.join(" ")},_children:function(a,b){b.tagName?a.appendChild(b):typeof b=="object"?b.flatten().each(function(b){typeof b=="object"?a.appendChild(b):Builder._isStringOrNumber(b)&&a.appendChild(Builder._text(b))}):Builder._isStringOrNumber(b)&&a.appendChild(Builder._text(b))},_isStringOrNumber:function(a){return typeof a=="string"||typeof a=="number"},build:function(a){var b=this.node("div"); $(b).update(a.strip());return b.down()},dump:function(a){typeof a!="object"&&typeof a!="function"&&(a=window);"A ABBR ACRONYM ADDRESS APPLET AREA B BASE BASEFONT BDO BIG BLOCKQUOTE BODY BR BUTTON CAPTION CENTER CITE CODE COL COLGROUP DD DEL DFN DIR DIV DL DT EM FIELDSET FONT FORM FRAME FRAMESET H1 H2 H3 H4 H5 H6 HEAD HR HTML I IFRAME IMG INPUT INS ISINDEX KBD LABEL LEGEND LI LINK MAP MENU META NOFRAMES NOSCRIPT OBJECT OL OPTGROUP OPTION P PARAM PRE Q S SAMP SCRIPT SELECT SMALL SPAN STRIKE STRONG STYLE SUB SUP TABLE TBODY TD TEXTAREA TFOOT TH THEAD TITLE TR TT U UL VAR".split(/\s+/).each(function(b){a[b]= function(){return Builder.node.apply(Builder,[b].concat($A(arguments)))}})}};
//Cookie
var Cookie={data:{},options:{expires:1,domain:"",path:"",secure:!1},init:function(a,b){Cookie.options=Object.extend(Cookie.options,a||{});var c=Cookie.retrieve();Cookie.data=c?c.evalJSON():b||{};Cookie.store()},getData:function(a){return Cookie.data[a]},setData:function(a,b){Cookie.data[a]=b;Cookie.store()},removeData:function(a){delete Cookie.data[a];Cookie.store()},retrieve:function(){var a=document.cookie.indexOf(Cookie.options.name+"=");if(a==-1)return null;if(Cookie.options.name!=document.cookie.substr(a, Cookie.options.name.length))return null;var a=a+Cookie.options.name.length+1,b=document.cookie.indexOf(";",a);if(b==-1)b=document.cookie.length;return unescape(document.cookie.substring(a,b))},store:function(){var a="";if(Cookie.options.expires)var b=new Date,a=Cookie.options.expires*864E5,a=";expires="+new Date(b.getTime()+a);document.cookie=Cookie.options.name+"="+escape(Object.toJSON(Cookie.data))+Cookie.getOptions()+a},erase:function(){document.cookie=Cookie.options.name+"="+Cookie.getOptions()+ ";expires=Thu, 01-Jan-1970 00:00:01 GMT"},getOptions:function(){return(Cookie.options.path?";path="+Cookie.options.path:"")+(Cookie.options.domain?";domain="+Cookie.options.domain:"")+(Cookie.options.secure?";secure":"")}};
//Lightbox2
(function()
{

	// -----------------------------------------------------------------------------------
	//
	//	Lightbox v2.04
	//	by Lokesh Dhakar - http://www.lokeshdhakar.com
	//	Last Modification: 2/9/08
	//
	//	For more information, visit:
	//	http://lokeshdhakar.com/projects/lightbox2/
	//
	//	Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
	//  	- Free for use in both personal and commercial projects
	//		- Attribution requires leaving author name, author link, and the license info intact.
	//	
	//  Thanks: Scott Upton(uptonic.com), Peter-Paul Koch(quirksmode.com), and Thomas Fuchs(mir.aculo.us) for ideas, libs, and snippets.
	//  		Artemy Tregubenko (arty.name) for cleanup and help in updating to latest ver of proto-aculous.
	//
	// -----------------------------------------------------------------------------------
	/*

		Table of Contents
		-----------------
		Configuration

		Lightbox Class Declaration
		- initialize()
		- updateImageList()
		- start()
		- changeImage()
		- resizeImageContainer()
		- showImage()
		- updateDetails()
		- updateNav()
		- enableKeyboardNav()
		- disableKeyboardNav()
		- keyboardAction()
		- preloadNeighborImages()
		- end()
		
		Function Calls
		- document.observe()
	   
	*/
	// -----------------------------------------------------------------------------------

	//
	//  Configurationl
	//
	LightboxOptions = Object.extend({
		fileLoadingImage: "http://ponyup.theoks.net/loading.gif",
		fileBottomNavCloseImage:  "http://ponyup.theoks.net/closelabel.gif",
		overlayOpacity: 0.8,   // controls transparency of shadow overlay
		scrollToElem: true,
		animate: true,         // toggles resizing animations
		resizeSpeed: 10,        // controls the speed of the image resizing animations (1=slowest and 10=fastest)

		borderSize: 10,         //if you adjust the padding in the CSS, you will need to update this variable

		// When grouping images this is used to write: Image # of #.
		// Change it for non-english localization
		labelImage: "",
		labelOf: "/"
	}, window.LightboxOptions || {});

	// -----------------------------------------------------------------------------------

	var Lightbox = Class.create();

	Lightbox.prototype = {
		imageArray: [],
		NextNoMorePictures: false,
		PrevNoMorePictures: false,
		activeImage: undefined,
		mainRel: "",
		globalMessage: "",

		// initialize()
		// Constructor runs on completion of the DOM loading. Calls updateImageList and then
		// the function inserts html at the bottom of the page which is used to display the shadow 
		// overlay and the image container.
		//
		initialize: function() {    
			
			this.updateImageList();
			this.keyboardAction = this.keyboardAction.bindAsEventListener(this);

			if (LightboxOptions.resizeSpeed > 10) LightboxOptions.resizeSpeed = 10;
			if (LightboxOptions.resizeSpeed < 1)  LightboxOptions.resizeSpeed = 1;
			
			this.resizeDuration = LightboxOptions.animate ? /*((11 - LightboxOptions.resizeSpeed) * 0.15)*/ 0.15 : 0;
			this.overlayDuration = LightboxOptions.animate ? 0.1 : 0;  // shadow fade in/out duration
			
			this.fitMode = "width"; //width / height / both
			//on iphone - automatically fit by both width and height by default, and no way to switch :((
			if (Prototype.Browser.MobileSafari)
				this.fitMode = "both";
			
			
			// When Lightbox starts it will resize itself from 250 by 250 to the current image dimension.
			// If animations are turned off, it will be hidden as to prevent a flicker of a
			// white 250 by 250 box.
			var size = (LightboxOptions.animate ? 250 : 1) + 'px';
			

			// Code inserts html at the bottom of the page that looks similar to this:
			//
			//  <div id="overlay"></div>
			//  <div id="lightbox">
			//      <div id="outerImageContainer">
			//          <div id="imageContainer">
			//              <img id="lightboxImage">
			//              <div style="" id="hoverNav">
			//                  <a href="#" id="prevLink"></a>
			//                  <a href="#" id="nextLink"></a>
			//              </div>
			//              <div id="loading">
			//                  <a href="#" id="loadingLink">
			//                      <img src="loading.gif">
			//                  </a>
			//              </div>
			//          </div>
			//      </div>
			//      <div id="imageDataContainer">
			//          <div id="imageData">
			//              <div id="imageDetails">
			//                  <span id="caption"></span>
			//                  <span id="numberDisplay"></span>
			//              </div>
			//              <div id="bottomNav">
			//                  <a href="#" id="bottomNavClose">
			//                      <img src="close.gif">
			//                  </a>
			//              </div>
			//          </div>
			//      </div>
			//  </div>


			var objBody = $$('body')[0];

			objBody.appendChild(Builder.node('div',{id:'overlay'}));
		
			objBody.appendChild(Builder.node('div',{id:'lightbox'}, [
				Builder.node('div',{id:'outerImageContainer', style: "padding: " + LightboxOptions.borderSize + "px"}, [ 
					Builder.node('div',{id:'imageContainer' }, [
						Builder.node('img',{id:'lightboxImage'}), 
						Builder.node('div',{id:'hoverNav'}, [
							Builder.node('a',{id:'prevLink', href: '#' }),
							Builder.node('a',{id:'nextLink', href: '#' })
						]),
						Builder.node('div',{id:'loading'}, 
							Builder.node('a',{id:'loadingLink', href: '#' },
								[
									Builder.node('img', {src: LightboxOptions.fileLoadingImage}),
									Builder.node('div', (this.timerActive ? "SlideShow Active" : ""))
								]
							)
						)
					])
				]),
				Builder.node('div', {id:'imageDataContainer', style: "padding: " + LightboxOptions.borderSize + "px"},
					Builder.node('div',{id:'imageData'}, [
						Builder.node('div', [
							Builder.node('div',{id:'slideshowcontrol', title: "Start or stop the slideshow, protip: try hitting 's'"}), 
							Builder.node("div", {id:"slideshowtimer"})
						]),
						Builder.node('div',{id:'imageDetails'}, [
							Builder.node('span',{id:'caption'}),
							Builder.node('span',{id:'numberDisplay'})
						]),
						Builder.node('div',{id:'bottomNav'},
							Builder.node('a',{id:'bottomNavClose', href: '#' },
								Builder.node('img', { src: LightboxOptions.fileBottomNavCloseImage })
							)
						)
					])
				)
			]));


			$('overlay').hide().observe('click', (function() { this.end(); }).bind(this));
			$('lightbox').hide().observe('click', (function(event) { if (event.element().id == 'lightbox') this.end(); }).bind(this));
			$('outerImageContainer').setStyle({ width: size, height: size });
			$('prevLink').observe('click', (function(event) { event.stop(); this.changeImage(this.activeImage - 1); }).bindAsEventListener(this));
			$('nextLink').observe('click', (function(event) { event.stop(); this.changeImage(this.activeImage + 1); }).bindAsEventListener(this));
			$('loadingLink').observe('click', (function(event) { event.stop(); this.end(); }).bind(this));
			$('bottomNavClose').observe('click', (function(event) { event.stop(); this.end(); }).bind(this));

			$("slideshowcontrol").observe("mouseover", function() { this.addClassName("hover"); });
			$("slideshowcontrol").observe("mouseout", function() { this.removeClassName("hover"); });
			$("slideshowcontrol").observe("click", function() 
			{ 
				if (!this.timerActive)
				{
					this.timerActive = true;		
					this.createTimer();
				}
				else
				{
					this.timerActive = false;
					this.killSlideShow();
				}
			}.bind(this));
			
			
			
			var th = this;
			(function(){
				var ids = 
					'overlay lightbox outerImageContainer imageContainer lightboxImage hoverNav prevLink nextLink loading loadingLink ' + 
					'imageDataContainer imageData imageDetails caption numberDisplay bottomNav bottomNavClose';   
				$w(ids).each(function(id){ th[id] = $(id); });
			
			}).defer();


		},

		//
		// updateImageList()
		// Loops through anchor tags looking for 'lightbox' references and applies onclick
		// events to appropriate links. You can rerun after dynamically adding images w/ajax.
		//
		updateImageList: function() {   
			this.updateImageList = Prototype.emptyFunction;
			Event.observe(window, 'orientationchange', this.repositionOverlay.bind(this));
			document.observe('click', (function(event){
				
				var target = event.findElement('a[rel^=lightbox]') || event.findElement('area[rel^=lightbox]');
				if (target) 
				{
					var rightclick = false;
					if (event.which) 
					{
						rightclick = (event.which == 3);
					}
					else if (event.button)
					{
						rightclick = (event.button == 2);
					}
					
					if (rightclick || event.ctrlKey || event.altKey) 
						return;

					event.stop();
					this.start(target);
				}
			}).bindAsEventListener(this));
		},
		repositionOverlay: function()
		{
			if (!this.overlay || !this.overlay.visible())
				return;
				
			// stretch overlay to fill page and fade in
			var arrayPageSize = this.getPageSize();//document.viewport.getDimensions();
			//$('overlay').setStyle({ width: arrayPageSize.width + 'px', height: (arrayPageSize.height * 2) + 'px' });
			$('overlay').setStyle({ top: document.viewport.getScrollOffsets().top - 500,  width: 6000 + 'px', height: 10000 + 'px' });
		},
		//
		//  start()
		//  Display overlay and lightbox. If image is part of a set, add siblings to imageArray.
		//
		start: function(imageLink) {    

			$$('select', 'object', 'embed').each(function(node){ node.style.visibility = 'hidden' });

			this.repositionOverlay();
			
			if (!this.overlay.visible())
				new Effect.Appear(this.overlay, 
				{ 
					duration: this.overlayDuration, 
					from: 0.0, 
					to: LightboxOptions.overlayOpacity
				});

			this.imageArray = [];

			if ((imageLink.rel == 'lightbox')){
				// if image is NOT part of a set, add single image to imageArray
				this.imageArray.push([imageLink.href, imageLink.title]);         
			} else {
				// if image is part of a set..
				this.refreshImageArray(imageLink.rel);
			}
			
			this.reposition();

			var imageNum = 0;       
			while (this.imageArray[imageNum] && this.imageArray[imageNum][0] != imageLink.href) { imageNum++; }
			this.lightboxImage.hide();        
			this.changeImage(imageNum);
		},
		refreshImageArray: function(mainRel)
		{
			if (this.mainRel == "" && mainRel != "")
			{
				this.mainRel = mainRel;
			}
			this.imageArray = 
				$$('#delform a[href][rel="' + this.mainRel + '"]').
				collect(function(anchor)
				{ 
					try
					{
						var fileSize = anchor.previous("span.filesize").cloneNode(true);
						fileSize.update(fileSize.innerHTML.replace(/^File *\:* */, ""));
						fileSize.addClassName("replyTool");
						fileSize.innerHTML = "<br>" + fileSize.innerHTML;
					}
					catch(e) {}
					return [anchor.href, anchor.title, anchor, fileSize]; 
				}).uniq();

			if (!mainRel)
			{
				var imageNum = 0;       
				while (this.imageArray[imageNum] && this.imageArray[imageNum][0] != this.lightboxImage.src) { imageNum++; }
				this.activeImage = imageNum;
			}

		},
		reposition: function(imageHeight)
		{
			// calculate top and left offset for the lightbox 
			var arrayPageScroll = document.viewport.getScrollOffsets();
			var lightboxTop = arrayPageScroll[1];
			var lightboxLeft = arrayPageScroll[0];
			
			
			var windowHeight = this.getPageSize().height;
			if (!imageHeight && this.lightboxImage.visible())
			{
				imageHeight = this.lightboxImage.getHeight();
			}
			
			if (!imageHeight)
				imageHeight = 250;
			
			//if smaller than viewport - display centered
			if (imageHeight < windowHeight)
			{
				lightboxTop = Math.round((windowHeight / 2) - (imageHeight / 2) + lightboxTop);
			}
			
			if (this.repositionEffect)
				this.repositionEffect.cancel();
			
			this.repositionEffect = new Effect.Morph(this.lightbox,
			{
				duration: 0.3,
				style: {
					top: lightboxTop + 'px', 
					left: lightboxLeft + 'px'
				},
				transition: Effect.Transitions.EaseFromTo
				
			});
			this.lightbox.show();
		},
		//
		//  changeImage()
		//  Hide most elements and preload image in preparation for resizing image container.
		//
		changeImage: function(imageNum) {   

			if (this.timerEffect)
				this.timerEffect.cancel();

			this.activeImage = imageNum; // update global var

			// hide elements during transition
			if (LightboxOptions.animate) this.loading.show();
			this.hoverNav.hide();
			this.prevLink.hide();
			this.nextLink.hide();
			// HACK: Opera9 does not currently support scriptaculous opacity and appear fx
			this.imageDataContainer.setStyle({opacity: .0001});
			this.numberDisplay.hide();      
			
			if (LightboxOptions.scrollToElem)
				this.scrollToElemAndReposition(this.imageArray[this.activeImage][2], -50, 0);		
			
			var imgPreloader = new Image();
			
			// once image is preloaded, resize image container
			imgPreloader.onload = function() {
				//if user gave up and closed the viewer - don't display the image
				if (!this.overlay.visible())
					return;
					
				this.lightboxImage.hide();
				this.lightboxImage.src = this.imageArray[this.activeImage][0];

				this.imageSize = { width: imgPreloader.width, height: imgPreloader.height };;
				
				this.resizeToFit(this.lightboxImage);
				
			}.bind(this);
			
			imgPreloader.src = this.imageArray[this.activeImage][0];
		},
		resizeToFit: function(image)
		{
			var maxSize = this.getPageSize();
			maxSize.width = maxSize.width - 5;
			maxSize.height = maxSize.height - 5;

			var newSize = Object.extend({}, this.imageSize);
			
			//fit by width
			if ({both:1, width: 1}[this.fitMode] && newSize.width > maxSize.width){
				newSize.height = Math.round(this.imageSize.height * (maxSize.width/this.imageSize.width));
				newSize.width = maxSize.width;
			}
			
			//fit by height
			if ({both:1, height:1}[this.fitMode] && newSize.height > maxSize.height){
				newSize.width = Math.round(newSize.width*(maxSize.height/newSize.height))
				newSize.height = maxSize.height;
			}
			
			image.style.width = newSize.width + "px";
			image.style.height = newSize.height + "px";

			this.resizeImageContainer(newSize.width, newSize.height);
		},
		//
		//  resizeImageContainer()
		//
		resizeImageContainer: function(imgWidth, imgHeight) {

			// get current width and height
			var widthCurrent  = this.outerImageContainer.getWidth();
			var heightCurrent = this.outerImageContainer.getHeight();

			// get new width and height
			var widthNew  = imgWidth;//  + LightboxOptions.borderSize * 2);
			var heightNew = imgHeight;// + LightboxOptions.borderSize);

			// scalars based on change from old to new
			var xScale = (widthNew  / widthCurrent)  * 100;
			var yScale = (heightNew / heightCurrent) * 100;

			// calculate size difference between new and old image, and resize if necessary
			var wDiff = widthCurrent - widthNew;
			var hDiff = heightCurrent - heightNew;

			if (hDiff != 0) new Effect.Scale(this.outerImageContainer, yScale, {scaleX: false, transition: Effect.Transitions.Bounce, duration: this.resizeDuration, queue: 'front'}); 
			if (wDiff != 0) new Effect.Scale(this.outerImageContainer, xScale, {scaleY: false, transition: Effect.Transitions.Bounce, duration: this.resizeDuration, delay: this.resizeDuration}); 

			// if new and old image are same size and no scaling transition is necessary, 
			// do a quick pause to prevent image flicker.
			var timeout = 0;
			if ((hDiff == 0) && (wDiff == 0)){
				timeout = 100;
				if (Prototype.Browser.IE) timeout = 250;   
			}

			(function(){
				this.prevLink.setStyle({ height: imgHeight + 'px' });
				this.nextLink.setStyle({ height: imgHeight + 'px' });
				this.imageDataContainer.setStyle({ width: widthNew + 'px' });
				this.reposition(imgHeight);
				this.showImage();
			}).bind(this).delay(timeout / 1000);
		},
		
		//
		//  showImage()
		//  Display image and begin preloading neighbors.
		//
		showImage: function(){
			this.loading.hide();

			new Effect.Appear(this.lightboxImage, { 
				duration: this.resizeDuration, 
				queue: 'end', 
				afterFinish: (function(){ this.updateDetails(); }).bind(this) 
			});
			this.preloadNeighborImages();
		},


		//
		//  updateDetails()
		//  Display caption, image number, and bottom nav.
		//
		updateDetails: function() {
		
			// if caption is not null
			var imagelink = this.imageArray[this.activeImage][2];
			var _this = this;
			if (imagelink.nextSibling)
			{
				this.caption.update();
				this.caption.appendChild(
					Builder.node('TABLE', [
						Builder.node("TBODY", [
							Builder.node("TR", [
								Builder.node("TD", [
									Builder.node("SPAN", 
									// if image is part of set display 'Image x of x' 
									((this.imageArray.length > 1) 
										? (LightboxOptions.labelImage + (this.activeImage + 1) + LightboxOptions.labelOf + this.imageArray.length)
										: "")),
		   
									this.imageArray[this.activeImage][3],
									Builder.node("A", { className: "replyTool", style: "cursor: pointer", id: "replylink" },
										[
											Builder.node("BR"),
											Builder.node("SPAN", { className: "boldGet" }, ""),
											"No. " + imagelink.parentNode.id.replace(/[^0-9]/g, '')
										])
								])
							]),
							imagelink.parentNode.down('.postername').cloneNode(true),
							//imagelink.parentNode.down('.postertrip'),
							Builder.node("TR", [
								Builder.node("TD", { className: "reply", id:'replycontent' })
							])
						])
					])
				);
				$('replycontent').update(imagelink.next("blockquote").innerHTML);
				if (imagelink.next("blockquote").innerHTML.length == 0)
					$('replycontent').up("tr").remove();

				$('replylink').observe("click", function()
				{
					this.scrollToElemAndReposition(imagelink.parentNode, -75);
				}.bind(this));
			}
			else
			{
				this.caption.update();
				this.caption.update((this.imageArray[this.activeImage][1] != "")?this.imageArray[this.activeImage][1]:"");

				//only create ugly jump-to link if not set to automatically scroll to elements
				if (!LightboxOptions.scrollToElem)
				{
					var link = Builder.node("A", { id: "replylink", style: "cursor: pointer" }, " [Jump to Image] "); 
					link.onclick = function()
						{ 
							imagelink.parentNode.scrollTo(); 
							setTimeout(function(){_this.reposition();}, 50);
						};
					this.caption.appendChild(link);
				}
			}
			if (this.globalMessage != "")
			{
				this.caption.protoinsert(" (" + this.globalMessage + ")");
				this.globalMessage = "";
			}
					
	//		if (this.imageArray[this.activeImage][1] != ""){
	 //           this.caption.update(this.imageArray[this.activeImage][1]).show();
	  //      }
			
			this.repositionOverlay();
			
			new Effect.Parallel(
				[ 
					new Effect.SlideDown(this.imageDataContainer, { sync: true, duration: this.resizeDuration, from: 0.0, to: 1.0 }), 
					new Effect.Appear(this.imageDataContainer, { sync: true, duration: this.resizeDuration }) 
				], 
				{ 
					duration: this.resizeDuration, 
					afterFinish: (function() {
						// update overlay size and update nav
						this.updateNav();
					}).bind(this)
				} 
			);
		},

		//
		//  updateNav()
		//  Display appropriate previous and next hover navigation.
		//
		updateNav: function() {

			this.hoverNav.show();               

			// if not first image in set, display prev image button
			if (this.activeImage > 0)
			{
				this.prevLink.show();
				this.PrevNoMorePictures = false;
			}
			else
			{
				this.PrevNoMorePictures = true;
			}

			// if not last image in set, display next image button
			if (this.activeImage < (this.imageArray.length - 1)) 
			{
				this.nextLink.show();
				this.NextNoMorePictures = false;
			}
			else
			{
				this.NextNoMorePictures = true;
			}
			if (this.timerActive)
			{
				this.createTimer();
			}
			
			this.enableKeyboardNav();
		},

		//
		//  enableKeyboardNav()
		//
		enableKeyboardNav: function() {
			document.observe('keydown', this.keyboardAction); 
		},

		//
		//  disableKeyboardNav()
		//
		disableKeyboardNav: function() {
			document.stopObserving('keydown', this.keyboardAction); 
		},

		//
		//  keyboardAction()
		//
		keyboardAction: function(event) {
			var keycode = event.keyCode;
			var caught = false;
			var escapeKey;
			if (event.DOM_VK_ESCAPE) {  // mozilla
				escapeKey = event.DOM_VK_ESCAPE;
			} else { // ie
				escapeKey = 27;
			}

			var key = String.fromCharCode(keycode).toLowerCase();
			
			if (key.match(/x|c/) || (keycode == escapeKey))
			{ // close lightbox
				caught = true;
				this.end();
			}
			else if ((key == 'p') || (key == 'z') || (keycode == 37))
			{ // display previous image
				caught = true;
				if (this.activeImage != 0)
				{
					this.disableKeyboardNav();
					this.changeImage(this.activeImage - 1);
				}
			} 
			else if ((key == 'n') || (key == 'b') || (keycode == 39))
			{ // display next image
				caught = true;
				if (this.activeImage != (this.imageArray.length - 1))
				{
					this.disableKeyboardNav();
					this.changeImage(this.activeImage + 1);
				}
			}
			//quick fit
			else if (key == 'q')
			{
				caught = true;
				if (this.fitMode == "width")
					this.fitMode = "height";
				else if (this.fitMode == "height")
					this.fitMode = "both";
				else
					this.fitMode = "width";
			
				this.resizeToFit(this.lightboxImage);		
			}
			//jump to bookmark (selected)
			else if (key == 'j')
			{
				caught = true;
				var table = this.imageArray[this.activeImage][2].up("table");
				if (!table)
					table = this.imageArray[this.activeImage][2].up();
					
				this.scrollToElemAndReposition(table, -75);
			}
			//start/stop slideshow
			else if (key == 's')
			{
				caught = true;
				if (!this.timerActive)
				{
					this.timerActive = true;		
					this.createTimer();
				}
				else
				{
					if (this.timerEffect)
					{
						this.timerActive = false;
						this.killSlideShow();
					}
				}
			}
			
			//if something reacted to the keypress - stop the event from going further
			if (caught)
			{
				if(keycode == 37 || keycode == 39) {
					//event.stop();
					return false;
				}
			}
		},
		createTimer: function()
		{
			var that = this;
			if (this.timerEffect)
				this.timerEffect.cancel();

			$("slideshowcontrol").addClassName("active");
			
			this.timerEffect = new Effect.Morph("slideshowtimer",
			{ 
				style: "width: 100%", 
			
				duration: 5,
				transition: Effect.Transitions.linear,
				beforeStart: function()
				{
					$("slideshowtimer").setStyle(
					{
						width: "0px",
						height: "13px"
					}).show();

				},
				afterFinish: function()
				{
					if (this.activeImage != (this.imageArray.length - 1))
					{
						this.changeImage(this.activeImage + 1);
					}
					else
					{
						if ((my4chan && !my4chan.updaterActive) || (this.lastUpdate && (new Date() - this.lastUpdate < 15000)))
						{
							this.changeImage(0);
							return;
						}
						
						this.lastUpdate = new Date();
						setTimeout(function()
						{
							this.start(this.imageArray[this.activeImage][2]);
						}.bind(that), 100);
					}
					$("slideshowtimer").hide();
				}.bind(that)
			});
		},
		killSlideShow: function()
		{
			if (this.timerEffect)
				this.timerEffect.cancel();
			
			$("slideshowcontrol").removeClassName("active");
			$("slideshowtimer").hide();
		},
		//
		//  preloadNeighborImages()
		//  Preload previous and next images.
		//
		preloadNeighborImages: function(){
			var preloadNextImage, preloadNextImage1, preloadNextImage2, preloadPrevImage;
			if (this.imageArray.length > this.activeImage + 1){
				preloadNextImage = new Image();
				preloadNextImage.src = this.imageArray[this.activeImage + 1][0];
			}
			if (this.imageArray.length > this.activeImage + 2){
				preloadNextImage1 = new Image();
				preloadNextImage1.src = this.imageArray[this.activeImage + 2][0];
			}
			if (this.imageArray.length > this.activeImage + 3){
				preloadNextImage2 = new Image();
				preloadNextImage2.src = this.imageArray[this.activeImage + 3][0];
			}
			if (this.activeImage > 0){
				preloadPrevImage = new Image();
				preloadPrevImage.src = this.imageArray[this.activeImage - 1][0];
			}
		
		},

		//
		//  end()
		//
		end: function() {
			this.disableKeyboardNav();
			if (this.timerEffect)
				this.killSlideShow();

			this.lightbox.hide();
			new Effect.Fade(this.overlay, { duration: this.overlayDuration });
			$$('select', 'object', 'embed').each(function(node){ node.style.visibility = 'visible' });
		},
		scrollToElemAndReposition: function(elem, offset, duration)
		{
			var _this = this;
			
			Effect.ScrollTo(elem, 
			{ 
				duration: (!isNaN(duration) ? duration : 0.3), 
				offset: (!isNaN(offset) ? offset : 0),
				afterFinish: function()
				{
					_this.reposition();
				}
			});
		},
		
		//
		//  getPageSize()
		//
		getPageSize: function()
		{
			var width, height;
			var isCompatMode = (document.compatMode == "CSS1Compat");
			
			if (Prototype.Browser.MobileSafari)
			{
				width = screen.width;
				height = screen.height;
			}
			else if (document.documentElement 
				&& document.documentElement.clientWidth 
				&& document.documentElement.clientWidth > 0)
			{
				width  = document.documentElement.clientWidth;
				height = isCompatMode ? document.documentElement.clientHeight : document.body.clientHeight;
			}
			else if (window.innerWidth && innerWidth > 0)
			{
				width  = innerWidth;
				height = innerHeight;
			}
			else
			{
				width  = document.body.clientWidth;
				height = document.body.clientHeight;
			}
			var retArr = [width, height];
			retArr.width = width;
			retArr.height = height;
			return retArr;
		}
	}

	function startLB()
	{
		if (typeof(Builder) != "undefined")
		{
			window.mylb = new Lightbox();
		}
		else
		{
			setTimeout(startLB, 50);
		}
	}
	startLB();

})();

//fix namespace issues with insert function
function ponychaninsert(a) {
	//if(!ispage || quick_reply) {
		var c=$$('textarea[name=message]')[0];
		if(p.use_replybox && p.replybox.style.display != 'none'){
			p.showreplyboxfromkey();
			var m = p.replybox;
			if(m.createTextRange&&m.caretPos){
				var d=m.caretPos;
				d.text=d.text.charAt(d.text.length-1)==" "?a+" ":a
			}
			else if(m.setSelectionRange){
				var d=m.selectionStart,f=m.selectionEnd;
				m.value=m.value.substr(0,d)+a+m.value.substr(f);
				m.setSelectionRange(d+a.length,d+a.length)
			}
			else m.value+=a+" ";
			c.value = p.replybox.value;
			m.focus();
			return false;
		}
		else if(c) {
			if(c.createTextRange&&c.caretPos){
				var d=c.caretPos;
				d.text=d.text.charAt(d.text.length-1)==" "?a+" ":a
			}
			else if(c.setSelectionRange){
				var d=c.selectionStart,f=c.selectionEnd;
				c.value=c.value.substr(0,d)+a+c.value.substr(f);
				c.setSelectionRange(d+a.length,d+a.length)
			}
			else c.value+=a+" ";
			
			p.replybox.value = c.value;
			if(p.use_replybox == false) c.focus();
			return false;
		}
	//}
	return false;
} 
function fixinsertnamespace(){
	$$('.reflink').each(function(link){
		link = link.down('a',1);
		link.onclick = function(){ return ponychaninsert('>>' +link.innerHTML +'\n'); }
	});
}

var today = new Date().getTime();
var isCtrl = false, isAlt = false;
var uparrow ="<span>PonyUp<span id='sub'>z</span></span> &#9660";
var downarrow ="PonyUp<span id='sub'>z</span> &#9650";
var replybox = null;
var google_reverse_link =  "http://www.google.com/searchbyimage?image_url=";
var tineye_link = "http://www.tineye.com/search?url=";
var exif_link = "http://regex.info/exif.cgi?url=";
var PonyPost = Class.create({
	postid: null,
	thumb: null,
	imagelink: null,
	imagefull: null,
	imagetype: null,
	img64: null,
	userimagename: null,
	filesizenode: null,
	user: null,
	trip: null,
	postdate: null,
	imagedatehuman: null,
	reflink: null,
	replylink: null,
	blockquote: null,
	shortimagelink: null,
	postnode: null,
	dllink: null,

	initialize: function(postnode,postid,p){
		//Grab and set all the properties we will be using on this page right now
		this.postid = postid;
		this.postnode = postnode;
		this.thumb = postnode.down('span#thumb' + this.postid + ' img');
		this.reflink = postnode.down('.reflink');
		this.replylink = this.reflink.down('a',1);
		if(this.thumb){
			this.imagelink = this.thumb.up('a');
			this.imagetype = this.thumb.src.match(/.*\.([^.]+)$/)[1].toLowerCase();
			this.filesizenode = postnode.down('.filesize');
			this.userimagename = 'userimagename.png';
			if(this.filesizenode.collectTextNodes()){
				var temp = this.filesizenode.collectTextNodes().match(/, (.*\..*)/);
				if(temp) this.userimagename = temp[1];
			}
			var d = this.userimagename.match(/(.*)\./)[1];
			if(!isNaN(d) && p.show_userimage_date && d.length == 12){
				var date = new Date(this.userimagename.match(/(.*)\./)[1]*10);
				this.imagedatehuman = date.toLocaleString();
			}
			span = document.createElement('span');
			span.className = 'imagelinks';

			if(p.show_tineye_reverse_image_search == true) span.innerHTML += '<a href="' + tineye_link + this.imagelink + '" target="_blank">[TinEye]</a>';
			if(p.show_google_reverse_image_search == true) span.innerHTML += ' <a href="' + google_reverse_link + this.imagelink + '" target="_blank">[Google]</a>';
			if(p.show_exif_link == true) span.innerHTML += ' <a href="' + exif_link + this.imagelink + '" target="_blank">[EXIF]</a>';
			if(p.show_download_link == true) span.innerHTML += ' <a href="' +  this.imagelink + '" target="_blank">[Download Image]</a>';
			if(p.one_click_save == true) span.innerHTML += ' <a class="dllink">[+One Click Save]</a>';
			this.filesizenode.appendChild(span);
			this.dllink = span.down('.dllink');
			if(p.one_click_save == true){
				this.shortimagelink = this.imagelink.href.replace("http://www.ponychan.net/chan/","");
				Event.observe(this.dllink,'click',function(e){
					var str = "http://greendarkness.com/ponyupz/oneclickdl.php?imageurl="+this.shortimagelink+"&imagename="+this.userimagename;
					$('oneclickdl').src = encodeURI(str);
					return false;
				}.bind(this));
			}
		}
		this.user = postnode.down('.postername');
		this.trip = postnode.down('.postertrip');
		this.postdate = postnode.down('.posttime');
		this.blockquote = postnode.down('blockquote').innerHTML;
		this.extrabtns = postnode.down('.extrabtns');
		p.tempdiv = document.createElement('div');
		//pull out replies
		if(p.showreplies){
			$$('#'+postnode.id+' blockquote a').each(function(replylink){
				if(replylink.className.match(/ref/) && this.postid != p.opid){
					var postid_to = (replylink.onclick != null) ? replylink.onclick.toString().replace(/[^0-9]/g, '') : 0;
					p.tempdiv.innerHTML = '<a class="ref|'+p.board+'|'+p.opid+'|'+this.postid+'" onclick="return highlight('+this.postid+', true);" href="#'+this.postid+'">&gt;&gt;'+this.postid+'</a>';
					
					if(postid_to && typeof(postid_to)!='undefined' && typeof(this.postid) != "undefined" && p.replies.get(postid_to)){
						p.replies.get(postid_to).push(" "+p.tempdiv.innerHTML);
					}
					else{ 
						p.replies.set(postid_to,[p.tempdiv.innerHTML]);
					}
				}
			}.bind(this));
		}
	}
});
function eliminateDuplicates(arr) {
	var i,
	    len=arr.length,
	    out=[],
	    obj={};

	for (i=0;i<len;i++) {
		obj[arr[i]]=0;
	}
	for (i in obj) {
		out.push(i);
	}
	return out;
}


var Ponyup = Class.create ({
	posts: new Hash(),
	replies: new Hash(),
    	board: '',
    	opid: null,
	multi_reply: true,
	hide_trips: true,
	animate_gifs: true,
	use_lightbox: true,
	use_replybox: true,
	replybox_name: false,
	replybox_email: false,
	replybox_subject: false,
	replybox_spoiler: false,
	//replybox_nsfw: false,
	show_tineye_reverse_image_search: true,
	show_google_reverse_image_search: true,
	show_download_link: true,
	show_userimage_date: true,
	show_exif_link: true,
	post_timer: 0,
	one_click_save: true,
	bot_page_after_post: true,
	post_was_made: false,
	threading: true,
	autoupdate_thread: true,
	play_sound: true,
	use_altz: true,
	ispage: false,
	iscatalog: false,
	showreplies: true,
	settings_per_board: false,
	showpostnum: true,
	curpostcounter: 0,
	sound_has_played: false,
	autoupdate_timer: 30,
	postform_name: null,
	name_orig_bg: null,
     replybox: null,
     replybutton: null,
     rbreplybutton: null,
     replyboxdiv: null,
     replyboxclose: null,
     fileinput: null,
     thread: null,
     message: null,
     controlpanel: null,
     dlframe: null,
     cookie_props: ['hide_trips','animate_gifs','one_click_save','use_replybox','replybox_name','replybox_email','replybox_subject','replybox_spoiler','use_lightbox','show_tineye_reverse_image_search', 'show_google_reverse_image_search', 'show_download_link', 'show_exif_link','show_userimage_date','autoupdate_thread','play_sound','use_altz','bot_page_after_post','showreplies','settings_per_board'],
	//Constructor
	initialize: function(){
		this.dlframe = document.createElement('iframe');
		this.dlframe.style.visibility = 'hidden';
		this.dlframe.style.height = '0px';
		this.dlframe.id = 'oneclickdl';
		$$('body')[0].appendChild(this.dlframe);
		this.thread = $$('form div[id*="thread"]')[0];
		this.board = window.location.toString().split('/')[4];

	/* Cookie */
		var cookieversion = 'alwayswatching2';
		Cookie.init({name: 'ponyupmaster', path: '/', expires: 90});
		Cookie.retrieve();
		if(Cookie.getData('settings_per_board') == true){
			this.settings_per_board = true;
			Cookie.init({name: 'ponyup', path: '',expires: 90});
			Cookie.retrieve();
		}
		/*if(!Cookie.getData(cookieversion)){
			//Delete old version of the cookie and reload the page
			Cookie.init({name: 'ponyupmaster', path: '/', expires: 90});
			Cookie.erase();
			Cookie.init({name: 'ponyup', expires: 90});
			Cookie.erase();
			window.location.reload();
		}*/
		if(Cookie.getData(cookieversion)){
			//Load cookie ;3
			for(i=0; i<this.cookie_props.length; i++){
				this[this.cookie_props[i]] = Boolean(Cookie.getData(this.cookie_props[i]));
			}
			if(Cookie.getData('autoupdate_timer')){
				this.autoupdate_timer= Math.abs(Cookie.getData('autoupdate_timer'));
				if(isNaN(this.autoupdate_timer) || this.autupdate_timer < 15){
					this.autoupdate_timer = 15;
					Cookie.setData('autoupdate_timer',15);
					window.location = "http://www.youtube.com/watch?v=YcdyGoHdPw8";
				}
			} 
			else { 
				Cookie.setData('autoupdate_timer',30);
			}
		}
		else {
			Cookie.setData('showreplies',true);
			Cookie.setData('replybox_name',false);
			Cookie.setData('replybox_spoiler',false);
			//Cookie.setData('replybox_nsfw',false);
			Cookie.setData('sound_has_played',true);
			Cookie.setData('play_sound',true);
			Cookie.setData('use_altz', true);
			Cookie.setData('autoupdate_timer',30);
			//Set up a new cookie :3
			for(i=0; i<this.cookie_props.length; i++){
				Cookie.setData(this.cookie_props[i], this[this.cookie_props[i]]);
			}
			Cookie.setData(cookieversion, true);
			Cookie.store();
		}
	/* Control Panel */	
		var baritem = '<a id="ponyupmenu" class="adminbaritem" >'+ uparrow +'</a>';
		this.adminbar = $$('.adminbar')[0];
		this.adminbar.innerHTML = baritem + this.adminbar.innerHTML;
		this.controlpanel = document.createElement('div');
		this.cpinner = document.createElement('div');
		this.controlpanel.id = 'ponyupcpanel';	
		this.cpinner.id = 'cpinner';	
		this.controlpanel.setStyle({
			background:'#862667 url(\'http://ponyup.theoks.net/alwayswatching.png\') no-repeat top right',position:'fixed',right:'62px',top:'33px',color:'#fff',padding:'23px 10px 10px 10px',display:'none',fontSize:'15px',fontFamily:'Sans-serif',width:'335px'
		});
		if(navigator.userAgent.match(/chrome/i)){
			this.controlpanel.setStyle({
				background:'#862667 url(\'http://ponyup.theoks.net/alwayswatching.png\') no-repeat top right',position:'fixed',right:'62px',top:'33px',color:'#fff',padding:'23px 10px 10px 10px',display:'none',fontSize:'15px',fontFamily:'Sans-serif',width:'335px'
			});
		}
		this.cpinner.setStyle({
			maxHeight:'220px',overflow:'auto',marginTop:'10px'
		});
		Event.observe(document,'keyup',function(e){
			if(e.which == 17) isCtrl=false;
		}.bind(this));
		Event.observe(document,'keydown',function(e){
			if(e.which == 17) isCtrl=true;
			if(e.which == 81 && isCtrl == true) { //run code for CTRL+Q
				this.showreplyboxfromkey();
			}
		}.bind(this));

		this.cpinner.innerHTML += "Autoupdate Thread every <input id='autoupdate_timer_c' type='text' value="+this.autoupdate_timer+" style='width:20px'> seconds<br>";
		for(i=0; i<this.cookie_props.length; i++){
			if(this[this.cookie_props[i]] == true){
				this.cpinner.innerHTML += "<input id='"+ this.cookie_props[i] +"_c' type='checkbox' checked> Enable " + this.cookie_props[i].replace(/_/g," ") + "<br>";
			}
			else this.cpinner.innerHTML += "<input id='"+ this.cookie_props[i] +"_c' type='checkbox'> Enable " + this.cookie_props[i].replace(/_/g," ") + "<br>";
		}

		this.controlpanel.innerHTML += "<i>Thread Saver Utility</i><br><input type='button' id='c_screenshot_hide' value='Hide Unchecked Posts' style='margin-bottom:5px;margin-top:5px'><br>";
		this.controlpanel.innerHTML += "<input type='button' id='c_screenshot_show' value='Show All Posts'><br>";
		this.controlpanel.innerHTML += "<br><a id='helpscreen_link' href='javascript:void(0)' style='color:white;'>> Help Screen and Shortcut Keys</a>";
		this.controlpanel.innerHTML += "<br>Update Log coming soon..";
		this.controlpanel.innerHTML += "<br><div style='padding:3px;margin:5px 0px;color:black;font-size:18px;font-weight:400;color:white;text-shadow: black 0.1em 0.1em 0.2em'>Always Watching Edition</div><br>";
		this.controlpanel.innerHTML += "<input type='button' id='save_c' value='Save Settings'>";
		this.controlpanel.innerHTML += "<input style='float:right;position:relative;left:3px;' type='button' id='reset_c' value='RESET Settings'><br>";
				
		this.helpscreen = document.createElement('div');
		this.helpscreen.id = 'pup_helpscreen';
		this.helpscreen.setStyle({
			background:'#862667',position:'fixed',top:'33px',color:'#fff',padding:'10px',display:'none',fontSize:'15px',fontFamily:'Sans-serif',maxHeight:'460px',maxWidth:'460px',overflow:'auto'
		});
		this.helpscreen.innerHTML = '<div style="float:right;font-weight:bold;"><a id="close_helpscreen" href="javascript:void(0)" style="color:#fff;font-weight:bold">X Close</a></div><h3 style="display:inline;font-size:16px;">Help Screen</h3><div style="clear:both;margin-top:20px;"><b>Shortcut Keys</b><br>Recenter/Open Replybox: CTRL + Q</div><div style="margin-top:20px;"><b>Feature Descriptions</b><br>';
		this.helpscreen.innerHTML +='<i>hide trips</i><br>Blacks out the name box to conceal your trips for screenshot purposes or if there\'s people looking over your shoulder<br><br></div>';
		this.helpscreen.innerHTML +='<i>animate gifs</i><br>Animates Gifs while in thumbnail form.  Uses browser resizing so for higher quality gifs on boards that support it by default (such as pic) disabling it will yield higher quality animated gif thumbnails.<br><br></div>';
		this.helpscreen.innerHTML +='<i>one click save</i><br>Saves images with one click and uses the original user file name for the filename rather than the timestamp of ther server.  To get something more akin to the save as dialogue box, change your browser settings to ask you where to save downloads each time.  Due to the way firefox handles attachments, firefox will always ask you whether you want to open with something or save it.  Chrome won\'t have this issue.<br><br></div>';
		this.helpscreen.innerHTML +='<i>replybox</i><br>When hitting CTRL + Q or clicking a post number will open and center a bare bones version of the Reply form at the top of the page that is draggable.  Also contains a gototop link for if you wish to change other fields.<br><br></div>';
		this.helpscreen.innerHTML +='<i>lightbox</i><br>When clicking the thumbnail image it will open a lightbox, which will also allow you to puruse with next and prev buttons all image posts.<br><br></div>';
		this.helpscreen.innerHTML +='<i>tineye reverse image search</i><br>Inserts a link in the post that will look for that image in higher resolution online, while also helping you identify the source/where it came from and other places it has been used on the interwebs.<br><br></div>';
		this.helpscreen.innerHTML +='<i>google reverse image search</i><br>Same as tineye reverse image search but googles version, which usually has way more images indexed so use it first.<br><br></div>';
		this.helpscreen.innerHTML +='<i>show download link</i><br>Inserts a download image link into the post that contains a direct link to the image, especially useful if you have lightbox already turned on or if you wish to use save link as when you right click.<br><br></div>';
		this.helpscreen.innerHTML +='<i>show exif link</i><br>Takes you to a page that will show you all the exif meta data of the image, including things like if was last edited with GIMP, and many other things.  Handy tool for recolors or real life pictures especially.<br><br></div>';
		this.helpscreen.innerHTML +='<i>show userimage date</i><br>If someone downloads an image from the site it will have a unix timestamp of sorts as the filename.  If they never change the filename then repost, you can know from the original filename from the user what date that image they downloaded was posted.  Basically it gives you a rough idea of when they downloaded the image.  This is shown if you hover over an image that has a compatible user file name.<br><br></div>';
		this.helpscreen.innerHTML +='<i>autoupdate thread</i><br>Polls the page every 30 seconds for new replies and appends them to the thread using ajax.<br><br></div>';
		this.helpscreen.innerHTML +='<i>Thread Saver Utitily</i><br>If you like to save threads and/or have a thread folder you can appreciate the hours of time this can save you cutting and pasting and removing posts.  Useful for people who want to save epic posts for any reason.  Or for saving your ships or RPs or whatever.  You might even use it to clean up a thread you are in so it is easier to follow.  Just check the posts you want to keep for your screenshot, then click Hide Unchecked Posts.  And voila.  To reverse the effect just hit Show All Posts.  And presto.  I wish I had this so much earlier.<br><br></div>';

		$$('body')[0].appendChild(this.controlpanel);
		this.controlpanel.appendChild(this.cpinner);
		$$('body')[0].appendChild(this.helpscreen);
		Event.observe($('helpscreen_link'),'click',function(event){
			if(this.helpscreen.visible()){
				this.helpscreen.hide();
			}
			else this.helpscreen.show();
		}.bind(this));
		Event.observe($('close_helpscreen'),'click',function(event){
			this.helpscreen.hide();
		}.bind(this));

		Event.observe($('c_screenshot_hide'),'click',function(event){
			this.posts.each(function(pair){ 
				postid=pair.key;
				post = pair.value;
				if(postid!=p.opid){
					var checkbox = post.postnode.down('input[type=checkbox]');
					//console.log(checkbox);
					if(!checkbox.checked){
						post.postnode.parentNode.parentNode.hide();
					}
				}
			});
		}.bind(this));
		Event.observe($('c_screenshot_show'),'click',function(event){
			this.posts.each(function(pair){ 
				postid=pair.key;
				post = pair.value;
				post.postnode.parentNode.parentNode.show();
			});
		}.bind(this));

		this.pmenu = $('ponyupmenu');
		Event.observe(this.pmenu,'click',function(event){
			if(this.controlpanel.style.display == "none"){
				this.pmenu.innerHTML = downarrow;
				this.controlpanel.style.display = "block";
			}
			else {
				this.pmenu.innerHTML = uparrow;
				this.controlpanel.style.display = "none";
			}
			return false;
		}.bind(this));
		for(i=0; i<this.cookie_props.length; i++){
			Event.observe($(this.cookie_props[i]+'_c'),'change',function(event){
				var e=Event.element(event);
				var prop = e.id.replace(/_c$/,"");
				if(e.checked) this[prop]=true;
				else this[prop]=false;
				Cookie.setData(prop, this[prop]);
			}.bind(this));
		}
		Event.observe($('settings_per_board_c'),'change',function(event){
			var e=Event.element(event);
			var prop = e.id.replace(/_c$/,"");
			if(e.checked) this[prop]=true;
			else this[prop]=false;
			Cookie.setData(prop, this[prop]);
			Cookie.init({name: 'ponyupmaster', path: '/', expires: 90});
			Cookie.retrieve();
			Cookie.setData(prop, this[prop]);
			window.location.reload();
		}.bind(this));
		Event.observe($('autoupdate_timer_c'),'blur',function(event){
			var e=Event.element(event);
			var prop = e.id.replace(/_c$/,"");
			var tempvalue = Math.abs(e.value);
			if(isNaN(tempvalue)){
				window.location = "http://www.youtube.com/watch?v=FXCdR_B8Et0";
				return;
			}
			if(tempvalue<15){
				window.location = "http://www.youtube.com/watch?v=IA-22HJmp7w";
				return;
			}
			this.autoupdate_timer = tempvalue;
			if(this.autoupdate_timer < 15){
				this.autoupdate_timer = 15;
			}
			Cookie.setData(prop, this.autoupdate_timer);
		}.bind(this));
		Event.observe($('save_c'),'click',function(event){
			var e=Event.element(event);
			window.location.reload();
		}.bind(this));
		Event.observe($('reset_c'),'click',function(event){
			var e=Event.element(event);
			Cookie.init({name: 'ponyupmaster', path: '/', expires: 90});
			Cookie.erase();
			Cookie.init({name: 'ponyup', expires: 90});
			Cookie.erase();
			window.location.reload();
		}.bind(this));

	/* Check if Page */
		if(!window.location.toString().match(/\/res\//)){
			this.ispage = true;
			this.one_click_save= false;
			this.use_replybox= false;
			this.replybox_name= false;
			this.replybox_email= false;
			this.replybox_subject= false;
			this.replybox_spoiler= false;
			this.autoupdate_thread= false;
			this.showreplies= false;
		}
		if(window.location.toString().indexOf('catalog.html') !== -1){
			this.iscatalog = true;
			this.hide_trips = false;
		}
		if(!this.ispage && this.bot_page_after_post && Cookie.getData('post_was_made') == true){
			window.scrollTo(0,document.body.scrollHeight - window.innerHeight - 130);
			Cookie.setData('post_was_made',false);
		}
		
		/* Insert OP Replies section */
		if(!this.ispage) {
			Insertion.After($$('.reflink')[0], '<span class="extrabtns"></span>');
			
			$$('.extrabtns').each(function(extrabtns) {
				extrabtns.observe('mouseover', function(event) {
					$$('.navbar')[1].setStyle({width: '2500px'});
				})
			});
			$$('.extrabtns').each(function(extrabtns) {
				extrabtns.observe('mouseout', function(event) {
					$$('.navbar')[1].setStyle({width: 'auto'});
				})
			});
		}

	/* Iterate Posts */
		//add in OP
		$$('form div[id*="thread"]').each(function(reply){
			postid = reply.id.replace(/[^0-9]/g, '');
			if(!this.opid) this.opid=postid;
			this.posts.set(postid,new PonyPost(reply,postid,this));
		},this);
		$$('td.reply').each(function(reply){
			postid = reply.id.replace(/[^0-9]/g, '');
			this.posts.set(postid,new PonyPost(reply,postid,this));
		},this);
		//add in "highlight"
		$$('td.highlight').each(function(reply){
			postid = reply.id.replace(/[^0-9]/g, '');
			this.posts.set(postid,new PonyPost(reply,postid,this));
		},this);
		
		//console.log(this.replies);
	
	/* Reply Box */
		this.form = $('postform');
		this.postform_name = $$('#postform input[name=name]')[0];
		if(!this.ispage){
			this.fileinput = $$('#postform input[name=imagefile]')[0];
			this.fileinput.parentNode.id='changefileinputtd';
			this.fileinputph = document.createElement('a');
			this.fileinputph.innerHTML = '[Show File Input]';
			this.fileinputph.id = 'fileinputph';
			this.fileinputph.style.display = 'none';
			Event.observe(this.fileinputph,'click',function(event){
				$('changefileinputtd').insertBefore(this.fileinput,$('changefileinputtd').firstChild);
				this.hidereplybox();
				this.fileinputph.style.display = 'none';
			}.bind(this));
			$('changefileinputtd').insertBefore(this.fileinputph,$('changefileinputtd').firstChild);
			
			this.replybutton = $$('#postform input[value=Reply]')[0];
			this.rbreplybutton = this.replybutton.clone(true);
			this.rbreplybutton.removeAttribute("accesskey");
			this.replybutton.removeAttribute("accesskey");
			this.namefield = $$('#postform input[name=name]')[0];
			this.rbname = this.namefield.clone(true);
			this.rbname.removeAttribute("accesskey");
			this.emailfield = $$('#postform input[name=em]')[0];
			this.rbemail = this.emailfield.clone(true);
			this.rbemail.removeAttribute("accesskey");
			this.subjectfield = $$('#postform input[name=subject]')[0];
			this.rbsubject = this.subjectfield.clone(true);
			this.rbsubject.removeAttribute("accesskey");
			this.spoilerfield = $$('#postform input[name=spoiler]')[0];
			this.rbspoiler = this.spoilerfield.clone(true);
			this.rbspoiler.removeAttribute("accesskey");
			this.rbspoiler.id ='rbspoiler';
			/*this.nsfwfield = this.spoilerfield.clone(true);
			this.nsfwfield.id='nsfw';
			this.nsfwfield.name='nsfw';
			this.rbnsfw = this.nsfwfield.clone(true);
			this.rbnsfw.id ='rbnsfw';
			$('changefileinputtd').down('span').appendChild(this.nsfwfield);
			$('changefileinputtd').down('span').innerHTML += '<label for="nsfw">NSFW</label>';*/
			//this.rbreplybutton.style.cssFloat = "right";
			if(navigator.userAgent.match(/chrome/i)){
				this.rbreplybutton.style.marginLeft = "95px";
			}
			else this.rbreplybutton.style.marginLeft = "21px";
			
			Event.observe(this.rbreplybutton,'click',function(event){
				$('changefileinputtd').insertBefore(this.fileinput,$('changefileinputtd').firstChild);
				this.fileinputph.style.display = 'none';
				this.post_was_made = true;
				Cookie.setData('post_was_made',true);
				this.form.submit();
			}.bind(this));
			Event.observe(this.replybutton,'click',function(event){
				$('changefileinputtd').insertBefore(this.fileinput,$('changefileinputtd').firstChild);
				this.fileinputph.style.display = 'none';
				this.post_was_made = true;
				Cookie.setData('post_was_made',true);
				this.form.submit();
			}.bind(this));
			if(this.use_altz) {
				Event.observe(document,'keyup',function(e){
					if(e.which == 18) isAlt = false;
				}.bindAsEventListener(this));
				Event.observe(document,'keydown',function(e){
					/* $('postform') */
					if(e.which == 18) isAlt=true;
					if(e.altKey && e.which == 90 && isAlt) { //run code for ALT+Z
						$('changefileinputtd').insertBefore(this.fileinput,$('changefileinputtd').firstChild);
						this.fileinputph.style.display = 'none';
						this.post_was_made = true;
						Cookie.setData('post_was_made',true);
						this.form.submit();
					}
				}.bindAsEventListener(this));
			}
			this.name_orig_bg = this.postform_name.getStyle('background-color');
			this.message = this.form.down('textarea[name=message]');
			this.replybox = this.message.cloneNode(true);
			this.replybox.style.fontSize = '16px';
			this.replybox.style.fontFamily = 'sans-serif';
			this.replybox.style.width = '395px';
			this.replybox.value = this.message.value;
			this.replybox.id = 'replybox';
			/*Event.observe(this.replybox,'focus',function(event){
				this.replybox.value = this.message.value;
			}.bind(this));*/
			Event.observe(this.replybox,'keyup',function(event){
				this.message.value = this.replybox.value;
			}.bind(this));
			Event.observe(this.replybox,'change',function(event){
				this.message.value = this.replybox.value;
			}.bind(this));
			tempdiv = document.createElement('div');
			$$('body')[0].appendChild(tempdiv);
			replyboxstr = "<div id='replyboxdiv' style='width:402px;position:absolute;right:20px;top:0px'><table style='width:400px;;padding:5px;'><tr><td style='font-weight:bold;float:left'>Reply Box (Draggable)</td><td id='gototop'>[ ▲ Go To Top ▲ ]</td><td id='replyboxclose' style='float:right; font-weight:bold'>X Close</td></tr></table></div>";
			tempdiv.innerHTML = replyboxstr;
			this.replyboxdiv = $('replyboxdiv');
			this.replyboxdiv.hide();
			if(this.replybox_name){
				var label = document.createElement('label');
				label.innerHTML = 'Name: ';
				this.replyboxdiv.appendChild(label);
				this.replyboxdiv.appendChild(this.rbname);
				this.replyboxdiv.appendChild(document.createElement("br"));
				Event.observe(this.rbname,'keyup',function(event){
					this.namefield.value = this.rbname.value;
				}.bind(this));
			}
			if(this.replybox_email){
				var label = document.createElement('label');
				label.innerHTML = 'Email: ';
				this.replyboxdiv.appendChild(label);
				this.replyboxdiv.appendChild(this.rbemail);
				this.replyboxdiv.appendChild(document.createElement("br"));
				Event.observe(this.rbemail,'keyup',function(event){
					this.emailfield.value = this.rbemail.value;
				}.bind(this));
			}
			if(this.replybox_subject){
				var label = document.createElement('label');
				label.innerHTML = 'Subject: ';
				this.replyboxdiv.appendChild(label);
				this.replyboxdiv.appendChild(this.rbsubject);
				this.replyboxdiv.appendChild(document.createElement("br"));
				Event.observe(this.rbsubject,'keyup',function(event){
					this.subjectfield.value = this.rbsubject.value;
				}.bind(this));
			}
			if(this.replybox_spoiler){
				var label = document.createElement('label');
				label.innerHTML = 'Spoiler: ';
				this.replyboxdiv.appendChild(label);
				this.replyboxdiv.appendChild(this.rbspoiler);
				this.replyboxdiv.appendChild(document.createElement("br"));
				Event.observe(this.rbspoiler,'change',function(event){
					this.spoilerfield = $('spoiler');
					this.spoilerfield.checked = this.rbspoiler.checked;
				}.bind(this));
			}
			/*if(this.replybox_nsfw){
				var label = document.createElement('label');
				label.innerHTML = 'NSFW: ';
				this.replyboxdiv.appendChild(label);
				this.replyboxdiv.appendChild(this.rbnsfw);
				this.replyboxdiv.appendChild(document.createElement("br"));
				Event.observe(this.rbnsfw,'change',function(event){
					this.nsfwfield = $('nsfw');
					this.nsfwfield.checked = this.rbnsfw.checked;
				}.bind(this));
			}*/
			this.replyboxdiv.appendChild(this.replybox);
			this.replyboxclose = $('replyboxclose');
			new Draggable(this.replyboxdiv);
			Event.observe(this.replyboxclose,'click',this.hidereplybox.bind(this));
			Event.observe($('gototop'),'click',function(event){
				$('changefileinputtd').insertBefore(this.fileinput,$('changefileinputtd').firstChild);
				this.hidereplybox();
				this.fileinputph.style.display = 'none';
				Element.scrollTo($$('div.logo')[0]);
			}.bind(this));
			this.replyboxdiv.appendChild(document.createElement("br"));
			var br = document.createElement("span");
			br.id = 'fileinputbefore';
			this.replyboxdiv.appendChild(br);
			this.replyboxdiv.appendChild(this.rbreplybutton);
			/*Event.observe(this.rbfileinput,'change',function(event){
				this.fileinput.parentNode.removeChild(this.fileinput);
				console.log($('changefileinputtd').firstChild);
				$('changefileinputtd').insertBefore(this.rbfileinput.clone(true),$('changefileinputtd').firstChild);
			}.bind(this));*/
		}

		if(this.hide_trips){
			color = this.postform_name.getStyle('color');
			var begin =  document.cookie.indexOf("pcstyle=") + "pcstyle=".length;
			var end = document.cookie.indexOf(";", begin) != -1 ? document.cookie.indexOf(";", begin) : document.cookie.length;
			var themeName = document.cookie.substring(begin, end);
			// set the background to the color, or if it's vinyl, remove the background image as well.
			if (themeName === "vinyl") {
				this.postform_name.setStyle({background: 'none ' + color + ' !important'});
				if(!this.ispage)
					this.rbname.setStyle({backgroundColor:'#000'});
			} else {
				this.postform_name.setStyle({backgroundColor:color});
				if(!this.ispage)
					this.rbname.setStyle({backgroundColor:'#000'});
			}
			Event.observe(this.postform_name,'focus',this.show_trips.bind(this));
			Event.observe(this.postform_name,'blur',this.hide_trips_f.bind(this));
			if(!this.ispage) {
				Event.observe(this.rbname,'focus',this.show_trips.bind(this));
				Event.observe(this.rbname,'blur',this.hide_trips_f.bind(this));
			}
		}

	/* after load work per reply */
		//perform the work based on options for each post
		this.iterate_posts();
		addpreviewevents();
	
	/* Auto updater */
		if(this.autoupdate_thread){
			if(!isNaN(this.autoupdate_timer)) this.autoupdate_timer = 15;
			if(this.autoupdate_timer < 15) this.autoupdate_timer = 15;
			var autoupdater_source = document.createElement('div');
			autoupdater_source.style.display = 'none';
			autoupdater_source.id = "newpage";
			$$('body')[0].appendChild(autoupdater_source);
			//find the last span if it's there and move it
			var lastChild = $$('form div[id*="thread"]>span:last-child')[0];
			if(lastChild){
				this.thread.parentNode.insertBefore(lastChild,this.thread.next());
			}
			
			this.interval = new PeriodicalExecuter(function(pe) {
				//Get the page:
				reqtime = new Date();

				var url = window.location.toString().split('#')[0];
				new Ajax.Request(url, {
					method: 'get',
					onSuccess: function(transport) {
						//load it into the dom so we can use css selectors
						matcharray = transport.responseText.match(/<body>([\s\S]*)<\/body>/ig);
						$('newpage').innerHTML = matcharray[0]; 

						//Get the last post id that equals
						currkeys = p.posts.keys();
						lastkey = currkeys[currkeys.length - 1];
						lastpostid = p.posts.get(lastkey).postid;

						//parse
						p.newposts = new Hash();
						$$('#newpage td.reply').each(function(reply){
							postid = reply.id.replace(/[^0-9]/g, '');
							//console.log('post id is ' + postid, 'last postid is ' + lastpostid);
							if(Number(postid) > Number(lastpostid)){
								p.newposts.set(postid,new PonyPost(reply,postid,p));
							}
						},p);

						//append the new and run our script on these posts
						p.newposts.each(function(pair){
							postid=pair.key;
							post = pair.value;
							//magic
							var newreply = $('reply'+postid).up('table');
							var newlink = $('reply'+postid).down('.reflink a',1);
							//console.log('link is ',newlink);
							newlink.onclick = function(){ return ponychaninsert('>>' +newlink.innerHTML +'\n'); }
							//Event.observe(newlink,'click',function(){ return ponychaninsert('>>' +newlink.innerHTML +'\n'); });
							p.thread.appendChild(newreply);
							p.posts.set(postid,post);
							p.iterate_a_post(postid,post);
						},p);
						addpreviewevents();
					},
					onFailure: function(transport) {
						//console.log('failed ' + transport.status);
						//stop if this is 404'd
						if(404 == transport.status){
							var r = puz_confirm('Your page has 404\'d!  Stop polling for new replies?');
							if(r) pe.stop();
						}
						else console.log('Could not retrieve page update');
					}
				});
			}, this.autoupdate_timer);//this.autoupdate_timer * 1000);
		}
	},
	iterate_posts: function(){
		this.posts.each(function(pair){ 
			postid=pair.key;
			post = pair.value;
			//add lightbox
			if(post.thumb && this.use_lightbox){ 
				post.imagelink.writeAttribute('rel','lightbox[roadtrip]');
				t = "<span class='postername'>"+post.user.innerHTML +"</span>";
				if(post.trip) t+= "<span class='postertrip'>"+post.trip.innerHTML+"</span>";
				t+= "<div class='reply'>"+post.blockquote+"</div>";
				//post.imagelink.writeAttribute('title',t);
			}
			if(this.animate_gifs && post.imagetype == 'gif'){
				x = post.thumb.getWidth();
				y = post.thumb.getHeight();
				if(x != 128 && y != 160) expandimg(postid, post.imagelink, post.thumb.src, x, y, x, y);
			}
			if(post.imagedatehuman){
				/*span = document.createElement('span');
				span.appendChild(document.createTextNode(' User\'s Image uploaded: ' + post.imagedatehuman + ' ')); 
				span.style.fontStyle = 'italic';*/
				post.imagelink.writeAttribute('title','Estimated Date This Picture Was Downloaded From Ponychan: ' + post.imagedatehuman + ' ');
				//post.filesizenode.appendChild(span);
			}
			if(this.showreplies){
				var repliesspan = document.createElement('span');
				repliesspan.className='repliesspan';
				var a = this.replies.get(postid);
				//console.log(postid,a);
				if(a){
					repliesspan.innerHTML += "Replies: ";
					for(var i=0;i<a.length;i++){
						if(a[i]) repliesspan.innerHTML += a[i];
					}
					post.extrabtns.appendChild(repliesspan);
				}
			}
			Event.observe(post.replylink,'click',this.showreplybox.bind(this));
		},this);
	},
	iterate_a_post: function(postid,post){
		//add lightbox
		if(post.thumb && this.use_lightbox){ 
			post.imagelink.writeAttribute('rel','lightbox[roadtrip]');
			t = "<span class='postername'>"+post.user.innerHTML +"</span>";
			if(post.trip) t+= "<span class='postertrip'>"+post.trip.innerHTML+"</span>";
			t+= "<div class='reply'>"+post.blockquote+"</div>";
			//post.imagelink.writeAttribute('title',t);
		}
		if(this.animate_gifs && post.imagetype == 'gif'){
			x = post.thumb.getWidth();
			y = post.thumb.getHeight();
			if(x != 128 && y != 160) expandimg(postid, post.imagelink, post.thumb.src, x, y, x, y);
		}
		if(post.imagedatehuman){
			/*span = document.createElement('span');
			span.appendChild(document.createTextNode(' User\'s Image uploaded: ' + post.imagedatehuman + ' ')); 
			span.style.fontStyle = 'italic';*/
			post.imagelink.writeAttribute('title','Estimated Date This Picture Was Downloaded From Ponychan: ' + post.imagedatehuman + ' ');
			//post.filesizenode.appendChild(span);
		}
		
		if(p.showreplies){
			$$('#reply'+postid+' blockquote a').each(function(replylink){
				if(replylink.className.match(/ref/) && postid != p.opid){
					var postid_to = (replylink.onclick != null) ? replylink.onclick.toString().replace(/[^0-9]/g, '') : 0;
					/*p.tempdiv.innerHTML = '<a class="ref|'+p.board+'|'+p.opid+'|'+postid+'" onclick="return highlight('+postid+', true);" href="#'+postid+'">&gt;&gt;'+postid+'</a>';

					if(postid_to && typeof(postid_to)!=undefined && typeof(postid) != undefined && p.replies.get(postid_to)){
						p.replies.get(postid_to).push(" "+p.tempdiv.innerHTML);
					}
					else{ 
						p.replies.set(postid_to,[p.tempdiv.innerHTML]);
					}*/
					var post_to = p.posts.get(postid_to);
					post_to = post_to.postnode;
					var repliesspan = null;

					if(post_to.down('.repliesspan')!=undefined){
						repliesspan = post_to.down('.repliesspan');
						repliesspan.innerHTML = '';
					}
					else {
						repliesspan = document.createElement('span');
						repliesspan.className='repliesspan';
					}
					var a = p.replies.get(postid_to);
					if(a){
						a = eliminateDuplicates(a);
						repliesspan.innerHTML += "Replies: ";
						for(var i=0;i<a.length;i++){
							if(a[i]) repliesspan.innerHTML += a[i];
						}
						p.posts.get(postid_to).extrabtns.appendChild(repliesspan);
					}
				}
			}.bind(this));
			$$('.extrabtns').each(function(extrabtns) {
				extrabtns.observe('mouseover', function(event) {
					$$('.navbar')[1].setStyle({width: '2500px'});
				})
			});
			$$('.extrabtns').each(function(extrabtns) {
				extrabtns.observe('mouseout', function(event) {
					$$('.navbar')[1].setStyle({width: 'auto'});
				})
			});
		}
		Event.observe(post.replylink,'click',this.showreplybox.bind(this));
    },
    hide_trips_f: function(){
		color = this.postform_name.getStyle('color');
		// get style cookie and compare to Vinyl Trance
		var begin =  document.cookie.indexOf("pcstyle=") + "pcstyle=".length;
		var end = document.cookie.indexOf(";", begin) != -1 ? document.cookie.indexOf(";", begin) : document.cookie.length;
		var themeName = document.cookie.substring(begin, end);
		// set the background to the color, or if it's vinyl, remove the background image as well.
		if (themeName === "vinyl") {
			this.postform_name.setStyle({background: 'none ' + color + ' !important'});
			this.rbname.setStyle({backgroundColor:  '#000'});
		} else {
			this.postform_name.setStyle({backgroundColor:color});
			this.rbname.setStyle({backgroundColor:  '#000'});
		}
    },
    show_trips: function(){
		var begin =  document.cookie.indexOf("pcstyle=") + "pcstyle=".length;
		var end = document.cookie.indexOf(";", begin) != -1 ? document.cookie.indexOf(";", begin) : document.cookie.length;
		var themeName = document.cookie.substring(begin, end);
		if (themeName === "vinyl") {
			this.postform_name.setStyle({background: 'url("http://www.ponychan.net/chan/css/images/vinyl-bg1b.png") !important'});
			this.rbnamethis.setStyle({backgroundColor: '#fff'});
		} else {
			this.postform_name.setStyle({backgroundColor:this.name_orig_bg});
			this.rbname.setStyle({backgroundColor: '#fff'});
		}
    },
    showreplyboxfromkey: function(event){
		if(this.use_replybox == false) return;
		var pos = window.pageYOffset + 130;
		this.replyboxdiv.style.top = pos + 'px';
		this.replybox.value = this.message.value;
		this.replyboxdiv.insertBefore(this.fileinput,$('fileinputbefore'));
		this.fileinputph.style.display = 'inline';
		this.replyboxdiv.show();
    },
    showreplybox: function(event){
		if(this.use_replybox == false) return;
		var e=Event.element(event);
		offset = e.cumulativeOffset();
		this.replyboxdiv.style.top = offset.top +'px';
		this.replybox.value = this.message.value;
		this.replyboxdiv.insertBefore(this.fileinput,$('fileinputbefore'));
		this.fileinputph.style.display = 'inline';
		this.replyboxdiv.show();
    },
    hidereplybox: function(event){
		if(this.use_replybox == false) return;
		$('changefileinputtd').insertBefore(this.fileinput,$('changefileinputtd').firstChild);
		this.fileinputph.style.display = 'none';
		this.replyboxdiv.hide();
    },
});
var p = null;
/*document.observe("dom:loaded", function(event) {
	p = new Ponyup();
	fixinsertnamespace();
});*/
p = new Ponyup();
fixinsertnamespace();

function load_halloween_sound(){
	var iframe = document.createElement('iframe');
	var first = 'http://free-loops.com/4035-evil-growl.html';
	var sounds = ['http://free-loops.com/6092-souls-leaving-body.html','http://free-loops.com/5969-halloween-organ.html','http://free-loops.com/5991-ghost-sounds.html','http://free-loops.com/6083-killing-horror.html','http://free-loops.com/4041-witch-evil-laugh.html','http://free-loops.com/8148-spooky-child.html','http://free-loops.com/2197-scary-beach.html','http://free-loops.com/8059-bat-flyby.html','http://free-loops.com/2067-scary-monster.html','http://free-loops.com/6095-chains-clinking.html','http://free-loops.com/5988-woman-sobbing.html','http://free-loops.com/6073-movie-suspense.html','http://free-loops.com/6029-evil-laugh.html','http://free-loops.com/4035-evil-growl.html','http://free-loops.com/2040-annoying-witch-laugh.html','http://free-loops.com/6094-zombies-moaning.html','http://free-loops.com/6000-witch-cackle.html','http://free-loops.com/2047-chains-rattling.html'];
	iframe.setStyle({ visibility:'hidden' });
	if(!p.sound_has_played) {
		iframe.src = first;
		this.sound_has_played = true;
	}
	else iframe.src = sounds[Math.floor(Math.random() * sounds.length)];
	//console.log(iframe);
	$$('body')[0].appendChild(iframe);
}
//if(p.play_sound) load_halloween_sound();