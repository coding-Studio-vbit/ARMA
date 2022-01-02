
import { useUser } from "../providers/auth/AuthProvider";


const FacultyRoutes = () => {
    const {faculty} = useUser()
  return (
    <div>

      {faculty?.email}
    </div>
  );
};

export default FacultyRoutes;
