import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(request) {
 const input = new URL(request.url).searchParams;
 const target = new URL('https://send.diversyfund.com/api/public/send-plane/collateral');
 for (const key of ['tid','doc']) target.searchParams.set(key,input.get(key) ?? '');
 return NextResponse.redirect(target,{status:302,headers:{'Cache-Control':'no-store'}});
}
