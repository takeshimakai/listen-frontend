import { useState } from "react";

const ForumMenu = ({ sortBy, setSortBy, setFilters }) => {
  const possibleFilters = [
    'Neurodevelopmental disorders',
    'Bipolar and related disorders',
    'Anxiety disorders',
    'Stress related disorders',
    'Dissociative disorders',
    'Somatic symptoms disorders',
    'Eating disorders',
    'Sleep disorders',
    'Disruptive disorders',
    'Depressive disorders',
    'Substance related disorders',
    'Neurocognitive disorders',
    'Schizophrenia',
    'Obsessive-compulsive disorders',
    'Personality disorders',
    'Other'
  ];

  const [filterInput, setFilterInput] = useState([]);

  const handleSort = (e) => setSortBy(e.target.value);

  const handleCheckbox = (e) => {
    filterInput.includes(e.target.id)
      ? setFilterInput(prevInput => prevInput.filter(value => value !== e.target.id))
      : setFilterInput(prevInput => prevInput.concat(e.target.id));
  };

  const applyFilters = () => setFilters(filterInput);

  return (
    <div id='menu'>
      <div id='sort-container'>
        <label htmlFor='sort'>Sort by: </label>
        <select name='sort' id='sort' value={sortBy} onChange={handleSort}>
          <option value='newest post'>Newest post</option>
          <option value='oldest post'>Oldest post</option>
          <option value='newest edit'>Newest edit</option>
          <option value='oldest edit'>Oldest edit</option>
          <option value='most relatable'>Most relatable</option>
          <option value='least relatable'>Least relatable</option>
        </select>
      </div>
      <div id='filter-container'>
        <p>Filters</p>
        {possibleFilters.map(filter => (
          <div className='checkbox' key={filter}>
            <input
              type='checkbox'
              id={filter}
              checked={filterInput.includes(filter)}
              onChange={handleCheckbox}
            />
            <label htmlFor={filter}>{filter}</label>
          </div>
        ))}
        <button onClick={applyFilters}>Apply filters</button>
      </div>
    </div>
  )
}

export default ForumMenu;