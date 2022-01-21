import axiosInstance from "../../utils/axios";

const uploadReportAndMedia = async (eventID:string,report:any,images:any) =>{
    console.log(report);
    
    try {
        let formData = new FormData();
        for(let i = 0;i<images.length;i++){

            formData.append("eventImages", images[i].image);
        }
        formData.append("eventReport",report)
        formData.append("eventID",eventID)

       const res = await axiosInstance.post('events/reportAndMedia', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        return res.data        

    } catch (error) {
        console.log(error);
        
    }


} 
export  {uploadReportAndMedia}