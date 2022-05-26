import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddForums } from "../features/Forums/AddForums";
import { ForumsList } from "../features/Forums/ForumsList";
import { ForumsView } from "../features/Forums/ForumsView"
import AddNewCoreTeamMember from "../features/Forums/profile/AddNewCoreTeamMember";
import AddNewForumMember from "../features/Forums/profile/AddNewForumMember";


function ForumsRoutes() {
  return (

      <Routes>
          <Route path = '/AddForums' element = {<AddForums isEdit={false} />}/>
          <Route path = '/EditForums/:id' element = {<AddForums isEdit={true} />}/>
          <Route path = '/' element = {<ForumsList  />}/>
          <Route
            path="/addNewCoreTeamMember"
            element={<AddNewCoreTeamMember />}
          />
          <Route path="/addNewForumMember" element={<AddNewForumMember />} />
      </Routes>

  );
}

export default ForumsRoutes;