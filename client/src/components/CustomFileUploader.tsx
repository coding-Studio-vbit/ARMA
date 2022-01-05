import React from 'react'


interface FileUploadProps {
    label: string;
    file: React.InputHTMLAttributes<HTMLInputElement> | undefined;
    error: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CustomFileUploader({label,file,onChange,error}:FileUploadProps) {
    return (
        <div className="flex justify-center">
            <div className="mb-3 w-96">
                <label htmlFor='formFile' className="form-label inline-block mb-2 text-gray-700">{ label }</label>
                <input className="form-control
                    block w-full
                    px-3 py-1.5 m-0
                    text-base font-normal
                    text-gray-700 bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded-lg
                    transition ease-in-out focus:border-collapse
                    focus:text-gray-700 focus:bg-white focus:border-0 outline-none" 
                    type="file"
                    value={file?.value}
                    id="formFile" onChange={onChange}
                ></input>
                <p className='text-red-500 mt-2'>{error}</p>
            </div>
        </div>
    )
}

export default CustomFileUploader


// function File() {

//   const [file, setFile] = React.useState<React.InputHTMLAttributes<HTMLInputElement> | undefined>();
//   const [error, setError] = React.useState<string>();
//   function onChange(e:React.ChangeEvent<HTMLInputElement>) {
//     //setFile(e.target.files![0]);  
//     if(e.target.files![0].size>2000){
//       setError("File size cannot exceed 200KB")

//     }else{
//       setFile(e.target.files![0]);
//     }
              
//   }

//   return (
//     <div>
//       <CustomFileUploader label='Upload Resume' file={file} error={error} onChange={onChange} />
      
//     </div>
//   )
// }