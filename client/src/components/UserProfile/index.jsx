import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../store/usersSlice';
import { getTasks } from '../../store/tasksSlice';

const UserProfile = () => {
  const { userId } = useParams();
  const { userCurrent, error, isPending } = useSelector((state) => state.users);
  const {
    tasks,
    error: errorTasks,
    isPending: isPendingTasks,
  } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(Number(userId)));
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    dispatch(getTasks({ id: Number(userId) }));
    //eslint-disable-next-line
  }, []);
  const showTasks = () => {
    dispatch(getTasks({ id: userCurrent.id }));
  };
  return (
    <div>
      {error && <p>{error}</p>}
      {isPending && <p>Loading....</p>}
      {!error && !isPending && userCurrent && (
        <article>
          <h3>{userCurrent.email}</h3>
          {userCurrent.avatar ? (
            <img
              src={`http://localhost:3000/images/${userCurrent.avatar}`}
              alt={userCurrent.email}
            />
          ) : (
            <img width={'100'} src="/avatar_noname.png" alt="none" />
          )}
          <button onClick={showTasks}>show tasks</button>
          <ol>
            {errorTasks && <p>{error}</p>}
            {isPendingTasks && <p>Loading....</p>}
            {!errorTasks &&
              !isPendingTasks &&
              tasks &&
              tasks.map((task) => <li key={task.id}>{task.content}</li>)}
          </ol>
        </article>
      )}
    </div>
  );
};

export default UserProfile;
