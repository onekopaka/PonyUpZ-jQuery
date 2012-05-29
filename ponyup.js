//////////////
/* builder  */
//////////////

var Builder={NODEMAP:{AREA:"map",CAPTION:"table",COL:"table",COLGROUP:"table",LEGEND:"fieldset",OPTGROUP:"select",OPTION:"select",PARAM:"object",TBODY:"table",TD:"table",TFOOT:"table",TH:"table",THEAD:"table",TR:"table"},node:function(a,b,e){var a=a.toUpperCase(),d=document.createElement(this.NODEMAP[a]||"div");try{d.innerHTML="<"+a+"></"+a+">"}catch(g){}var c=d.firstChild||null;c&&c.tagName.toUpperCase()!=a&&(c=c.getElementsByTagName(a)[0]);c||(c=document.createElement(a));if(c){if(b)if(this._isStringOrNumber(b)||
b instanceof Array||b.tagName)this._children(c,b);else{var f=this._attributes(b);if(f.length){try{d.innerHTML="<"+a+" "+f+"></"+a+">"}catch(h){}c=d.firstChild||null;if(!c)for(attr in c=document.createElement(a),b)c[attr=="class"?"className":attr]=b[attr];c.tagName.toUpperCase()!=a&&(c=d.getElementsByTagName(a)[0])}}e&&this._children(c,e);return $jq(c)}},_text:function(a){return document.createTextNode(a)},ATTR_MAP:{className:"class",htmlFor:"for"},_attributes:function(a){var b=[];for(attribute in a)b.push((attribute in
this.ATTR_MAP?this.ATTR_MAP[attribute]:attribute)+'="'+a[attribute].toString().escapeHTML().gsub(/"/,"&quot;")+'"');return b.join(" ")},_children:function(a,b){b.tagName?a.appendChild(b):typeof b=="object"?b.flatten().each(function(b){typeof b=="object"?a.appendChild(b):Builder._isStringOrNumber(b)&&a.appendChild(Builder._text(b))}):Builder._isStringOrNumber(b)&&a.appendChild(Builder._text(b))},_isStringOrNumber:function(a){return typeof a=="string"||typeof a=="number"},build:function(a){var b=this.node("div");
$jq(b).update(a.strip());return b.children()},dump:function(a){typeof a!="object"&&typeof a!="function"&&(a=window);"A ABBR ACRONYM ADDRESS APPLET AREA B BASE BASEFONT BDO BIG BLOCKQUOTE BODY BR BUTTON CAPTION CENTER CITE CODE COL COLGROUP DD DEL DFN DIR DIV DL DT EM FIELDSET FONT FORM FRAME FRAMESET H1 H2 H3 H4 H5 H6 HEAD HR HTML I IFRAME IMG INPUT INS ISINDEX KBD LABEL LEGEND LI LINK MAP MENU META NOFRAMES NOSCRIPT OBJECT OL OPTGROUP OPTION P PARAM PRE Q S SAMP SCRIPT SELECT SMALL SPAN STRIKE STRONG STYLE SUB SUP TABLE TBODY TD TEXTAREA TFOOT TH THEAD TITLE TR TT U UL VAR".split(/\s+/).each(function(b){a[b]=
function(){return Builder.node.apply(Builder,[b].concat($A(arguments)))}})}};

/////////////
/* Cookie  */
/////////////

var Cookie={data:{},options:{expires:1,domain:"",path:"",secure:!1},init:function(a,b){Cookie.options=Object.extend(Cookie.options,a||{});var c=Cookie.retrieve();Cookie.data=c?c.evalJSON():b||{};Cookie.store()},getData:function(a){return Cookie.data[a]},setData:function(a,b){Cookie.data[a]=b;Cookie.store()},removeData:function(a){delete Cookie.data[a];Cookie.store()},retrieve:function(){var a=document.cookie.indexOf(Cookie.options.name+"=");if(a==-1)return null;if(Cookie.options.name!=document.cookie.substr(a,
Cookie.options.name.length))return null;var a=a+Cookie.options.name.length+1,b=document.cookie.indexOf(";",a);if(b==-1)b=document.cookie.length;return unescape(document.cookie.substring(a,b))},store:function(){var a="";if(Cookie.options.expires)var b=new Date,a=Cookie.options.expires*864E5,a=";expires="+new Date(b.getTime()+a);document.cookie=Cookie.options.name+"="+escape(Object.toJSON(Cookie.data))+Cookie.getOptions()+a},erase:function(){document.cookie=Cookie.options.name+"="+Cookie.getOptions()+
";expires=Thu, 01-Jan-1970 00:00:01 GMT"},getOptions:function(){return(Cookie.options.path?";path="+Cookie.options.path:"")+(Cookie.options.domain?";domain="+Cookie.options.domain:"")+(Cookie.options.secure?";secure":"")}};

////////////////
/* Lightbox2  */
////////////////

(function(){var $,Lightbox,LightboxOptions;$=$jq;LightboxOptions=function(){function LightboxOptions(){this.fileLoadingImage="http://ponyup.theoks.net/loading.gif";this.fileCloseImage="http://ponyup.theoks.net/closelabel.gif";this.resizeDuration=700;this.fadeDuration=500;this.labelImage="Image";this.labelOf="of"}return LightboxOptions}();Lightbox=function(){function Lightbox(options){this.options=options;this.album=[];this.currentImageIndex=void 0;this.init()}Lightbox.prototype.init=function(){this.enable();
return this.build()};Lightbox.prototype.enable=function(){var _this=this;return $("body").on("click","a[rel^=lightbox], area[rel^=lightbox]",function(e){_this.start($(e.currentTarget));return false})};Lightbox.prototype.build=function(){var $lightbox,_this=this;$("<div>",{id:"lightboxOverlay"}).after($("<div/>",{id:"lightbox"}).append($("<div/>",{"class":"lb-outerContainer"}).append($("<div/>",{"class":"lb-container"}).append($("<img/>",{"class":"lb-image"}),$("<div/>",{"class":"lb-nav"}).append($("<a/>",
{"class":"lb-prev"}),$("<a/>",{"class":"lb-next"})),$("<div/>",{"class":"lb-loader"}).append($("<a/>",{"class":"lb-cancel"}).append($("<img/>",{src:this.options.fileLoadingImage}))))),$("<div/>",{"class":"lb-dataContainer"}).append($("<div/>",{"class":"lb-data"}).append($("<div/>",{"class":"lb-details"}).append($("<span/>",{"class":"lb-caption"}),$("<span/>",{"class":"lb-number"})),$("<div/>",{"class":"lb-closeContainer"}).append($("<a/>",{"class":"lb-close"}).append($("<img/>",{src:this.options.fileCloseImage}))))))).appendTo($("body"));
$("#lightboxOverlay").hide().on("click",function(e){_this.end();return false});$lightbox=$("#lightbox");$lightbox.hide().on("click",function(e){if($(e.target).attr("id")==="lightbox")_this.end();return false});$lightbox.find(".lb-outerContainer").on("click",function(e){if($(e.target).attr("id")==="lightbox")_this.end();return false});$lightbox.find(".lb-prev").on("click",function(e){_this.changeImage(_this.currentImageIndex-1);return false});$lightbox.find(".lb-next").on("click",function(e){_this.changeImage(_this.currentImageIndex+
1);return false});$lightbox.find(".lb-loader, .lb-close").on("click",function(e){_this.end();return false})};Lightbox.prototype.start=function($link){var $lightbox,$window,a,i,imageNumber,left,top,_len,_ref;$(window).on("resize",this.sizeOverlay);$("select, object, embed").css({visibility:"hidden"});$("#lightboxOverlay").width($(document).width()).height($(document).height()).fadeIn(this.options.fadeDuration);this.album=[];imageNumber=0;if($link.attr("rel")==="lightbox")this.album.push({link:$link.attr("href"),
title:$link.attr("title")});else{_ref=$($link.prop("tagName")+'[rel="'+$link.attr("rel")+'"]');for(i=0,_len=_ref.length;i<_len;i++){a=_ref[i];this.album.push({link:$(a).attr("href"),title:$(a).attr("title")});if($(a).attr("href")===$link.attr("href"))imageNumber=i}}$window=$(window);top=$window.scrollTop()+$window.height()/10;left=$window.scrollLeft();$lightbox=$("#lightbox");$lightbox.css({top:top+"px",left:left+"px"}).fadeIn(this.options.fadeDuration);this.changeImage(imageNumber)};Lightbox.prototype.changeImage=
function(imageNumber){var $image,$lightbox,preloader,_this=this;this.disableKeyboardNav();$lightbox=$("#lightbox");$image=$lightbox.find(".lb-image");this.sizeOverlay();$("#lightboxOverlay").fadeIn(this.options.fadeDuration);$(".loader").fadeIn("slow");$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide();$lightbox.find(".lb-outerContainer").addClass("animating");preloader=new Image;preloader.onload=function(){$image.attr("src",_this.album[imageNumber].link);
$image.width=preloader.width;$image.height=preloader.height;return _this.sizeContainer(preloader.width,preloader.height)};preloader.src=this.album[imageNumber].link;this.currentImageIndex=imageNumber};Lightbox.prototype.sizeOverlay=function(){return $("#lightboxOverlay").width($(document).width()).height($(document).height())};Lightbox.prototype.sizeContainer=function(imageWidth,imageHeight){var $container,$lightbox,$outerContainer,containerBottomPadding,containerLeftPadding,containerRightPadding,
containerTopPadding,newHeight,newWidth,oldHeight,oldWidth,_this=this;$lightbox=$("#lightbox");$outerContainer=$lightbox.find(".lb-outerContainer");oldWidth=$outerContainer.outerWidth();oldHeight=$outerContainer.outerHeight();$container=$lightbox.find(".lb-container");containerTopPadding=parseInt($container.css("padding-top"),10);containerRightPadding=parseInt($container.css("padding-right"),10);containerBottomPadding=parseInt($container.css("padding-bottom"),10);containerLeftPadding=parseInt($container.css("padding-left"),
10);newWidth=imageWidth+containerLeftPadding+containerRightPadding;newHeight=imageHeight+containerTopPadding+containerBottomPadding;if(newWidth!==oldWidth&&newHeight!==oldHeight)$outerContainer.animate({width:newWidth,height:newHeight},this.options.resizeDuration,"swing");else if(newWidth!==oldWidth)$outerContainer.animate({width:newWidth},this.options.resizeDuration,"swing");else if(newHeight!==oldHeight)$outerContainer.animate({height:newHeight},this.options.resizeDuration,"swing");setTimeout(function(){$lightbox.find(".lb-dataContainer").width(newWidth);
$lightbox.find(".lb-prevLink").height(newHeight);$lightbox.find(".lb-nextLink").height(newHeight);_this.showImage()},this.options.resizeDuration)};Lightbox.prototype.showImage=function(){var $lightbox;$lightbox=$("#lightbox");$lightbox.find(".lb-loader").hide();$lightbox.find(".lb-image").fadeIn("slow");this.updateNav();this.updateDetails();this.preloadNeighboringImages();this.enableKeyboardNav()};Lightbox.prototype.updateNav=function(){var $lightbox;$lightbox=$("#lightbox");$lightbox.find(".lb-nav").show();
if(this.currentImageIndex>0)$lightbox.find(".lb-prev").show();if(this.currentImageIndex<this.album.length-1)$lightbox.find(".lb-next").show()};Lightbox.prototype.updateDetails=function(){var $lightbox,_this=this;$lightbox=$("#lightbox");if(typeof this.album[this.currentImageIndex].title!=="undefined"&&this.album[this.currentImageIndex].title!=="")$lightbox.find(".lb-caption").html(this.album[this.currentImageIndex].title).fadeIn("fast");if(this.album.length>1)$lightbox.find(".lb-number").html(this.options.labelImage+
" "+(this.currentImageIndex+1)+" "+this.options.labelOf+"  "+this.album.length).fadeIn("fast");else $lightbox.find(".lb-number").hide();$lightbox.find(".lb-outerContainer").removeClass("animating");$lightbox.find(".lb-dataContainer").fadeIn(this.resizeDuration,function(){return _this.sizeOverlay()})};Lightbox.prototype.preloadNeighboringImages=function(){var preloadNext,preloadPrev;if(this.album.length>this.currentImageIndex+1){preloadNext=new Image;preloadNext.src=this.album[this.currentImageIndex+
1].link}if(this.currentImageIndex>0){preloadPrev=new Image;preloadPrev.src=this.album[this.currentImageIndex-1].link}};Lightbox.prototype.enableKeyboardNav=function(){$(document).on("keyup.keyboard",$.proxy(this.keyboardAction,this))};Lightbox.prototype.disableKeyboardNav=function(){$(document).off(".keyboard")};Lightbox.prototype.keyboardAction=function(event){var KEYCODE_ESC,KEYCODE_LEFTARROW,KEYCODE_RIGHTARROW,key,keycode;KEYCODE_ESC=27;KEYCODE_LEFTARROW=37;KEYCODE_RIGHTARROW=39;keycode=event.keyCode;
key=String.fromCharCode(keycode).toLowerCase();if(keycode===KEYCODE_ESC||key.match(/x|o|c/))this.end();else if(key==="p"||keycode===KEYCODE_LEFTARROW){if(this.currentImageIndex!==0)this.changeImage(this.currentImageIndex-1)}else if(key==="n"||keycode===KEYCODE_RIGHTARROW)if(this.currentImageIndex!==this.album.length-1)this.changeImage(this.currentImageIndex+1)};Lightbox.prototype.end=function(){this.disableKeyboardNav();$(window).off("resize",this.sizeOverlay);$("#lightbox").fadeOut(this.options.fadeDuration);
$("#lightboxOverlay").fadeOut(this.options.fadeDuration);return $("select, object, embed").css({visibility:"visible"})};return Lightbox}();$(function(){var lightbox,options;options=new LightboxOptions;return lightbox=new Lightbox(options)})}).call(this);

//////////////////////
/* jQuery.scrollTo  */
//////////////////////
(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:"xy",duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=="BackCompat"?e.body:e.documentElement})};d.fn.scrollTo=
function(n,j,b){if(typeof j=="object"){b=j;j=0}if(typeof b=="function")b={onAfter:b};if(n=="max")n=9E9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is("html,body");switch(typeof f){case "number":case "string":if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case "object":if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(""),
function(a,i){var e=i=="x"?"Left":"Top",h=e.toLowerCase(),c="scroll"+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css("margin"+e))||0;g[c]-=parseInt(f.css("border"+e+"Width"))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=="x"?"width":"height"]()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=="%"?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,
j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=="x"?"Width":"Height",h="scroll"+e;if(!d(a).is("html,body"))return a[h]-d(a)[e.toLowerCase()]();var c="client"+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=="object"?a:{top:a,left:a}}})(jQuery);

