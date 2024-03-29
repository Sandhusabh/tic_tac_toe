let user = {
    name: "John",
    surname: "Smith",
  
    get fullName() {
      return `${name} ${surname}`;
    }
  };
  
  console.log(user.fullName); // John Smith