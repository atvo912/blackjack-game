import React from 'react';

function SetUser(props:any) {
  let {setCurrentView, setUsername} = props;

  const handleSubmit = (event:any) => {
    event.preventDefault();
    setCurrentView('join-create');
    console.log(event.target[0].value);
    setUsername(event.target[0].value);
    console.log('submit pressed');
  };

  return (
    <div id = "set-user">
      <form onSubmit = {handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default SetUser;