///////////////////////
/* Digg Class class  */
///////////////////////

(function($){Class={create:function(){var s=arguments.length>0&&arguments[arguments.length-1].constructor==Boolean?arguments[arguments.length-1]:false;var c=s?{}:function(){this.init.apply(this,arguments)};var methods={ns:[],supers:{},init:function(){},namespace:function(ns){if(!ns)return null;var _this=this;if(ns.constructor==Array){$.each(ns,function(){_this.namespace.apply(_this,[this])});return}else if(ns.constructor==Object){for(var key in ns)if([Object,Function].indexOf(ns[key].constructor)>
-1){if(!this.ns)this.ns=[];this.ns[key]=ns[key];this.namespace.apply(this,[key])}return}var levels=ns.split(".");var nsobj=this.prototype?this.prototype:this;$.each(levels,function(){nsobj[this]=_this.ns[this]||nsobj[this]||window[this]||Class.create(true);delete _this.ns[this];nsobj=nsobj[this]});return nsobj},create:function(){var args=Array.prototype.slice.call(arguments);var name=args.shift();var temp=Class.create.apply(Class,args);var ns={};ns[name]=temp;this.namespace(ns)},sup:function(){try{var caller=
this.sup.caller.name;this.supers[caller].apply(this,arguments)}catch(noSuper){return false}}};s?delete methods.init:null;$.extend(c,methods);if(!s)$.extend(c.prototype,methods);var extendee=s?c:c.prototype;$.each(arguments,function(){if(this.constructor==Object||typeof this.init!=undefined)for(i in this){if(extendee[i]&&extendee[i].constructor==Function&&["namespace","create","sup"].indexOf(i)==-1){this[i].name=extendee[i].name=i;extendee.supers[i]=extendee[i]}extendee[i]=this[i]}});return c}}})(jQuery);

