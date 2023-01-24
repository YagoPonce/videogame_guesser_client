import service from "./config.services";

//create a new videogame im DB
const createVideogameService = (newVideogame) => {
    return service.post(`/videogames/create-videogame`, newVideogame)
}

//send information of utils "genres" from BE
const genresService = () => {
    return service.get("/videogames/genre")
}


export {
    createVideogameService,
    genresService
}
