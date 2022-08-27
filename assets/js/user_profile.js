var btn = document.getElementById('sign-out');

btn.addEventListener('click', function(){
    console.log('clicked');
    // // document.cookie = "username=Jujjwal";
    // document.cookie = "age=12";
    // console.log(document.cookie);
    // document.cookie = "age=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
})