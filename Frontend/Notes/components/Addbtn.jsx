import Link from "next/link";

export default function Addbtn() {
    return (
        <Link href={"/addTask"} className="inline-block">
            <span className="flex items-center justify-center h-20 w-19 rounded-full border border-slate-900 m-3">
                <span className="text-black font-bold italic text-lg text-center ">Add Task</span>
            </span>
        </Link>
    );
}