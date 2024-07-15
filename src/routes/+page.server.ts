import type { PageServerLoad } from './$types';
import { potties } from '$lib/utils/stores';
import { readPotties } from '$lib/utils/data';

export const load: PageServerLoad = async () => {
	const pottyList = await readPotties();
	potties.set(pottyList);
	return { pottyList };
};
