import { v4 as uuidv4 } from 'uuid';
// es gibt auch bessere Methoden, zum Generieren von IDs (kommen wir noch zu)


// Zwecks Einfachheit arbeiten wir ohne jegliche (Pseudo-)Datenbank
// und speichern die Bücher in einem Array
const books = [
    { title: 'Book 1', author: 'Author 1', id: "7aabfffa-6b50-4958-954a-64d460dd0190" },
    { title: 'Book 2', author: 'Author 2', id: "b0514662-3d8a-4ddb-ae18-5753a0d506ec" },
    { title: 'Book 3', author: 'Author 3', id: "d57ec87e-f77c-4a22-92b0-177c7454b013" },
]; // Besser wäre natürlich uuid() oder ähnliches für die ids der Bücher


// Fehler erzeugen (zum Testen)
export const getError = (req, res) => {
    throw new Error("Express Standard Error Middleware")
}

// Fehler erzeugen (zum Testen)
export const getErrorEigeneMiddleware = (req, res, next) => {
    next( new Error("Eigene Error Middleware") );
}


// alle Bücher an client senden
export const getBooks = (req, res) => {
	// Füge zwecks debugging (also Fehlerfindung/behebung) weitere Infos an jedes Buch hinzu
	// => Aber nur, wenn wir uns in einer Entwcklingsumgebung befinden
    if( process.env.NODE_ENV === "development") {
        const extendedBooks =  books.map( book =>{
            return {
                ...book, 
                // debugInfo kommt jetzt zu jedem Buch hinzu
                debugInfo: `Abgerufen am: ${new Date().toLocaleString("de")}`
                // Diese Info könnte uns helfen, wenn die App komplex wird
            }
        })

        return res.json(extendedBooks)
    }

    res.json(books);
}

// Buch vom Client hinzufügen
export const postBooks = (req, res) => {
    // hier sollten wir eigentlich noch die Nutzereingabe
    // überprüfen, bevor wir sie in unserer "Datenbank" bzw. 
    // unserem Array speichern

    // in req.body steht der Inhalt von Body des HTTP-Requests
    // ( da wir in server.js `app.use( express.json() );`aufrufen)
    const book = req.body;
    book.id = uuidv4(); // zufällige ID generieren
    books.push(book);

    res.status(201).json({ added: true, data: book}); // 201 = Created
}