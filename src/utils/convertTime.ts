import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import "dayjs/locale/vi.js";

dayjs.extend(relativeTime)
dayjs.locale("vi");

export const toRelative = (instantTime:string) =>{
    return dayjs(instantTime).fromNow();
}