import React from 'react';

function JoinCreate(props:any) {
  const {findGame} = props;

  const handleSubmit = (event:any) => {
    event.preventDefault();
    findGame(event.target[0].value);
    console.log(event.target[0].value);

  };

  return (
    <div id = "join-create">
      <form onSubmit = {handleSubmit}>
        <label>
          Create New Game:
          <input type="text" name="username" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <form onSubmit = {handleSubmit}>
        <label>
          Find Existing Game:
          <input type="text" name="username" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default JoinCreate;
