import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../store/usersSlice';

const UserProfile = () => {
  const { userId } = useParams();
  const { userCurrent, error, isPending } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(Number(userId))); //eslint-disable-next-line
  }, []);
  return (
    <div>
      {error && <p>{error}</p>}
      {isPending && <p>Loading....</p>}
      {!error && !isPending && userCurrent && (
        <article>
          <h3>{userCurrent.email}</h3>
          
        </article>
      )}
    </div>
  );
};

export default UserProfile;
