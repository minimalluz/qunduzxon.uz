import { videoRoute, headOf } from '../../lib/video-range';

export const prerender = false;
export const GET = videoRoute('mp4');
export const HEAD = headOf(GET);
