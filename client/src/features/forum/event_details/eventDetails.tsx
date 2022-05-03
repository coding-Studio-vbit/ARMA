import React from 'react'

function EventDetails() {
  return (
    <div id="forumEventPage">
        <div id="forumEventPageContent" className="mx-auto my-5">
          <div className="mx-auto w-11/12 md:w-5/6 mt-8 md:mt-16 mb-12">
            <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-start sm:items-center">
              {/* <span className="material-icons md:scale-150 mr-4 ">chevron_left</span> */}
              <span className="ml-4 sm:ml-0 font-normal sm:font-medium  md:font-semibold text-arma-dark-blue text-xl md:text-4xl ">
                username + " " + event
              </span>
              <span className="sm:mt-0 mt-4 ml-auto mr-4 sm:mr-0 sm:ml-4 btn-green">
                status
              </span>
            </div>
          </div>            
        </div>
    </div> 
  );
}

export default EventDetails