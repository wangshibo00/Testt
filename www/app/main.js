import React from "react";
import dva from "dva";
import { createLogger } from "redux-logger";

import picshow from "./models/picshow.js";
import router from "./router.js";

const app = dva({
     onAction: createLogger()
});
app.model(picshow);


app.router(router);

app.start("#root");