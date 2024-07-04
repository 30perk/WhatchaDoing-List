import Deletebtn from "./Deletebtn";
import Link from "next/link";
import {HiPencilAlt} from 'react-icons/hi';

export default function TaskList() {
    return (<>
        


        <div className="bg-yellow-100 border border-gray-300 rounded-lg py-4 px-3 my-5 w-full flex justify-between">
            <div>

                <h2 className="font-bold text-black text-2xl">Task Title</h2>
                <div className="text-gray-700">Task Description</div>
            </div>


            <div>
                <Deletebtn />
                <Link className="text-black" href={"/editTask/123"}>
                    <HiPencilAlt size={24} />
                </Link>
            </div>
        </div>
    </>)
}