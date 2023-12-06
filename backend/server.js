import express from "express"
import { getBooks, getError, getErrorEigeneMiddleware, postBooks } from "./controller/bookController.js";
import { getRoot, notFound } from "./controller/generalController.js";
import cors from "cors";
import "dotenv/config";

const PORT = 3000;
const app = express();

// da wir JSON vom Client erwarten, müssen wir das zuvor parsen
// damit es in request.body verfügbar ist
// ähnlich wie JSON.parse(jsonString)
app.use( express.json() );

// In der Entwicklung könntest du CORS für alle Quellen zulassen.
// In der Produktion könntest du CORS auf bestimmte vertrauenswürdige Domänen beschränken.
if( process.env.NODE_ENV === "development" ) {
    app.use( cors() );
} else {
    // TODO: REnder URL eintragen
    app.use( cors({ origin: "http://eine-render-url.com"}) )
}

app.get("/", getRoot);

// getBooks wird als Controller ausgelagert
// Name "getBooks", da es sich um eine GET Methode handelt
app.get("/books", getBooks);
app.post("/books", postBooks);

app.get("/error", getError)
app.get("/error-eigene-middleware", getErrorEigeneMiddleware)

app.use("*", notFound)


// eigene Error Middleware
// In der Entwicklung könntest du vollständige Fehlerstacks zurückgeben.
// In der Produktion könntest du eine allgemeine Fehlermeldung zurückgeben, 
//      um sensible Informationen zu schützen

app.use( (err, req, res, next) => {
    // production => unsere express app ist online
    if(process.env.NODE_ENV === "production") {
        // hier senden wir aus Sicherheitsgründen nur allgemeine Infos
        res.status(500).send("Ein Fehler ist aufgetreten")
    } else {
        // hier senden wir mehr Informationen, da nur wir sie lesen können
         res.status(500).send(err.message);
         console.error(err)
    }
} );


app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
})


// Hinweis zu process.env.NODE_ENV === "development"
// oder process.env.NODE_ENV === "development"

// Es ist oft sinnvoller, explizit zu überprüfen, ob sich die Anwendung im 
// Entwicklungsmodus (development) befindet. Der Hauptgrund dafür ist, dass du 
// in der Regel möchtest, dass deine Anwendung im Produktionsmodus (production) läuft,
// wenn NODE_ENV nicht gesetzt ist oder einen unerwarteten Wert hat.