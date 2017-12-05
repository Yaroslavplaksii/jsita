var API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM4NThiOTAwNDg1ZmQ2MDg5ZWU2ZGRhMTgyODBlMjI0ODJmOGRjM2M4ZTkzYjU4NWMyZjk1NjFkN2JhNDQyMTY4ZTc0OTNlYzBiZmI2ZmEwIn0.eyJhdWQiOiIxMCIsImp0aSI6IjM4NThiOTAwNDg1ZmQ2MDg5ZWU2ZGRhMTgyODBlMjI0ODJmOGRjM2M4ZTkzYjU4NWMyZjk1NjFkN2JhNDQyMTY4ZTc0OTNlYzBiZmI2ZmEwIiwiaWF0IjoxNTA5NjQxNzk3LCJuYmYiOjE1MDk2NDE3OTcsImV4cCI6MTgyNTE3NDU5Nywic3ViIjoiNTI2Iiwic2NvcGVzIjpbInVzZXJCYXNlSW5mbyIsInVzZXJEZXRhaWxlZEluZm8iLCJ1c2VyQ291cnNlSW5mbyJdfQ.7HpA6KGg41Wa6vmUJ4sGt4v_dEXZm5SBrkAjO5dFYlSl0g5P8z49dyxTtIFSdBWDiZ65RoiBNGz9hEP5-8kZtsAAnpLdYddtILHbX3JFDckHvjl0VNqAzFFWNPduXzYyXcwxzdoT-EMzWxwUwLESEsNoeXM0fbyWSOOhsDQWJfpbYC7Ve2nfsy30b0tXp43iM5FrYL158K_4ow2lLafDTMXZpWkfxfqwe-R_6GF-L8VcLDItrUH64ypbgrPQJJ0v2RPZLNdn7lbgRIjlasmIwrSF77BNCHSpJmh9ginBo-jK-fkx0Nu6Jd82V_ItftxLqWrnwOgK4dUUIzrs4X0Uj6opHC4_9OJzDc2izTKHZSD6sWRfhctzTXOMlcuI7GrZ6DXGp-gtQwA2VdScT672hdU5fUmGwHIuI68a9x8ZrobOw3X79mLL1hPrELq39VBD9MpZ6CFeit2K6U9Gq1MSb_k_Kf7m3SQCnvHIu6fjF86EXnzGcTrZtRMPNH39wv36wwsWSTKPqo2fWv7ibQqBgCaPfpPr2gkKF5QkfYym8N2Bb5IYtZi6_TTRpn2aQ7QOI7WsNayRcdQx9zQ-xnGdlc4DD-Z7jZiyCgFf-0gpPXeIOA1qUwIKyOlgug9A6p2fYFtEW9hYFOO9XjAthbMD4FQOor_oxjI7EuxNljnAJ6U';
var client = new INTITAClient({
    key: API_KEY,
});

client.getModuleLectures(id_lecture,function (error, data) {
    
        console.log(data.id_lecture);
   
    
});


var lect = new Array();
//console.log(client.getModuleLectures());
/*client.getModuleLectures(function (error, data) {
    data.lectures.forEach(function (element) {
    console.log(element);
    });
   // lect[data.lecture_ID] = data.title_ua; 
});*/

client.getUserDetails( function (error, data) {
   
    document.getElementById("avatar").src = data.avatar;
    document.getElementById("firstName").innerHTML = data.firstName;
    document.getElementById("secondName").innerHTML = data.secondName;

    document.getElementById("email").innerHTML = data.email;
    document.getElementById("phone").innerHTML = data.phone;
    document.getElementById("skype").innerHTML = data.skype;

// document.getElementById("country").innerHTML = data.country;
  //  document.getElementById("city").innerHTML = data.city;
  //  document.getElementById("address").innerHTML = data.address;
  //  document.getElementById("education").innerHTML = data.education;
});


client.getUserCoursesAndModules( function (error, data) {

    data.courses.forEach(function (element) {
        var id = element.id;


        client.getCourseInfo(id, function (error, data) {
            document.getElementById("title").innerHTML = element.title;

            client.getCourseModules(id, function (error, data) {
              /// console.log('course modules', data);
                var moduleContainer = document.getElementById("modules");
                var container = document.createElement('div');
                //var containerList = document.getElementById("module__list");

                data.forEach(function (module, index) {
                    client.getModuleInfo(module.id, function (error, moduleInfo) {
                        
                        var moduleInfoEl = document.createElement('div');
                            moduleInfoEl.setAttribute('class','module');
                            moduleInfoEl.setAttribute('id',moduleInfo.module_ID);                    
                            moduleInfoEl.innerHTML = '<span class="nameModul" data-id="'+moduleInfo.module_ID+'">'+moduleInfo.title_ua + '</span>';
                            container.appendChild(moduleInfoEl);

                        if (index === data.length - 1) {
                            moduleContainer.appendChild(container);
                        }
                        
                    });
                });
            });
        });
    });
});

