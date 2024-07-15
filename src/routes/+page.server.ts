import { readPotties } from '../server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const potties = await readPotties();
	return { potties };
};
