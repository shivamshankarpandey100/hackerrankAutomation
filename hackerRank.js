const puppeteer=require("puppeteer");
let email="shivasinghrajput07@gmail.com";
let password="Shivam@123";
let cTab;
let {answers}=require("./code");
let browserOpenPromise=puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:["--start-maximized"],
    executablePath:"C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"
    // C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe
});
browserOpenPromise
.then(function(browser){
    console.log("browser is opened !");
    let allTabsPromise = browser.pages();
    return allTabsPromise;
})
.then(function(allTabs){
     cTab=allTabs[0];
    console.log("new tab is opened !");
    let visitingLoginPage=cTab.goto("https://www.hackerrank.com/auth/login");
    return visitingLoginPage;
})
.then(function(){
console.log("login page is opened !");
let emailTypePromise=cTab.type("input[name='username']",email);
return emailTypePromise;
})
.then(function(){
    console.log("email is typed !");
    let pwdTypePromise=cTab.type("input[name='password']",password);
    return pwdTypePromise;
})
.then(function(){
    console.log("password is typed !");
    let loginPromise=cTab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return loginPromise;
})
.then(function(){
    console.log("logged into hackerrank successfully");
    let algotaqbopenpromise=waitAndClick("div[data-automation='algorithms']");
    return algotaqbopenpromise;
})
.then(function(){
    console.log("algorithms page is opened !");
    let allquestionPromise=cTab.waitForSelector('a[data-analytics="ChallengeListChallengeName"]');
    return allquestionPromise;
})
.then(function(){
    function getAllQuesLink(){
        let allElementArr=document.querySelectorAll('a[data-analytics="ChallengeListChallengeName"]');
        let linkArr=[];
        for(let i=0;i<allElementArr.length;i++){
            linkArr.push(allElementArr[i].getAttribute("href"));
        }
        return linkArr;
    }

    let linksArrPromise=cTab.evaluate(getAllQuesLink);
    return linksArrPromise;
    // .eveluate
})
.then(function(linksArr){
    //Solve the Questions
    // console.log(linksArr);
    let questionWillBeSolvedPromise=questionSolver(linksArr[0],0);
    return questionWillBeSolvedPromise;
    
})
.then(function(){
    console.log("question is solved !");
})
.catch(function(err){
    console.log(err);
});

// It is use for the wait and click function because it is use for the wait and click the element
function waitAndClick(selector){
    let myPromise=new Promise(function(resolve,reject){
        let waitForSlectorPromise=cTab.waitForSelector(selector);
        waitForSlectorPromise
        .then(function(){
            console.log("algo btn is found");
            let clickPromise=cTab.click(selector);
            return clickPromise;
        })
        .then(function(){
            console.log("algo btn is clicked");
             resolve();
           
        })

        .catch(function(err){
            console.log(err);
        })
});
return myPromise;
}

function questionSolver(url,idx){

    return new Promise(function(resolve, reject){
        let fullLink=`https://www.hackerrank.com${url}`;
    let goToQuestionPagePromise=cTab.goto(fullLink);
    goToQuestionPagePromise
    .then(function(){
        console.log("question page is opened !");
        let waitForCheckboxAndClickPromise=waitAndClick("checkbox-input");
        return  waitForCheckboxAndClickPromise;
    })
    .then(function(){
        console.log("checkbox is clicked !");
        let waitForTextBoxPromise=cTab.waitForSelector(".custominput");
        return waitForTextBoxPromise;
    })
    .then(function(){
    let codeWillbeTypedPromise=cTab.type(".custominput",);
    })
    .catch(function(err){
        reject(err);
    })
    });
    
}



