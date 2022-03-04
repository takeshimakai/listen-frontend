import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ForgotPass from './ForgotPass';

const Home = () => {
  const history = useHistory();
  const { token } = useContext(UserContext);

  const [page, setPage] = useState('login');

  useEffect(() => {
    token && history.replace('/home');
  }, [token, history]);

  const changeOpacityOnScroll = (e) => {
    const { scrollTop, clientHeight } = e.target;
    const opacity = 1 - (clientHeight - scrollTop)/clientHeight;
    if (opacity > 1) return;
    e.target.style.backgroundColor = `rgba(239, 234, 226, ${opacity})`;
    e.target.querySelector('#extra-content').style.opacity = opacity;
  };

  return (
    <div className='bg-image w-screen h-screen'>
      <div className='h-full w-full overflow-auto' onScroll={changeOpacityOnScroll}>
        <div className='h-full lg:flex lg:items-center'>
          <div className='relative flex items-center justify-center lg:justify-end h-1/3 lg:h-auto z-10 lg:flex-1 lg:mr-14'>
            <h1 className='text-gray-800 font-serif text-6xl sm:text-8xl'>listen</h1>
          </div>
          <div className='relative z-10 px-12 lg:px-0 lg:flex-1 lg:ml-14 mb-12 lg:mb-0'>
            {page === 'login' && <LoginForm setPage={setPage} />}
            {page === 'signup' && <SignUpForm setPage={setPage} />}
            {page === 'forgot' && <ForgotPass setPage={setPage} />}
          </div>
        </div>
        {['login', 'signup'].includes(page) &&
          <div className='flex flex-col items-center justify-center px-6 space-y-20 w-full min-h-full' id='extra-content'>
            <div>
              <p className='mb-4 font-light'>What is <i className='mr-0.5 font-normal text-green-700'>listen</i>?</p>
              <p className='max-w-md font-light text-sm'>
                Listen is a community built together by people just like you. It's a place where those experiencing mental health related stuggles can come together to share, discuss, and receive support to overcome many of life's obstacles – whether they've been professionally evaluated or not.
              </p>
            </div>
            <div>
              <p className='mb-4 font-light'>What it isn't</p>
              <p className='max-w-md font-light text-sm'>
                Listen is <strong>not</strong> a substitute for professional help. If you are struggling and require immediate attention, please contact your local healthcare provider.
              </p>
            </div>
            <div>
              <p className='mb-4 font-light'>What is it <i className='font-normal'>really</i> though?</p>
              <p className='max-w-md font-light text-sm'>
                Listen is a project by <a className='text-green-700' target='_blank' rel='noreferrer' href='https://www.kaitakeshima.com'>Kai Takeshima</a>. He's an aspiring web developer and hopes to do some good in the world with his newly found skill.
              </p>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Home;