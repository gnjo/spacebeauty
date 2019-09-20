;(function(root){
 function splitgroup(_str){
  let str=_str,wk="",flg=false,ch=' ',ary=[],ring=''
  ,reset=()=>{ wk='';flg=false;head=false}
  ;
  for(let i=0;i<str.length;i++){
   ring=str.charAt(i)
   if(i===str.length-1){wk+=ring;ary.push(wk);reset();continue;}
   if((!flg)&&ring==='['){flg=']';wk+=ring;continue}
   //if((!flg)&&ring==='('){flg=')';wk+=ring;continue}
   //if((!flg)&&ring==='"'){flg='"';wk+=ring;continue}
   //if((!flg)&&ring==="'"){flg="'";wk+=ring;continue}
   if(ring===flg)flg=false;
   if((!flg)&&ring===ch){ary.push(wk);reset();continue;}
   wk+=ring;continue;
  }
  return ary//.map(f);

 }

 function spacebeauty(_str,_max,_ta){
  let max=_max||20,ta=_ta||0,str=_str||'',ch=' '
  ,endl=Array.from({length:max}).map(d=>ch).join('')
  ,ary=str.split('\n').map(splitgroup)
  ,totalary=[]
  ;
  let calc=(a)=>{
   if(a.length===0)return totalary.push([]);
   let wk=[],mm=max-ta*2
   a.map((d,i)=>{
    let s=wk.map(d=>d.length).reduce((a,b)=>a+b+1,0) + d.length
    if(s>mm){totalary.push(wk);wk=[]}
    wk.push(d)
   });
   totalary.push(wk)
   //ary.map(d=>d.split(','))
  }
  ;
  ary.map(calc)
  return totalary.map(x=>{
   let f=(d)=>{
    return (d.charAt(0)==='['&&d.charAt(d.length-1))?d.slice(1,-1):d
   }
   if(x.length===0)return endl;
   let flg=(x[0].charAt(0)==='[')  
   if(x[0].charAt(0)==='#')return x.join(' ')
   let offset =(flg)?0:ta
   ,d=x.map(f),lo=d.length-1
   ,span=Array.from({length:offset}).map(d=>' ').join('')
   ,diff=max - d.map(d=>d.length).reduce((a,b)=>a+b) - offset*2
   //console.log(offset)
   if(flg&&d.length===1){
    d=['',d.pop(),'']
    lo=d.length-1
   }
   if((!flg)&&d.length===1){
    d=[d.pop(),'']
    lo=d.length-1
   }  
   for(let i=0;i<diff;i++)d[i%lo] +=' '
   return span+d.join('')+span
  })
   .join('\n')
  //return totalary
 }

 root.spacebeauty=spacebeauty
})(this);
