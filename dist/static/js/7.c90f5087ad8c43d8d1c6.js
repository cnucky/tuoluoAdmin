webpackJsonp([7],{d2Wo:function(e,r){},sO0g:function(e,r,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=o("P9l9"),t={data:function(){return{ruleForm2:{version:"",origin:"",front:"",now:"",desc:""},versionOptions:[{label:"是",value:!0},{label:"否",value:!1}],rules2:{version:[{required:!0,message:"请输入版本号",trigger:"blur"}],origin:[{required:!0,message:"请选择版本类型",trigger:"change"}],front:[{required:!0,message:"请选择终端类型",trigger:"change"}],now:[{required:!0,message:"请选择是否最新版本",trigger:"blur"}]}}},methods:{submitForm:function(e){var r=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;var o=r.ruleForm2;Object(l.c)(o).then(function(e){e&&"ok"==e.status?(r.$message.success("添加成功"),r.$router.go(-1)):r.$message.error("添加失败")})})},resetForm:function(e){this.$refs[e].resetFields()}}},s={render:function(){var e=this,r=e.$createElement,o=e._self._c||r;return o("el-row",{staticClass:"add_version"},[o("el-col",{attrs:{span:10}},[o("el-form",{ref:"ruleForm2",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm2,rules:e.rules2,"label-width":"120px"}},[o("el-form-item",{attrs:{label:"版本号",prop:"version"}},[o("el-input",{attrs:{"auto-complete":"off"},model:{value:e.ruleForm2.version,callback:function(r){e.$set(e.ruleForm2,"version",r)},expression:"ruleForm2.version"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"版本类型",prop:"origin"}},[o("el-radio-group",{model:{value:e.ruleForm2.origin,callback:function(r){e.$set(e.ruleForm2,"origin",r)},expression:"ruleForm2.origin"}},[o("el-radio",{attrs:{label:1}},[e._v("国内")]),e._v(" "),o("el-radio",{attrs:{label:2}},[e._v("国际")]),e._v(" "),o("el-radio",{attrs:{label:3}},[e._v("PC")])],1)],1),e._v(" "),o("el-form-item",{attrs:{label:"终端类型",prop:"front"}},[o("el-radio-group",{model:{value:e.ruleForm2.front,callback:function(r){e.$set(e.ruleForm2,"front",r)},expression:"ruleForm2.front"}},[o("el-radio",{attrs:{label:1}},[e._v("安卓")]),e._v(" "),o("el-radio",{attrs:{label:2}},[e._v("苹果")]),e._v(" "),o("el-radio",{attrs:{label:3}},[e._v("PC")])],1)],1),e._v(" "),o("el-form-item",{attrs:{label:"是否最新版本",prop:"now"}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm2.now,callback:function(r){e.$set(e.ruleForm2,"now",r)},expression:"ruleForm2.now"}},e._l(e.versionOptions,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),o("el-form-item",{attrs:{label:"描述",prop:"desc"}},[o("el-input",{attrs:{type:"textarea",rows:6,"auto-complete":"off"},model:{value:e.ruleForm2.desc,callback:function(r){e.$set(e.ruleForm2,"desc",r)},expression:"ruleForm2.desc"}})],1),e._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(r){e.submitForm("ruleForm2")}}},[e._v("提交")]),e._v(" "),o("el-button",{on:{click:function(r){e.resetForm("ruleForm2")}}},[e._v("重置")])],1)],1)],1)],1)},staticRenderFns:[]};var a=o("VU/8")(t,s,!1,function(e){o("d2Wo")},null,null);r.default=a.exports}});
//# sourceMappingURL=7.c90f5087ad8c43d8d1c6.js.map