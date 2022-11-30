const express = require('express');
const cors = require('cors');

const companyRouter = require("./company/companyRouter");
const authRouter = require("./auth/authRouter");

const app = new express();

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use(cors({credentials: true, origin: "http://localhost:8080"}));

app.use((req, res, next) => {
    setTimeout(() => {
        console.log("pause....");
        next();
        console.log("play");
    }, 3000);

})

/** 회사 라우터**/
app.use("/company", companyRouter)

/**
 * 사용자 라우터
 */

app.use("/auth", authRouter);


app.listen("9999", () => {
    console.log("listen mock api server ");
})
