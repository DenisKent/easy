import React from "react";

const App: React.FC = () => {
  const add = (a: number, b: number): number => {
    return a + b;
  };

  return (
    <div>
      <h1>Hello typescript world, {add(5, 5)}</h1>
    </div>
  );
};
export default App;
