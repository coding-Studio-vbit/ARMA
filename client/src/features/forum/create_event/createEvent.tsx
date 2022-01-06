
const CreateEvent  =()=>{
    return(
        <div>
            <div>
                <span className="material-icons mt-10 ml-2 md:ml-6 justify-between">chevron_left</span>
                <h1 className="font-sans justify-between text-sky-900 font-semibold text-2xl md:text-4xl inline-block ml-4 md:ml-24">Create Event</h1>    
            </div>
            <div className="ml-12 md:ml-36 mt-2">
                <form action="post">
                    <label htmlFor="eventName" className="form-label inline-block mb-2 text-lg md:text-xl text-gray-500 mt-4">Event Name</label>
                    <input
                    type="text"
                    className="
                        form-control
                        block
                        w-3/4
                        h-6
                        px-3
                        py-1.5
                        text-sm
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded-full
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                    id="eventName"
                    placeholder="Code Craft 3.0"
                    />
                    <label htmlFor="description" className="form-label inline-block mb-2 text-lg md:text-xl text-gray-500 mt-4">Description</label>
                    <textarea
                    className="
                        form-control
                        block
                        w-3/4
                        h-32
                        px-3
                        py-1.5
                        text-sm
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                    id="description"
                    placeholder="codeCraft is the flagship event conducted by coding.Studio( ); every year that aims to rmote competitive programming culture in our college. "
                    />
                    <div className=" flex space-x-2 justify-center mt-10"><button className="btn">Create</button></div>
                </form>
            </div>
        </div>
    )
}
            
export default CreateEvent;