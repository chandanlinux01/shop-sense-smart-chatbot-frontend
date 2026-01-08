import { getUserProfileAction } from "@/actions/user.actions";

/**
 * Server Component Example
 * Directly calling the Server Action. It's safe and fast.
 */
export default async function ServerAPIDemo() {
    const profile = await getUserProfileAction();

    return (
        <div className="p-8 space-y-4">
            <h1 className="text-2xl font-bold">Server Component API Demo</h1>
            <p className="text-zinc-500">
                This page fetches logic directly on the server during rendering.
            </p>

            <div className="p-4 bg-zinc-50 border rounded-lg">
                <h2 className="font-semibold mb-2">API Result:</h2>
                {profile.success ? (
                    <pre className="text-xs">{JSON.stringify(profile.data, null, 2)}</pre>
                ) : (
                    <p className="text-destructive">{profile.message}</p>
                )}
            </div>

            <div className="text-sm bg-blue-50 p-4 rounded-lg text-blue-800">
                <strong>Why this is secure:</strong> The server reads the HttpOnly cookie
                directly and sends it to the backend. No sensitive data is exposed to the browser's JS.
            </div>
        </div>
    );
}
