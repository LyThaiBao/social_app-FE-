import { CommentResponse } from "@/types/comment/commentResponse";
import { toRelative } from "@/utils/convertTime";

export default function Comment({comment}:{comment:CommentResponse}){
    return (<div className="flex gap-2 ">
        <div className="flex-1 bg-slate-100 rounded-2xl px-4 py-2.5 max-w-[85%] dark:bg-gray-600 text-black dark:text-white">
            <div className="flex items-center justify-between mb-0.5">
              <span className="font-semibold text-blue-400 text-xs">{comment.memberName}</span>
              <span className="text-[10px] ">{toRelative(comment.createdAt)}</span>
            </div>
            <p className=" leading-relaxed break-words">
              {comment.content}
            </p>
          </div>
    </div>);
}