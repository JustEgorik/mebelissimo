import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/** Smoke test for the Supabase wiring: GET /api/health/supabase */
export async function GET() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.getUser();

    // "no session" is the expected answer for an anonymous request.
    if (error && error.name !== "AuthSessionMissingError") {
      return NextResponse.json(
        { ok: false, reason: error.message },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, supabase: "reachable" });
  } catch (e) {
    return NextResponse.json(
      { ok: false, reason: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
