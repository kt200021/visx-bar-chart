import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"  
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <p>Count 1 is {count1}</p>
      <button onClick={() => {
          setCount(count + 1)
          setCount1(count1+2)
          console.log(count)
          console.log(count1)
          }}>
        Click me
      </button>
    </div>
  );
}

export default Example;