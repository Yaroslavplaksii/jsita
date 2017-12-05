var API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM4NThiOTAwNDg1ZmQ2MDg5ZWU2ZGRhMTgyODBlMjI0ODJmOGRjM2M4ZTkzYjU4NWMyZjk1NjFkN2JhNDQyMTY4ZTc0OTNlYzBiZmI2ZmEwIn0.eyJhdWQiOiIxMCIsImp0aSI6IjM4NThiOTAwNDg1ZmQ2MDg5ZWU2ZGRhMTgyODBlMjI0ODJmOGRjM2M4ZTkzYjU4NWMyZjk1NjFkN2JhNDQyMTY4ZTc0OTNlYzBiZmI2ZmEwIiwiaWF0IjoxNTA5NjQxNzk3LCJuYmYiOjE1MDk2NDE3OTcsImV4cCI6MTgyNTE3NDU5Nywic3ViIjoiNTI2Iiwic2NvcGVzIjpbInVzZXJCYXNlSW5mbyIsInVzZXJEZXRhaWxlZEluZm8iLCJ1c2VyQ291cnNlSW5mbyJdfQ.7HpA6KGg41Wa6vmUJ4sGt4v_dEXZm5SBrkAjO5dFYlSl0g5P8z49dyxTtIFSdBWDiZ65RoiBNGz9hEP5-8kZtsAAnpLdYddtILHbX3JFDckHvjl0VNqAzFFWNPduXzYyXcwxzdoT-EMzWxwUwLESEsNoeXM0fbyWSOOhsDQWJfpbYC7Ve2nfsy30b0tXp43iM5FrYL158K_4ow2lLafDTMXZpWkfxfqwe-R_6GF-L8VcLDItrUH64ypbgrPQJJ0v2RPZLNdn7lbgRIjlasmIwrSF77BNCHSpJmh9ginBo-jK-fkx0Nu6Jd82V_ItftxLqWrnwOgK4dUUIzrs4X0Uj6opHC4_9OJzDc2izTKHZSD6sWRfhctzTXOMlcuI7GrZ6DXGp-gtQwA2VdScT672hdU5fUmGwHIuI68a9x8ZrobOw3X79mLL1hPrELq39VBD9MpZ6CFeit2K6U9Gq1MSb_k_Kf7m3SQCnvHIu6fjF86EXnzGcTrZtRMPNH39wv36wwsWSTKPqo2fWv7ibQqBgCaPfpPr2gkKF5QkfYym8N2Bb5IYtZi6_TTRpn2aQ7QOI7WsNayRcdQx9zQ-xnGdlc4DD-Z7jZiyCgFf-0gpPXeIOA1qUwIKyOlgug9A6p2fYFtEW9hYFOO9XjAthbMD4FQOor_oxjI7EuxNljnAJ6U';
var client = new INTITAClient({
    key: API_KEY,
});
client.getUserDetails(function (error, data) {
    console.log(error, data);
    document.getElementById("avatar").src = data.avatar;
    document.getElementById("firstName").innerText = data.firstName;
    document.getElementById("secondName").innerText = data.secondName;

    document.getElementById("email").innerText = data.email;
    document.getElementById("phone").innerText = data.phone;
    document.getElementById("skype").innerText = data.skype;
});

client.getUserCoursesAndModules(function (error, data) {

    data.courses.forEach(function (element) {
        var id = element.id;

        client.getCourseInfo(id, function (error, data) {

            client.getCourseModules(id, function (error, data) {

                var moduleList = document.getElementById("module__list");
                var newList = "<button class=\"accordion\">" + "</button>"
                    + "<ul class=\"panel\">" + "</ul>";
                var newItem = "<li class=\"panel__text\">" + "</li>";
                //var listElement = moduleList.innerHTML += newList;
var g=module.id;

                data.forEach(function (module, index) {
                    client.getModuleInfo(module.id, function (error, moduleInfo) {
                        //console.log('moduleInfos', module.id, moduleInfo);
                        //console.log('fff',data);

                        moduleList.innerHTML += newList;

                        var moduleInfoEl = document.getElementsByClassName('accordion');
                        moduleInfoEl[i++].innerText = moduleInfo.title_ua;

                        console.log("h",moduleInfo)
                        for(var i=0; i<data.length; i++){


                        }

                        //var element = listElement.innerHTML = newItem;


                        /*var moduleInfoEl = document.getElementById('accordion');
                        moduleInfoEl.innerText = moduleInfo.title_ua;

                        if (index === data.length - 1) {
                            moduleContainer.appendChild(container);
                        }*/
                        /*moduleList.innerHTML += "<li class=\"list__block\">"
                            + "<a href=\"#\">"
                                + "<div class=\"block__efect\">"
                                    + "<div class=\"block__efect-top\">"
                                        + "<img id=\"imgCurse\" class=\"efect-image\">"

                                    + "</div>"
                                + "</div>"
                            + "</a>"
                            + "</li>";*/

                    });
                });
            });
        });
    });
});

function createModuleTile(module) {
    /*var title = module.title_ua,
        text = module.for_whom;*/
/*
    var moduleList = document.getElementById("module__list");
    var newList = "<button id=\"accordion\">" + "</button>"
                    + "<ul id=\"panel\">" + "</ul>";
    var newItem = "<li id=\"panel__text\">" + "</li>";
    var listElement = moduleList.appendChild(newList);*/




    //"<div class=\"panel__text\">"
    //+ "</div>"
    // create li
    // create a
    // a.appendChild(li)

    // return a
}


var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    }
}