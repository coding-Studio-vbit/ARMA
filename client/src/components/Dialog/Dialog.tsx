import { ReactNode } from "react";
import ReactDOM from "react-dom";
import {Close} from '@material-ui/icons'


interface DialogProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode
  title:string
}
/**
 * Usage
 * First you show,setShow state.
 * 
 * Pass show and setShow to the dialog.
 * 
 */
export const Dialog = ({ show, setShow,children,title }: DialogProps) => {
  return show
    ? ReactDOM.createPortal(
        <div
          className="bg-black/20 fixed top-0  w-full h-full flex bottom-0 left-0 right-0 z-20 justify-center place-content-center "
          onClick={(e) => {
            setShow(false);
          }}
        >
          <div
            className="bg-white p-6 max-w-[90%] rounded-[24px] absolu w-[400px] my-auto z-[15] "
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
              {!children && 
              <div className="flex justify-end">
                  <Close className="cursor-pointer" onClick={()=>{
                    setShow(false)
                  }} /> 
              </div>
              }
            <p className="text-center p-4 text-xl mb-8 "  >{title}</p>
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
};

