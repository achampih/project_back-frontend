export const getRoot = (req, res)=> {
    res.send("Server ist am Start!")
}

export const notFound = (req, res)=> {
    res.status(404).send("Seite nicht gefunden :/")
}