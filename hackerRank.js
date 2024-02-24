const puppeteer=require("puppeteer");
let email="shivasinghrajput07@gmail.com";
let password="Shivam@123";
let cTab;
let browserOpenPromise=puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:["--start-maximized"],
    executablePath:"C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"
});
browserOpenPromise
.then(function(browser){
    // console.log("browser is opened !");
    let allTabsPromise = browser.pages();
    return allTabsPromise;
})
.then(function(allTabs){
     cTab=allTabs[0];
    // console.log("new tab is opened !");
    let visitingLoginPage=cTab.goto("https://www.hackerrank.com/auth/login");
    return visitingLoginPage;
})
.then(function(){
console.log("login page is opened !");
let emailTypePromise=cTab.type("input[name='username']",email);
return emailTypePromise;
})
.then(function(){
    // console.log("email is typed !");
    let pwdTypePromise=cTab.type("input[name='password']",password);
    return pwdTypePromise;
})
.then(function(){
    // console.log("password is typed !");
    let loginPromise=cTab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return loginPromise;
})
.then(function(){})
.catch(function(err){
    console.log(err);
});