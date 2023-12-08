import { ExpressAplication } from "./infrastructure/express-application";
import { Citation } from "./citation/citation";

new ExpressAplication().bootstrap();

Citation.sync();