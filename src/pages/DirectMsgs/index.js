import { useState, useEffect, useContext } from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';

import SocketContext from '../../contexts/SocketContext';

import MsgForm from './MsgForm';
import Thread from './Thread';
import Inbox from './Inbox';
import Sent from './Sent';

const DirectMsgs = () => {
  const match = useRouteMatch();
  const socket = useContext(SocketContext);

  const [lessThan640, setLessThan640] = useState(window.innerWidth < 640);
  const [threads, setThreads] = useState([]);
  const [compose, setCompose] = useState(false);
  const [page, setPage] = useState('inbox');

  useEffect(() => {
    const updateLessThan640 = () => setLessThan640(window.innerWidth < 640);
    window.addEventListener('resize', updateLessThan640);
    return () => window.removeEventListener('resize', updateLessThan640);
  });

  useEffect(() => {
    socket.emit('get dms');

    socket.on('all dms', (data) => setThreads(data));

    socket.on('new dm', (data) => {
      setThreads(prev => {
        const index = prev.findIndex(i => i._id === data._id);

        if (index !== -1) {
          const updated = [...prev];
          updated.splice(index, 1, data);
          return updated;
        }

        return [...prev, data];
      });
    });

    return () => {
      socket.off('all dms');
      socket.off('new dm');
    };
  }, [socket]);

  return (
    <div className='pt-16 sm:pt-20 px-4 md:px-0 pb-10 md:w-3/5 mx-auto'>
      <Switch>
        <Route path={`${match.path}/:threadId`}>
          <Thread threads={threads} setThreads={setThreads} />
        </Route>
        <Route path={match.path}>
          {compose && <MsgForm setThreads={setThreads} setCompose={setCompose} />}
          <div className='flex justify-between mb-4'>
            <div className='flex items-center'>
              <button
                className={`${page === 'inbox' && 'border-b border-gray-400 -mb-px'} w-max font-light sm:text-sm px-1`}
                onClick={() => setPage('inbox')}
              >
                Inbox
              </button>
              <button
                className={`${page === 'sent' && 'border-b border-gray-400 -mb-px'} w-max font-light sm:text-sm px-1`}
                onClick={() => setPage('sent')}
              >
                Sent
              </button>
            </div>
            <button
              className='fixed sm:relative bottom-3 right-3 sm:inset-0 w-11 sm:w-40 h-11 sm:h-8 border rounded-full border-green-700 text-green-700 text-2xl sm:text-sm shadow-md bg-gray-50 hover:text-white hover:bg-green-700 active:shadow-inner'
              onClick={() => setCompose(true)}
            >
              {lessThan640 ? <span>&#65291;</span> : 'Compose'}
            </button>
          </div>
          <div className='space-y-4'>
            {page === 'inbox' && <Inbox threads={threads} />}
            {page === 'sent' && <Sent threads={threads} />}
          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default DirectMsgs;