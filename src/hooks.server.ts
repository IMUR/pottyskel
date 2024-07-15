// src/hooks.server.ts
export const handle = async ({ event, resolve }) => {
	// Do any server-side setup or middleware here
	const response = await resolve(event);
	return response;
};
