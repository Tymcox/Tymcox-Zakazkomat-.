const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff"}});
const clean=(v,max)=>String(v??"").trim().slice(0,max);
export async function onRequestPost({request,env}){
 if(!env.DB)return json({error:"Databáze zatím není připojena."},503);
 let d;try{d=await request.json()}catch{return json({error:"Neplatný požadavek."},400)}
 if(clean(d.website,200))return json({ok:true});
 const company=clean(d.company,160),contact=clean(d.contact,120),email=clean(d.email,254).toLowerCase(),phone=clean(d.phone,40),trade=clean(d.trade,160),regions=clean(d.regions,300),note=clean(d.note,2000);
 if(!company||!contact||!email||!phone||!trade||!regions)return json({error:"Vyplňte prosím všechna povinná pole."},400);
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return json({error:"Zkontrolujte e-mailovou adresu."},400);
 try{const result=await env.DB.prepare("INSERT INTO partner_applications (company_name,contact_name,email,phone,trade,regions,note) VALUES (?,?,?,?,?,?,?)").bind(company,contact,email,phone,trade,regions,note).run();return json({ok:true,id:result.meta?.last_row_id||null},201)}
 catch{return json({error:"Registraci firmy se nepodařilo uložit. Zkuste to prosím později."},500)}
}