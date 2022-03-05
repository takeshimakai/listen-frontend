import TertiaryBtn from '../../components/TertiaryBtn';

const Listen = ({ initialize, action }) => {
  return (
    <div className='h-full flex flex-col items-center justify-between pb-12 px-12 sm:px-0 sm:max-w-lg mx-auto'>
      <div className='space-y-4 my-auto flex flex-col justify-center'>
        <p className='font-light sm:text-sm'>Thank you for taking the time to listen.</p>
        <p className='font-light sm:text-sm'>Despite our best intentions, sometimes an advice isn't what a friend needs. Instead, just being there to listen attentively might be the best thing we can do for them.</p>
        <p className='font-light sm:text-sm'>We're happy and appreciate you for taking the time to help someone. The world needs more people like you!</p>
      </div>
      <TertiaryBtn label='Proceed to chat' onClick={() => initialize(action)} />
    </div>
  )
}

export default Listen;