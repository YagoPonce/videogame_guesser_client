import React, { useEffect, useState } from "react";
import { createVideogameService, genresService } from "../../services/create.videogame.service";
import { uploadImageService, uploadImageNamelessService } from "../../services/upload.services";
import { useNavigate } from "react-router-dom";
import { MuiPicker } from "../../components/MuiPicker";

function CreateVideogame() {
  const navigate = useNavigate();

  //set up state for all form fields:
  // name: String
  const [nameInput, setNameInput] = useState("");
  // imageUrl: String
  const [imageUrl, setImageUrl] = useState("");  
  // imageNameless: String
  const [imageNameless, setImageNameless] = useState("");
  // release: Date
  const [releaseInput, setReleaseInput] = useState("");
  // description: String
  const [descriptionInput, setDescriptionInput] = useState();
  // metacriticScore: Number
  const [metacriticScoreInput, setMetacriticScoreInput] = useState();
  // developer: String
  const [developerInput, setDeveloperInput] = useState();
   // players: Number
const [playersInput, setPlayersInput] = useState();
  // genre: String
  const [genreInput, setGenreInput] = useState();
  const [ allGenres, setAllGenres ] = useState()



  //set up handlechanges for all the fields:
  const handleNameChange = (event) => setNameInput(event.target.value);
  const handleReleaseChange = (event) => setReleaseInput(event.target.value);
  const handledescriptionChange = (event) => setDescriptionInput(event.target.value);
  const handleMetacriticScoreChange = (event) => setMetacriticScoreInput(event.target.value);
  const handleDeveloperChange = (event) => setDeveloperInput(event.target.value);
  const handlePlayersChange = (event) => setPlayersInput(event.target.value);
  const handleGenreChange = (event) => {
    let value = Array.from(event.target.selectedOptions, option => option.value)
    setGenreInput(value);
  }
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingImageNameless, setIsUploadingImageNameless] = useState(false);
  const [isFetching, setIsFetching] = useState(true);


useEffect(() => {
    getData()
  }, [])

  const getData = async (event) => {
    
    try {
      const genresData = await genresService()
      setAllGenres(genresData.data)
      setIsFetching(false)
    } catch(err) {
      navigate("/error")
    }
  }

  const addVideogame = async (event) => {
    event.preventDefault();

    const newVideogame = {
      name: nameInput,
      imageUrl: imageUrl,
      imageNameless: imageNameless,
      release: releaseInput,
      description: descriptionInput,
      metacriticScore: metacriticScoreInput,
      developer: developerInput,
      players: playersInput,
      genre: genreInput,
    };
    try {
      await createVideogameService(newVideogame);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = async (event) => {
    setIsUploadingImage(true);

    const sendForm = new FormData();
    sendForm.append("image", event.target.files[0]);
    console.log(event.target.files)
    try {
      const response = await uploadImageService(sendForm);
      setImageUrl(response.data.image);
      
      setIsUploadingImage(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImageNameless = async (event) => {
    setIsUploadingImageNameless(true);

    const sendForm = new FormData();
    sendForm.append("image", event.target.files[0]);
    console.log(event.target.files)

    try {
      const response = await uploadImageNamelessService(sendForm);
      setImageNameless(response.data.image);
      
      setIsUploadingImageNameless(false);
    } catch (error) {
      console.log(error);
    }
  };


 if (isFetching === true) {
    return (
      <div>
        <h1>Cargando...</h1>
      </div> 
     )
    }

  return (
    <div>
      <h1>Add new videogames!</h1>
      <form className="form">
      <div>
        <label htmlFor="image">Portada</label>
        <input
          type="file"
          id="formFile"
          name="image"
          onChange={handleUploadImage}
        />
        <br />
        <label htmlFor="image">Portada sin t??tulo</label>
        <input
          type="file"
          id="formFile"
          name="image"
          onChange={handleUploadImageNameless}
        />
        <br />
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          name="name"
          className="inputs"

          value={nameInput}
          onChange={handleNameChange}
        />
        <br />

        <label htmlFor="release">Fecha de salida</label>
          <MuiPicker  setReleaseInput={ setReleaseInput } />
        <br />

        <label htmlFor="description" >Descripci??n</label>
        <input
          type="text"
          name="description"
          className="descriptionInput inputs"
          value={descriptionInput}
          onChange={handledescriptionChange}
        />
        <br />

        <label htmlFor="metacriticScore">Puntuaci??n en metacritic</label>
        <input
          type="number"
          name="metacriticScore"
          className="inputs"

          value={metacriticScoreInput}
          onChange={handleMetacriticScoreChange}
        />
        <br />

        <label htmlFor="developer">Desarrolladora</label>
        <input
          type="text"
          name="developer"
          className="inputs"

          value={developerInput}
          onChange={handleDeveloperChange}
        />
        <br />

        <label htmlFor="players">N?? Jugadores</label>
        <input
          type="number"
          name="players"
          className="inputs"

          value={playersInput}
          onChange={handlePlayersChange}
        />
        <br />
        <label htmlFor="genre">G??nero</label>
        <select
          multiple
          name="genre"
          className="inputs"

          value={genreInput}
          onChange={handleGenreChange}>
          {allGenres.map((eachEl, index) =>{
              return(
              <option key={index} value={eachEl}>{eachEl}</option>
              )
            })}
        </select>
        <br />
       </div>
        
              <div>
      <button type='form' className="button" onClick={addVideogame}>A????delo!</button>
</div>
      </form>

    </div>
  );
}

export default CreateVideogame;
