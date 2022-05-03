import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddForums } from "../features/Forums/AddForums";
import { ForumsList } from "../features/Forums/ForumsList";
import { ForumsView } from "../features/Forums/ForumsView"


function ForumsRoutes() {
  return (

      <Routes>
          <Route path = '/AddForums' element = {<AddForums isEdit={false} />}/>
          <Route path = '/EditForums/:id' element = {<AddForums isEdit={true} />}/>
          <Route path = '/' element = {<ForumsList  />}/>
       
      </Routes>

  );
}

export default ForumsRoutes;