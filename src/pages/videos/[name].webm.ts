import { videoRoute, headOf } from '../../lib/video-range';

export const prerender = false;
export const GET = videoRoute('webm');
export const HEAD = headOf(GET);
