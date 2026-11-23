const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff"}});
const clean=(v,max)=>String(v??"").trim().slice(0,max);
async function hash(value){const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(value));return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("")}
export async function onRequestPost({request,env}){
 if(!env.DB)return json({error:"Databáze zatím není připojena."},503);
 let d;try{d=await request.json()}catch{return json({error:"Neplatný požadavek."},400)}
 if(clean(d.website,200))return json({ok:true});
 const company=clean(d.company,160),contact=clean(d.contact,120),email=clean(d.email,254).toLowerCase(),phone=clean(d.phone,40),trade=clean(d.trade,160),regions=clean(d.regions,300),note=clean(d.note,2000);
 if(!company||!contact||!email||!phone||!trade||!regions||d.privacy_ack!=="yes")return json({error:"Vyplňte prosím všechna povinná pole a potvrďte seznámení s informacemi o zpracování údajů."},400);
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return json({error:"Zkontrolujte e-mailovou adresu."},400);
 try{
  const ipHash=await hash(request.headers.get("CF-Connecting-IP")||"unknown");
  const recent=await env.DB.prepare("SELECT COUNT(*) AS n FROM partner_applications WHERE ip_hash=? AND created_at > datetime('now','-10 minutes')").bind(ipHash).first();
  if((recent?.n||0)>=5)return json({error:"Bylo odesláno příliš mnoho registrací. Zkuste to za chvíli."},429);
  const result=await env.DB.prepare("INSERT INTO partner_applications (company_name,contact_name,email,phone,trade,regions,note,privacy_notice_ack,ip_hash) VALUES (?,?,?,?,?,?,?,1,?)").bind(company,contact,email,phone,trade,regions,note,ipHash).run();
  return json({ok:true,id:result.meta?.last_row_id||null},201);
 }catch{return json({error:"Registraci firmy se nepodařilo uložit. Zkuste to prosím později."},500)}
}