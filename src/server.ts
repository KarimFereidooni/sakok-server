import app from "./app";
import config from "../app-config.json";

// tslint:disable-next-line: no-console
app.listen(config.Port, () => console.log(`Listening on port ${config.Port}`));
