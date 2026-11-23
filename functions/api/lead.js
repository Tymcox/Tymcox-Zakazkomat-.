const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff"}});
const clean=(v,max)=>String(v??"").trim().slice(0,max);
export async function onRequestPost({request,env}){
 if(!env.DB)return json({error:"Databáze zatím není připojena. Zkuste to prosím později."},503);
 let d;try{d=await request.json()}catch{return json({error:"Neplatný požadavek."},400)}
 if(clean(d.website,200))return json({ok:true});
 const name=clean(d.name,120),phone=clean(d.phone,40),email=clean(d.email,254).toLowerCase(),place=clean(d.place,120),category=clean(d.category,120),description=clean(d.description,5000);
 if(!name||!phone||!email||!place||!category||!description||d.consent!=="yes")return json({error:"Vyplňte prosím všechna povinná pole a potvrďte souhlas."},400);
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return json({error:"Zkontrolujte e-mailovou adresu."},400);
 const ip=request.headers.get("CF-Connecting-IP")||"unknown";
 try{
  const recent=await env.DB.prepare("SELECT COUNT(*) AS n FROM leads WHERE ip_hash=? AND created_at > datetime('now','-10 minutes')").bind(await hash(ip)).first();
  if((recent?.n||0)>=5)return json({error:"Bylo odesláno příliš mnoho poptávek. Zkuste to za chvíli."},429);
  const result=await env.DB.prepare("INSERT INTO leads (name,phone,email,place,category,description,consent,ip_hash,status) VALUES (?,?,?,?,?,?,1,?,'new')").bind(name,phone,email,place,category,description,await hash(ip)).run();
  return json({ok:true,id:result.meta?.last_row_id||null},201);
 }catch(e){return json({error:"Poptávku se nepodařilo uložit. Zkuste to prosím později."},500)}
}
async function hash(value){const data=new TextEncoder().encode(value);const digest=await crypto.subtle.digest("SHA-256",data);return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("")}