////////////////
/* Hashtable  */
////////////////

var Hashtable=function(){var p="function";var n=typeof Array.prototype.splice==p?function(s,r){s.splice(r,1)}:function(u,t){var s,v,r;if(t===u.length-1)u.length=t;else{s=u.slice(t+1);u.length=t;for(v=0,r=s.length;v<r;++v)u[t+v]=s[v]}};function a(t){var r;if(typeof t=="string")return t;else if(typeof t.hashCode==p){r=t.hashCode();return typeof r=="string"?r:a(r)}else if(typeof t.toString==p)return t.toString();else try{return String(t)}catch(s){return Object.prototype.toString.call(t)}}function g(r,
s){return r.equals(s)}function e(r,s){return typeof s.equals==p?s.equals(r):r===s}function c(r){return function(s){if(s===null)throw new Error("null is not a valid "+r);else if(typeof s=="undefined")throw new Error(r+" must not be undefined");}}var q=c("key"),l=c("value");function d(u,s,t,r){this[0]=u;this.entries=[];this.addEntry(s,t);if(r!==null)this.getEqualityFunction=function(){return r}}var h=0,j=1,f=2;function o(r){return function(t){var s=this.entries.length,v,u=this.getEqualityFunction(t);
while(s--){v=this.entries[s];if(u(t,v[0]))switch(r){case h:return true;case j:return v;case f:return[s,v[1]]}}return false}}function k(r){return function(u){var v=u.length;for(var t=0,s=this.entries.length;t<s;++t)u[v+t]=this.entries[t][r]}}d.prototype={getEqualityFunction:function(r){return typeof r.equals==p?g:e},getEntryForKey:o(j),getEntryAndIndexForKey:o(f),removeEntryForKey:function(s){var r=this.getEntryAndIndexForKey(s);if(r){n(this.entries,r[0]);return r[1]}return null},addEntry:function(r,
s){this.entries[this.entries.length]=[r,s]},keys:k(0),values:k(1),getEntries:function(s){var u=s.length;for(var t=0,r=this.entries.length;t<r;++t)s[u+t]=this.entries[t].slice(0)},containsKey:o(h),containsValue:function(s){var r=this.entries.length;while(r--)if(s===this.entries[r][1])return true;return false}};function m(s,t){var r=s.length,u;while(r--){u=s[r];if(t===u[0])return r}return null}function i(r,s){var t=r[s];return t&&t instanceof d?t:null}function b(t,r){var w=this;var v=[];var u={};var x=
typeof t==p?t:a;var s=typeof r==p?r:null;this.put=function(B,C){q(B);l(C);var D=x(B),E,A,z=null;E=i(u,D);if(E){A=E.getEntryForKey(B);if(A){z=A[1];A[1]=C}else E.addEntry(B,C)}else{E=new d(D,B,C,s);v[v.length]=E;u[D]=E}return z};this.get=function(A){q(A);var B=x(A);var C=i(u,B);if(C){var z=C.getEntryForKey(A);if(z)return z[1]}return null};this.containsKey=function(A){q(A);var z=x(A);var B=i(u,z);return B?B.containsKey(A):false};this.containsValue=function(A){l(A);var z=v.length;while(z--)if(v[z].containsValue(A))return true;
return false};this.clear=function(){v.length=0;u={}};this.isEmpty=function(){return!v.length};var y=function(z){return function(){var A=[],B=v.length;while(B--)v[B][z](A);return A}};this.keys=y("keys");this.values=y("values");this.entries=y("getEntries");this.remove=function(B){q(B);var C=x(B),z,A=null;var D=i(u,C);if(D){A=D.removeEntryForKey(B);if(A!==null)if(!D.entries.length){z=m(v,C);n(v,z);delete u[C]}}return A};this.size=function(){var A=0,z=v.length;while(z--)A+=v[z].entries.length;return A};
this.each=function(C){var z=w.entries(),A=z.length,B;while(A--){B=z[A];C(B[0],B[1])}};this.putAll=function(H,C){var B=H.entries();var E,F,D,z,A=B.length;var G=typeof C==p;while(A--){E=B[A];F=E[0];D=E[1];if(G&&(z=w.get(F)))D=C(F,z,D);w.put(F,D)}};this.clone=function(){var z=new b(t,r);z.putAll(w);return z}}return b}();

