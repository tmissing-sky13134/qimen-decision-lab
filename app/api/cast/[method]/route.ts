import { NextRequest, NextResponse } from "next/server";

const methods = ["qimen", "zhouyi", "liuren", "huican"];
export async function POST(request: NextRequest, context: { params: Promise<{ method: string }> }) {
  const { method } = await context.params;
  if (!methods.includes(method)) return NextResponse.json({ success: false, error: { code: "INVALID_METHOD", message: "不支持的术数方式。" } }, { status: 400 });
  const baseUrl = process.env.NEXT_PUBLIC_CASTING_API_URL;
  if (!baseUrl) return NextResponse.json({ success: false, error: { code: "REMOTE_NOT_CONFIGURED", message: "远程排盘服务尚未配置，请切换至演示模式或联系管理员。" } }, { status: 503 });
  try { const upstream = await fetch(`${baseUrl.replace(/\/$/, "")}/cast/${method}`, { method: "POST", headers: { "Content-Type": "application/json", ...(process.env.CASTING_API_KEY ? { Authorization: `Bearer ${process.env.CASTING_API_KEY}` } : {}) }, body: await request.text(), signal: AbortSignal.timeout(20_000), cache: "no-store" }); const body = await upstream.text(); return new NextResponse(body, { status: upstream.status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } }); } catch { return NextResponse.json({ success: false, error: { code: "REMOTE_UNAVAILABLE", message: "无法连接远程排盘服务，请稍后重试。" } }, { status: 503 }); }
}
