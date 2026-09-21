import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function POST(request) {
 let body;
 try {body=await request.json();} catch {return NextResponse.json({error:'Invalid JSON'},{status:400});}
 if (typeof body.tid!=='string' || !body.tid.startsWith('sp1.') || body.tid.length>160 || typeof body.documentSlug!=='string') return NextResponse.json({error:'Invalid tracking request'},{status:400});
 const target=new URL('https://send.diversyfund.com/api/public/send-plane/collateral');
 target.searchParams.set('tid',body.tid);
 target.searchParams.set('doc',body.documentSlug);
 try {
  const response=await fetch(target,{method:'POST',headers:{'user-agent':request.headers.get('user-agent')??''},cache:'no-store',signal:AbortSignal.timeout(10000)});
  return NextResponse.json(await response.json(),{status:response.status,headers:{'Cache-Control':'no-store'}});
 }catch{return NextResponse.json({error:'Tracking unavailable'},{status:502});}
}
