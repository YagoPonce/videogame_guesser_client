import service from "./config.services";

//create a new videogame im DB
const createVideogameService = (newVideogame) => {
    return service.post(`/videogames/create-videogame`, newVideogame)
}




export {
    createVideogameService
}