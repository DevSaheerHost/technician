//auth status change check, displays 
auth.onAuthStateChanged(user => {
    if(user) {
        console.log("User Logged In");
        //get data
        setup(user);
        //editDisplay(user);
    } else {
        console.log("User Logged Out");
        setup();
    }
})

//DOM
const signupForm = document.querySelector('#signup-form');
const editForm = document.querySelector('#edit-form');
const logOut = document.querySelector('#logout');
const logInForm = document.querySelector('#login-form');
const content = document.querySelector('.content');
const loggedIn = document.querySelectorAll('.logged-in');
const loggedOut = document.querySelectorAll('.logged-out');
const home = document.querySelector('.home');

//signup
if(signupForm){
    signupForm.addEventListener('submit', signUpEvent);

    function signUpEvent(event){
        event.preventDefault();
    
        //get user info
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-password'].value;
        const firstName = signupForm['signup-firstname'].value;
        const middleName = signupForm['signup-middlename'].value;
        const lastName = signupForm['signup-lastname'].value;
        const age = signupForm['signup-age'].value;
        const address = signupForm['signup-address'].value;
        const occupation = signupForm['signup-occupation'].value;
        const reference = signupForm['signup-reference'].value;

        //signup user
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            return db.collection('user-details').doc(cred.user.uid).set({
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                age: age,
                address: address,
                occupation: occupation,
                reference: reference
            }).then(() => {
                signupForm.reset();
                location.replace('index.html');
            });
        }).catch(function(error) {
            alert(error.message);
        });
    }
}

//logout
if(logOut){
    logOut.addEventListener('click', logOutEvent);

    function logOutEvent(event){
        event.preventDefault();

        //signout user
        auth.signOut().then(() => {
            location.replace("index.html")
        });
    }
}

//login
if(logInForm){
    logInForm.addEventListener('submit', logInEvent);

    function logInEvent(event){
        event.preventDefault();

        //get user info
        const email = logInForm["login-email"].value;
        const password = logInForm["login-password"].value;

        console.log(email, password);

        auth.signInWithEmailAndPassword(email, password).then(cred => {
            logInForm.reset();
            location.replace("index.html");
        }).catch(function(error) {
            alert(error.message);
        })
    }
}

//setup
const setup = (user) => {
    if(user){
        //user details display
        if(content){
            db.collection('user-details').doc(user.uid).get().then(doc => {
                const li = `
                        <div><h2> Hello ${doc.data().firstName}! </h2></div>
                        <div class="desc">Here are your account details</div>
                        <div class="hiddencontent">
                            <li> First Name: ${doc.data().firstName} </li>
                            <li> Middle Name: ${doc.data().middleName} </li>
                            <li> Last Name: ${doc.data().lastName} </li>
                            <li> Age: ${doc.data().age} </li>
                            <li> Address: ${doc.data().address} </li>
                            <li> Occupation: ${doc.data().occupation} </li>
                        </div>
                  `;
                    content.innerHTML = li;
            })
        }

        //edit
        if(editForm){
            //display user info
            db.collection('user-details').doc(user.uid).get().then(doc => {
                editForm['edit-email'].value = user.email;
                editForm['edit-password'].value = user.password;
                editForm['edit-firstname'].value = doc.data().firstName;
                editForm['edit-middlename'].value = doc.data().middleName;
                editForm['edit-lastname'].value = doc.data().lastName;
                editForm['edit-age'].value = doc.data().age;
                editForm['edit-address'].value = doc.data().address;
                editForm['edit-occupation'].value = doc.data().occupation;
            })

            editForm.addEventListener('submit', editEvent);
            function editEvent(event){
                event.preventDefault();
        
                //get new user info
                const firstName = editForm['edit-firstname'].value;
                const middleName = editForm['edit-middlename'].value;
                const lastName = editForm['edit-lastname'].value;
                const age = editForm['edit-age'].value;
                const address = editForm['edit-address'].value;
                const occupation = editForm['edit-occupation'].value;
        
                db.collection('user-details').doc(user.uid).update({
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    age: age,
                    address: address,
                    occupation: occupation
                }).then(()=>{
                    editForm.reset();
                    location.replace('index.html');
                }).catch(function(error) {
                    alert(error.message);
                });
            }
        }
        //toggle nav elements
        loggedIn.forEach(item => item.style.display = 'inline');
        loggedOut.forEach(item => item.style.display = 'none');
        home.style.display = 'inline';

    }else{
        //toggle nav elements
        loggedIn.forEach(item => item.style.display = 'none');
        loggedOut.forEach(item => item.style.display = 'inline');
        home.style.display = 'inline';
    }
}

console.log("JavaScript loaded successfully");