(() => {
 const dialog=document.getElementById('art-viewer');
 if(!dialog || !dialog.showModal) return;
 let active=null;
 const stage=document.getElementById('viewer-stage');
 function fit(){
  if(!active)return;
  const w=+active.dataset.width,h=+active.dataset.height,angle=+active.dataset.angle;
  const sideways=Math.abs(angle)===90;
  const scale=Math.min((innerWidth-100)/(sideways?h:w),(innerHeight-190)/(sideways?w:h),1);
  stage.style.width=((sideways?h:w)*scale)+'px';stage.style.height=((sideways?w:h)*scale)+'px';
  const img=stage.firstElementChild;
  img.style.width=w*scale+'px';img.style.height=h*scale+'px';
  img.style.transform=`translate(-50%,-50%) rotate(${angle}deg)`;
 }
 document.querySelectorAll('.art-open').forEach(link=>link.addEventListener('click',e=>{
  e.preventDefault();active=link;
  const img=new Image();img.src=link.href;img.alt=link.dataset.title;
  stage.replaceChildren(img);
  document.getElementById('viewer-title').textContent=link.dataset.title;
  document.getElementById('viewer-medium').textContent=link.dataset.medium;
  fit();dialog.showModal();document.body.style.overflow='hidden';
 }));
 dialog.querySelector('.art-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{document.body.style.overflow='';active?.focus();});
 window.addEventListener('resize',fit);
})();
