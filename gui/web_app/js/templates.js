(function(window) {

  /* Pre-compiled Templates */
  this.TEMPLATES = {};
  TEMPLATES["proteinScript"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("proteinList",c,p,1),c,p,0,16,53,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<li><a href=\"#\">");t.b(t.v(t.f("filename",c,p,0)));t.b("</a></li>");});c.pop();}return t.fl(); },partials: {}, subs: {  }});;
  TEMPLATES["ligandScript"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("ligandList",c,p,1),c,p,0,15,52,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<li><a href=\"#\">");t.b(t.v(t.f("filename",c,p,0)));t.b("</a></li>");});c.pop();}return t.fl(); },partials: {}, subs: {  }});;
  TEMPLATES["protocolScript"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("protocolList",c,p,1),c,p,0,17,52,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<li><a href=\"#\">");t.b(t.v(t.f("choice",c,p,0)));t.b("</a></li>");});c.pop();}return t.fl(); },partials: {}, subs: {  }});;
  TEMPLATES["phaseScript"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("phaseList",c,p,1),c,p,0,14,49,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<li><a href=\"#\">");t.b(t.v(t.f("choice",c,p,0)));t.b("</a></li>");});c.pop();}return t.fl(); },partials: {}, subs: {  }});;
  TEMPLATES["siteScript"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("siteList",c,p,1),c,p,0,13,48,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<li><a href=\"#\">");t.b(t.v(t.f("choice",c,p,0)));t.b("</a></li>");});c.pop();}return t.fl(); },partials: {}, subs: {  }});;
  TEMPLATES["samplerScript"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("samplerList",c,p,1),c,p,0,16,51,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<li><a href=\"#\">");t.b(t.v(t.f("choice",c,p,0)));t.b("</a></li>");});c.pop();}return t.fl(); },partials: {}, subs: {  }});;
  TEMPLATES["runtypeScript"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("runtypeList",c,p,1),c,p,0,16,51,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<li><a href=\"#\">");t.b(t.v(t.f("choice",c,p,0)));t.b("</a></li>");});c.pop();}return t.fl(); },partials: {}, subs: {  }});;
})(window);
