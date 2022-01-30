import data from '../../../data/data';

import Checkbox from '../../../components/Checkbox';

const ProblemTopics = ({ input, handleInput }) => {
  return (
    <>
      <label className='subtitle text-center mb-6'>
        Which topics would you like them to have some understanding of?
      </label>
      <div className='overflow-auto sm:px-3'>
        {data.categories.map(category => (
          <Checkbox
            key={category}
            name='problemTopics'
            data={category}
            input={input.problemTopics}
            handleInput={handleInput}
          />
        ))}
      </div>
    </>
  )
}

export default ProblemTopics;