//fix namespace issues with insert function
function ponychaninsert(a) {
	//if(!ispage || quick_reply) {
		var c=$jq('textarea[name="message"]');
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
	$jq.each($jq('.reflink'), function(index, link){
		link = $jq(link).children('a')[1];	
		link.click(function(){ return ponychaninsert('>>' +link.innerHTML +'\n'); })
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
		this.thumb = postnode.children('span#thumb' + this.postid + ' img');
		this.reflink = postnode.children('.reflink');
		this.replylink = this.reflink.children('a')[1];
		if(this.thumb){
			this.imagelink = this.thumb.up('a');
			this.imagetype = this.thumb.src.match(/.*\.([^.]+)$/)[1].toLowerCase();
			this.filesizenode = postnode.children('.filesize');
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
			this.dllink = span.children('.dllink');
			if(p.one_click_save == true){
				this.shortimagelink = this.imagelink.href.replace("http://www.ponychan.net/chan/","");
				this.dllink.click(function(){
					var str = "http://greendarkness.com/ponyupz/oneclickdl.php?imageurl="+this.shortimagelink+"&imagename="+this.userimagename;
					$jq('oneclickdl').src = encodeURI(str);
					return false;
				});
			}
		}
		this.user = postnode.children('.postername');
		this.trip = postnode.children('.postertrip');
		this.postdate = postnode.children('.posttime');
		this.blockquote = postnode.children('blockquote').innerHTML;
		this.extrabtns = postnode.children('.extrabtns');
		p.tempdiv = document.createElement('div');
		//pull out replies
		if(p.showreplies){
			$jq.each($jq('#'+postnode.id+' blockquote a'), function(index, replylink){
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
	posts: {new Hashtable()},
	replies: new Hashtable(),
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
		$jq('body').appendChild(this.dlframe);
		this.thread = $jq('form div[id*="thread"]');
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
		this.adminbar = $jq('.adminbar');
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
		$jq(body).keyup(function(e){
			if(e.which == 17) isCtrl=false;
		});
		$jq(body).keydown(function(e){
			if(e.which == 17) isCtrl=true;
			if(e.which == 81 && isCtrl == true) { //run code for CTRL+Q
				this.showreplyboxfromkey();
			}
		});

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

		$jq('body').appendChild(this.controlpanel);
		this.controlpanel.appendChild(this.cpinner);
		$jq('body').appendChild(this.helpscreen);
		$jq('helpscreen_link').click(function(){
			if(this.helpscreen.visible()){
				this.helpscreen.hide();
			}
			else this.helpscreen.show();
		});
		$jq('close_helpscreen').click(function(){
			this.helpscreen.hide();
		});

		$jq('c_screenshot_hide').click(function(){
			$jq.each(this.posts, function(index, pair){ 
				postid=pair.key;
				post = pair.value;
				if(postid!=p.opid){
					var checkbox = post.postnode.children('input[type=checkbox]');
					//console.log(checkbox);
					if(!checkbox.checked){
						post.postnode.parentNode.parentNode.hide();
					}
				}
			});
		});
		$jq('c_screenshot_show').click(function(){
			$jq.each(this.posts, function(index, pair){ 
				postid=pair.key;
				post = pair.value;
				post.postnode.parentNode.parentNode.show();
			});
		});

		this.pmenu = $jq('ponyupmenu');
		this.pmenu.click(function(){
			if(this.controlpanel.style.display == "none"){
				this.pmenu.innerHTML = downarrow;
				this.controlpanel.style.display = "block";
			}
			else {
				this.pmenu.innerHTML = uparrow;
				this.controlpanel.style.display = "none";
			}
			return false;
		});
		for(i=0; i<this.cookie_props.length; i++){
			$jq(this.cookie_props[i]+'_c').change(function(event){
				var e=event.target;
				var prop = e.id.replace(/_c$/,"");
				if(e.checked) this[prop]=true;
				else this[prop]=false;
				Cookie.setData(prop, this[prop]);
			});
		}
		$jq('settings_per_board_c').change(function(event){
			var e=event.target;
			var prop = e.id.replace(/_c$/,"");
			if(e.checked) this[prop]=true;
			else this[prop]=false;
			Cookie.setData(prop, this[prop]);
			Cookie.init({name: 'ponyupmaster', path: '/', expires: 90});
			Cookie.retrieve();
			Cookie.setData(prop, this[prop]);
			window.location.reload();
		});
		$jq('autoupdate_timer_c').blur(function(event){
			var e=event.target;
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
		});
		$jq('save_c').click(function(event){
			var e=event.target;
			window.location.reload();
		});
		$jq('reset_c').click(function(event){
			var e=event.target;
			Cookie.init({name: 'ponyupmaster', path: '/', expires: 90});
			Cookie.erase();
			Cookie.init({name: 'ponyup', expires: 90});
			Cookie.erase();
			window.location.reload();
		});

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
			
			$jq.each($jq('.extrabtns'), function(index, extrabtns) {
				extrabtns.observe('mouseover', function(event) {
					$$('.navbar')[1].setStyle({width: '2500px'});
				})
			});
			$jq.each($jq('.extrabtns'), function(index, extrabtns) {
				extrabtns.observe('mouseout', function(event) {
					$$('.navbar')[1].setStyle({width: 'auto'});
				})
			});
		}

	/* Iterate Posts */
		//add in OP
		$jq.each($jq('form div[id*="thread"]'), function(index, reply){
			postid = reply.id.replace(/[^0-9]/g, '');
			if(!this.opid) this.opid=postid;
			this.posts.set(postid,new PonyPost(reply,postid,this));
		});
		$jq.each($jq('td.reply'), function(index, reply){
			postid = reply.id.replace(/[^0-9]/g, '');
			this.posts.set(postid,new PonyPost(reply,postid,this));
		});
		//add in "highlight"
		$jq.each($jq('td.highlight'), function(index, reply){
			postid = reply.id.replace(/[^0-9]/g, '');
			this.posts.set(postid,new PonyPost(reply,postid,this));
		});
		
		//console.log(this.replies);
	
	/* Reply Box */
		this.form = $jq('postform');
		this.postform_name = $jq('#postform input[name=name]');
		if(!this.ispage){
			this.fileinput = $jq('#postform input[name=imagefile]');
			this.fileinput.parentNode.id='changefileinputtd';
			this.fileinputph = document.createElement('a');
			this.fileinputph.innerHTML = '[Show File Input]';
			this.fileinputph.id = 'fileinputph';
			this.fileinputph.style.display = 'none';
			this.fileinputph.click(function(event){
				$jq('changefileinputtd').insertBefore(this.fileinput,$('changefileinputtd').firstChild);
				this.hidereplybox();
				this.fileinputph.style.display = 'none';
			});
			$jq('changefileinputtd').insertBefore(this.fileinputph,$('changefileinputtd').firstChild);
			
			this.replybutton = $jq('#postform input[value=Reply]');
			this.rbreplybutton = this.replybutton.clone(true);
			this.rbreplybutton.removeAttribute("accesskey");
			this.replybutton.removeAttribute("accesskey");
			this.namefield = $jq('#postform input[name=name]');
			this.rbname = this.namefield.clone(true);
			this.rbname.removeAttribute("accesskey");
			this.emailfield = $jq('#postform input[name=em]');
			this.rbemail = this.emailfield.clone(true);
			this.rbemail.removeAttribute("accesskey");
			this.subjectfield = $jq('#postform input[name=subject]');
			this.rbsubject = this.subjectfield.clone(true);
			this.rbsubject.removeAttribute("accesskey");
			this.spoilerfield = $jq('#postform input[name=spoiler]');
			this.rbspoiler = this.spoilerfield.clone(true);
			this.rbspoiler.removeAttribute("accesskey");
			this.rbspoiler.id ='rbspoiler';
			/*this.nsfwfield = this.spoilerfield.clone(true);
			this.nsfwfield.id='nsfw';
			this.nsfwfield.name='nsfw';
			this.rbnsfw = this.nsfwfield.clone(true);
			this.rbnsfw.id ='rbnsfw';
			$('changefileinputtd').children('span').appendChild(this.nsfwfield);
			$('changefileinputtd').children('span').innerHTML += '<label for="nsfw">NSFW</label>';*/
			//this.rbreplybutton.style.cssFloat = "right";
			if(navigator.userAgent.match(/chrome/i)){
				this.rbreplybutton.style.marginLeft = "95px";
			}
			else this.rbreplybutton.style.marginLeft = "21px";
			
			Event.observe(this.rbreplybutton,'click',function(event){
				$jq('#changefileinputtd').insertBefore(this.fileinput,$('changefileinputtd').firstChild);
				this.fileinputph.style.display = 'none';
				this.post_was_made = true;
				Cookie.setData('post_was_made',true);
				this.form.submit();
			}.bind(this));
			Event.observe(this.replybutton,'click',function(event){
				$jq('#changefileinputtd').insertBefore(this.fileinput,$('changefileinputtd').firstChild);
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
						$jq('#changefileinputtd').insertBefore(this.fileinput,$jq('#changefileinputtd').firstChild);
						this.fileinputph.style.display = 'none';
						this.post_was_made = true;
						Cookie.setData('post_was_made',true);
						this.form.submit();
					}
				}.bindAsEventListener(this));
			}
			this.name_orig_bg = this.postform_name.getStyle('background-color');
			this.message = this.form.children('textarea[name=message]');
			this.replybox = this.message.cloneNode(true);
			this.replybox.style.fontSize = '16px';
			this.replybox.style.fontFamily = 'sans-serif';
			this.replybox.style.width = '395px';
			this.replybox.value = this.message.value;
			this.replybox.id = 'replybox';
			/*Event.observe(this.replybox,'focus',function(event){
				this.replybox.value = this.message.value;
			}.bind(this));*/
			this.replybox.keyup(function(event){
				this.message.value = this.replybox.value;
			});
			this.replybox.change(function(event){
				this.message.value = this.replybox.value;
			});
			tempdiv = document.createElement('div');
			$jq('body').appendChild(tempdiv);
			replyboxstr = "<div id='replyboxdiv' style='width:402px;position:absolute;right:20px;top:0px'><table style='width:400px;;padding:5px;'><tr><td style='font-weight:bold;float:left'>Reply Box (Draggable)</td><td id='gototop'>[ ▲ Go To Top ▲ ]</td><td id='replyboxclose' style='float:right; font-weight:bold'>X Close</td></tr></table></div>";
			tempdiv.innerHTML = replyboxstr;
			this.replyboxdiv = $jq('#replyboxdiv');
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
				this.rbsubject.keyup(function(event){
					this.subjectfield.value = this.rbsubject.value;
				});
			}
			if(this.replybox_spoiler){
				var label = document.createElement('label');
				label.innerHTML = 'Spoiler: ';
				this.replyboxdiv.appendChild(label);
				this.replyboxdiv.appendChild(this.rbspoiler);
				this.replyboxdiv.appendChild(document.createElement("br"));
				this.rbspoiler.change(function(event){
					this.spoilerfield = $jq('#spoiler');
					this.spoilerfield.checked = this.rbspoiler.checked;
				});
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
			this.replyboxclose = $jq('#replyboxclose');
			this.replyboxdiv.draggable();
			this.replyboxclose.click(this.hidereplybox);
			$jq('#gototop').click(function(event){
				$jq('#changefileinputtd').insertBefore(this.fileinput,$jq('#changefileinputtd').firstChild);
				this.hidereplybox();
				this.fileinputph.style.display = 'none';
				$jq.scrollTo($jq('div.logo'));
			});
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
			this.postform_name.focus(this.show_trips);
			this.postform_name.blur(this.hide_trips_f);
			if(!this.ispage) {
				this.rbname.focus(this.show_trips);
				this.rbname.blur(this.hide_trips_f);
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
			$jq('body').appendChild(autoupdater_source);
			//find the last span if it's there and move it
			var lastChild = $jq('form div[id*="thread"]>span:last-child');
			if(lastChild){
				this.thread.parentNode.insertBefore(lastChild,this.thread.next());
			}
			
			this.interval = new PeriodicalExecuter(function(pe) {
				//Get the page:
				reqtime = new Date();

				var url = window.location.toString().split('#')[0];
				$jq.ajax(url, {
					method: 'get',
					onSuccess: function(transport) {
						//load it into the dom so we can use css selectors
						matcharray = transport.responseText.match(/<body>([\s\S]*)<\/body>/ig);
						$jq('newpage').innerHTML = matcharray[0]; 

						//Get the last post id that equals
						currkeys = p.posts.keys();
						lastkey = currkeys[currkeys.length - 1];
						lastpostid = p.posts.get(lastkey).postid;

						//parse
						p.newposts = new Hashtable();
						$jq.each($jq('#newpage td.reply'), function(reply){
							postid = reply.id.replace(/[^0-9]/g, '');
							//console.log('post id is ' + postid, 'last postid is ' + lastpostid);
							if(Number(postid) > Number(lastpostid)){
								p.newposts.set(postid,new PonyPost(reply,postid,p));
							}
						});

						//append the new and run our script on these posts
						p.newposts.each(function(pair){
							postid=pair.key;
							post = pair.value;
							//magic
							var newreply = $('reply'+postid).up('table');
							var newlink = $('reply'+postid).children('.reflink a',1);
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
		$jq.each(this.posts, function(pair){ 
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
			$jq.each($jq('#reply'+postid+' blockquote a'), function(replylink){
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

					if(post_to.children('.repliesspan')!=undefined){
						repliesspan = post_to.children('.repliesspan');
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
			});
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
		var e=event.target;
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