import React from 'react';

function JoinCreate(props:any) {
  const {findGame, createGame} = props;

  const handleSubmit = (event:any) => {
    event.preventDefault();

    console.log(event.target[0].value);
    console.log(event.target.name);
    console.log(event);

    if (event.target.name === 'create') {
      createGame(event.target[0].value);
    };

    if (event.target.name === 'find') {
      findGame(event.target[0].value);
    };

  };

  return (
    <div id = "join-create">
      <form name = "create" onSubmit = {handleSubmit}>
        <label>
          Create New Game:
          <input type="text" name="username" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <form name = "find" onSubmit = {handleSubmit}>
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
