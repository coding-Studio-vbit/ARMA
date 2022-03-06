import { CloudUploadTwoTone } from '@material-ui/icons';
import React from 'react'

export interface FileUploadProps {
    fileName: string;
    setFileName:React.Dispatch<React.SetStateAction<string>>;
    fileSizeLimit:number;
    error:string;
    setError:React.Dispatch<React.SetStateAction<string>>;
    fileTypes:string[];
    fileObject:File|undefined;
    setFileObject: React.Dispatch<React.SetStateAction<File | undefined>>;

}

function FileUploader({
        fileName,setFileName,
        fileSizeLimit,error,setError,
        fileTypes,
        fileObject,setFileObject
    }:FileUploadProps) {

    return (
        <div>
            <label className="rounded-[8px] hover:bg-slate-500/10 !cursor-pointer px-24 py-16 outline-dashed outline-gray-500">
                <CloudUploadTwoTone className="!w-20 !h-20   text-arma-blue justify-center" />
                    <input
                    id="file-upload"
                    accept="application/pdf"
                    onChange={(e: any) => {
                        console.log(e.target.files[0]);
                        if(e.target.files[0].size>fileSizeLimit){
                            if(fileSizeLimit>1000000){
                                setError(`File size cannot exceed ${fileSizeLimit/1000000} MB`);
                            }else{
                                setError(`File size cannot exceed ${fileSizeLimit/1000} KB`);
                            }
                        }else{
                            setFileObject(e.target.files[0]);
                            setFileName(e.target.files[0].name);
                            setError("");
                        }
                    }}
                className="hidden"
                type="file"
                ></input>
            </label> 
            {
                error.length===0?
                <p className='mt-10'>{fileName}</p>:
                <p className='mt-10 text-red-600'>{error}</p>
            }                      
        </div>
    )
}

export default FileUploader;




// const [fileName, setfileName] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const [fileObject, setfileObject] = useState<File|undefined>();
{/* <FileUploader 
fileName={fileName} setFileName={setfileName} 
error={error} setError={setError}
fileSizeLimit={2000000} fileTypes={[]} fileObject={fileObject} setFileObject={setfileObject} /> */}
