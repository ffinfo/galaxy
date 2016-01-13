define(["utils/utils","mvc/ui/ui-misc","mvc/form/form-select-content","mvc/ui/ui-select-library","mvc/ui/ui-select-ftp","mvc/ui/ui-color-picker"],function(a,b,c,d,e,f){return Backbone.Model.extend({types:{text:"_fieldText",select:"_fieldSelect",data_column:"_fieldSelect",genomebuild:"_fieldSelect",data:"_fieldData",data_collection:"_fieldData",integer:"_fieldSlider","float":"_fieldSlider","boolean":"_fieldBoolean",drill_down:"_fieldDrilldown",color:"_fieldColor",hidden:"_fieldHidden",hidden_data:"_fieldHidden",baseurl:"_fieldHidden",library_data:"_fieldLibrary",ftpfile:"_fieldFtp"},initialize:function(a){this.app=a},create:function(a){void 0===a.value&&(a.value=null),void 0===a.default_value&&(a.default_value=a.value);var b=null,c=this.types[a.type];return c&&"function"==typeof this[c]&&(b=this[c].call(this,a)),b||(this.app.incompatible=!0,b=a.options?this._fieldSelect(a):this._fieldText(a),Galaxy.emit.debug("form-parameters::_addRow()","Auto matched field type ("+a.type+").")),void 0!==a.value&&b.value(a.value),b},_fieldData:function(a){var b=this;return new c.View(this.app,{id:"field-"+a.id,extensions:a.extensions,optional:a.optional,multiple:a.multiple,type:a.type,data:a.options,onchange:function(){b.app.trigger("change")}})},_fieldSelect:function(a){if(a.is_workflow)return this._fieldText(a);"data_column"==a.type&&(a.error_text="Missing columns in referenced dataset.");var c=[];for(var d in a.options){var e=a.options[d];c.push({label:e[0],value:e[1]})}var f=b.Select;switch(a.display){case"checkboxes":f=b.Checkbox;break;case"radio":f=b.Radio}var g=this;return new f.View({id:"field-"+a.id,data:c,error_text:a.error_text||"No options available",optional:a.optional&&null===a.default_value,multiple:a.multiple,optional:a.optional,searchable:a.searchable,onchange:function(){g.app.trigger("change")}})},_fieldDrilldown:function(a){if(a.is_workflow)return this._fieldText(a);var c=this;return new b.Drilldown.View({id:"field-"+a.id,data:a.options,display:a.display,onchange:function(){c.app.trigger("change")}})},_fieldText:function(c){if(c.options)if(c.area=c.multiple,a.validate(c.value)){if($.isArray(c.value)){var d="";for(var e in c.value){if(d+=String(c.value[e]),!c.multiple)break;d+="\n"}c.value=d}}else c.value=null;var f=this;return new b.Input({id:"field-"+c.id,area:c.area,onchange:function(a){c.onchange?c.onchange(a):f.app.trigger("change")}})},_fieldSlider:function(a){var c=this;return new b.Slider.View({id:"field-"+a.id,precise:"float"==a.type,is_workflow:a.is_workflow,min:a.min,max:a.max,onchange:function(){c.app.trigger("change")}})},_fieldHidden:function(a){return new b.Hidden({id:"field-"+a.id,info:a.info})},_fieldBoolean:function(a){var c=this;return new b.RadioButton.View({id:"field-"+a.id,data:[{label:"Yes",value:"true"},{label:"No",value:"false"}],onchange:function(){c.app.trigger("change")}})},_fieldColor:function(a){var b=this;return new f({id:"field-"+a.id,onchange:function(){b.app.trigger("change")}})},_fieldLibrary:function(a){var b=this;return new d.View({id:"field-"+a.id,optional:a.optional,multiple:a.multiple,onchange:function(){b.app.trigger("change")}})},_fieldFtp:function(a){var b=this;return new e.View({id:"field-"+a.id,optional:a.optional,multiple:a.multiple,onchange:function(){b.app.trigger("change")}})}})});
//# sourceMappingURL=../../../maps/mvc/form/form-parameters.js.map