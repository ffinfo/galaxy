define(["utils/utils","mvc/tools","mvc/upload/upload-view","mvc/ui/ui-misc","mvc/history/options-menu","mvc/history/history-panel-edit-current"],function(a,b,c,d,e,f){var g=Backbone.View.extend({initialize:function(b){this.options=a.merge(b,{}),this.setElement(this._template());var c=this.options.params;this.$("#galaxy_main").prop("src",Galaxy.root+(c.tool_id&&"tool_runner?"+$.param(c)||c.workflow_id&&"workflow/run?id="+c.workflow_id||c.m_c&&c.m_c+"/"+c.m_a||Galaxy.config.require_login&&!Galaxy.user.id&&"user/login"||"root/welcome"));var d=this;this.$("#galaxy_main").on("load",function(){$(this).show(),d.$("#center-panel").empty().hide();var a=this.contentWindow;a&&Galaxy.trigger("galaxy_main:load",{fullpath:a.location.pathname+a.location.search+a.location.hash,pathname:a.location.pathname,search:a.location.search,hash:a.location.hash})})},display:function(a){this.$("#galaxy_main").hide(),this.$("#center-panel").empty().scrollTop(0).append(a).show()},_template:function(){return'<div style="position: absolute; width: 100%; height: 100%"><iframe name="galaxy_main" id="galaxy_main" frameborder="0" style="position: absolute; width: 100%; height: 100%;"/><div id="center-panel" style="position: absolute; width: 100%; height: 100%; padding: 10px; overflow: auto;"/></div>'}}),h=Backbone.View.extend({initialize:function(d){if(this.options=a.merge(d,{}),this.setElement(this._template()),Galaxy.user.id||!Galaxy.config.require_login){var e=new b.ToolSearch({spinner_url:d.spinner_url,search_url:d.search_url,hidden:!1}),f=new b.ToolCollection(d.toolbox),g=new b.ToolPanel({tool_search:e,tools:f,layout:d.toolbox_in_panel});tool_panel_view=new b.ToolPanelView({model:g}),Galaxy.toolPanel=g,g.get("layout").size()>0&&(tool_panel_view.render(),this.$(".toolMenu").show()),this.$el.prepend(tool_panel_view.$el),this.$("#internal-workflows").append(this._templateTool({title:"All workflows",href:"workflow/list_for_run"}));for(var h in d.stored_workflow_menu_entries){var i=d.stored_workflow_menu_entries[h];this.$("#internal-workflows").append(this._templateTool({title:i.stored_workflow.name,href:"workflow/run?id="+i.encoded_stored_workflow_id}))}this.$("a[minsizehint]").click(function(){parent.handle_minwidth_hint&&parent.handle_minwidth_hint($(this).attr("minsizehint"))}),Galaxy.upload=new c(d),this.components={header:{title:"Tools",buttons:[Galaxy.upload]}}}},_templateTool:function(a){return'<div class="toolTitle"><a href="'+Galaxy.root+a.href+'" target="galaxy_main">'+a.title+"</a></div>"},_template:function(){return'<div class="toolMenuContainer"><div class="toolMenu" style="display: none"><div id="search-no-results" style="display: none; padding-top: 5px"><em><strong>Search did not match any tools.</strong></em></div></div><div class="toolSectionPad"/><div class="toolSectionPad"/><div class="toolSectionTitle" id="title_XXinternalXXworkflow"><span>Workflows</span></div><div id="internal-workflows" class="toolSectionBody"><div class="toolSectionBg"/></div></div>'}}),i=Backbone.View.extend({initialize:function(b){this.options=a.merge(b,{}),this.setElement(this._template());var c=new d.ButtonLink({id:"history-refresh-button",title:"Refresh history",cls:"panel-header-button",icon:"fa fa-refresh",onclick:function(){top.Galaxy&&top.Galaxy.currHistoryPanel&&top.Galaxy.currHistoryPanel.loadCurrentHistory()}}),g=new d.ButtonLink({id:"history-options-button",title:"History options",cls:"panel-header-button",target:"galaxy_main",icon:"fa fa-cog",href:Galaxy.root+"root/history_options"}),h=new d.ButtonLink({id:"history-view-multi-button",title:"View all histories",cls:"panel-header-button",icon:"fa fa-columns",href:Galaxy.root+"history/view_multiple"});this.components={header:{title:"History",cls:"history-panel-header",buttons:[c,g,h]},body:{cls:"unified-panel-body-background"}},Galaxy.historyOptionsMenu=e(g.$el,{anonymous:!Galaxy.user.id,purgeAllowed:Galaxy.config.allow_user_dataset_purge,root:Galaxy.root}),Galaxy.currHistoryPanel=new f.CurrentHistoryPanel({el:this.$el,purgeAllowed:Galaxy.config.allow_user_dataset_purge,linkTarget:"galaxy_main",$scrollContainer:function(){return this.$el.parent()}}),Galaxy.currHistoryPanel.connectToQuotaMeter(Galaxy.quotaMeter),Galaxy.currHistoryPanel.listenToGalaxy(Galaxy),Galaxy.currHistoryPanel.loadCurrentHistory()},_template:function(){return'<div id="current-history-panel" class="history-panel"/>'}});return{left:h,center:g,right:i}});
//# sourceMappingURL=../../../maps/mvc/app/app-analysis.js.map