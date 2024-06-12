function checkData(){
    var enterEmail = document.getElementById('email').value;
    var enterPwd = document.getElementById('pwd').value;

    //ger data form local host
    
     var getEmail=localStorage.getItem('userEmail');
     var getPwd=localStorage.getItem('userPwd');

     if(enterEmail == getEmail)
     {
        if(enterPwd == getPwd)
        {
            alert("Login Successful");
            //<a href="index.html"></a>
        }
        else
        {
            alert("Wrong Password");
        }
     }
     else
     {
        alert("Invalid details");
     }
}