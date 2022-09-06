'use strict';
var array=[],node,output = document.forms[0],[textarea,textarea2] = document.querySelectorAll('textarea'),map1=new Map(),map2=new Map(),lastConvert='';
output.createMathML=function(tex){
    const options={end:MathJax._.core.MathItem.STATE.CONVERT,format:"TeX"},
        root = MathJax.startup.document.convert(tex,options),
        visitor=new MathJax._.core.MmlTree.MathMLVisitor.MathMLVisitor();
    document.body.firstChild.replaceWith(visitor.visitTree(root,document));
    for(let j=array.length-1;j>=0;j--){
        const [stringPos,nodeText,MmlNode,stringlength]=array[j],
        label=Object.assign(document.createElement('label'),{innerText:stringPos+' → '+nodeText,style:"display:block"}),
        input=Object.assign(document.createElement('input'),{type:'radio',name:'node',style:'margin-right:1em',value:j,onclick:()=>{if(textarea.value!=lastConvert)return;this.update(j,MmlNode);textarea.setSelectionRange(stringPos-stringlength,stringPos);textarea.focus()}});
        this.prepend(label);
        MmlNode.addEventListener('click',e=>{e.stopPropagation();if(textarea.value!=lastConvert)return;input.click()});
        label.prepend(input);
        for(let i=0;i<stringlength;i++)map1.set(stringPos-i,j);
        map2.set(j,MmlNode);
    }
}
output.update=function(j,_node){
    if(textarea.value!=lastConvert)return;
    node?.removeAttribute('style');
    node=_node?_node:map2.get(j);
    node?.setAttribute('style','animation: blinker 1s linear infinite')
}
Object.defineProperty(textarea,'{',{get(){let brace=-1,i=this.selectionStart;do{switch(this.value[--i]){case '{':brace++;break;case '}':brace--;}}while(brace!=0&&i>0)return i}});
Object.defineProperty(textarea,'}',{get(){let brace=1,i=this.selectionEnd;do{switch(this.value[i++]){case '{':brace++;break;case '}':brace--;}}while(brace!=0&&i<this.value.length)return i}});
textarea.oninput=function(){
    if(this.value==lastConvert)return;
    output.innerHTML='';
    node?.removeAttribute('style')
}
textarea.onselectionchange=function(){
    if(this.value!=lastConvert||!array.length||this.selectionStart!=this.selectionEnd)return;
    const j=map1.get(this.selectionStart);
    if(j!=undefined){
        output.update(j);
        output.node.value=j;
    }else{
        if(output.node.value)output.querySelector('input:checked').checked=false;
        node?.removeAttribute('style')
    }
}
textarea.onfocus=function(){
    if(this.value!=lastConvert||!array.length||this.selectionStart!=this.selectionEnd||this.lastSelect==this.selectionStart)return;
    const j=map1.get(this.selectionStart);
    if(j!=undefined){
        output.update(j);
        output.node.value=j;
    }else{
        if(output.node.value)output.querySelector('input:checked').checked=false;
        node?.removeAttribute('style')
    }
}