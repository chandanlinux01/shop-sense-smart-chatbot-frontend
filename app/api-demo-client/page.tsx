"use client";

import { getUserProfileAction } from "@/actions/user.actions";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

/**
 * Client Component Example
 * Calling a Server Action from the browser.
 */
export default function ClientAPIDemo() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleFetchProfile = async () => {
        setLoading(true);
        const result = await getUserProfileAction();
        setData(result);
        setLoading(false);
    };

    return (
        <div className="p-8 space-y-4">
            <h1 className="text-2xl font-bold">Client Component API Demo</h1>
            <p className="text-zinc-500">
                This component runs in the browser. It cannot access Secure Cookies directly.
            </p>

            <Button onClick={handleFetchProfile} disabled={loading}>
                {loading ? "Fetching..." : "Fetch Profile via Server Proxy"}
            </Button>

            <div className="p-4 bg-zinc-50 border rounded-lg">
                <h2 className="font-semibold mb-2">Result:</h2>
                {data ? (
                    <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
                ) : (
                    <p className="text-zinc-400 italic">No data yet. Click the button.</p>
                )}
            </div>

            <div className="text-sm bg-orange-50 p-4 rounded-lg text-orange-800">
                <strong>Mechanism:</strong> When you click the button, the browser sends a signal to
                the Next.js server. The server (which HAS access to HttpOnly cookies)
                makes the real API call and returns only the data back to you.
            </div>
        </div>
    );
}
