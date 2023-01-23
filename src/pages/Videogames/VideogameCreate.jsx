import React, { useEffect, useState } from "react";
import { createVideogameService } from "../../services/create.videogame.service";
import { uploadImageService } from "../../services/upload.services";
import { useNavigate } from "react-router-dom";

function CreateVideogame() {
  const navigate = useNavigate();

  //set up state for all form fields:
  // name: String
  const [nameInput, setNameInput] = useState("");
  // imageUrl: String
  const [imageUrl, setImageUrl] = useState("");
  // release: Date
  const [releaseInput, setReleaseInput] = useState("");
  // description: String
  const [descriptionInput, setDescriptionInput] = useState();
  // metacriticScore: Number
  const [metacriticScoreInput, setMetacriticScoreInput] = useState();
  // developer: String
  const [developerInput, setDeveloperInput] = useState();
  // genre: String
  const [genreInput, setGenreInput] = useState();

  //set up handlechanges for all the fields:
  const handleNameChange = (event) => setNameInput(event.target.value);
  const handleReleaseChange = (event) => setReleaseInput(event.target.value);
  const handledescriptionChange = (event) => setDescriptionInput(event.target.value);
  const handleMetacriticScoreChange = (event) => setMetacriticScoreInput(event.target.value);
  const handleDeveloperChange = (event) => setDeveloperInput(event.target.value);
  const handleGenreChange = (event) => setGenreInput(event.target.value);

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const addVideogame = async (event) => {
    event.preventDefault();

    const newVideogame = {
      name: nameInput,
      imageUrl: imageUrl,
      release: releaseInput,
      description: descriptionInput,
      metacriticScore: metacriticScoreInput,
      developer: developerInput,
      genre: genreInput,
    };
    try {
      await createVideogameService(newVideogame);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = async (event) => {
    setIsUploadingImage(true);

    const sendForm = new FormData();
    sendForm.append("image", event.target.files[0]);

    try {
      const response = await uploadImageService(sendForm);
      setImageUrl(response.data.image);
      
      setIsUploadingImage(false);
    } catch (error) {
      console.log(error);
    }
  };


  const chechImageUrl = () => {
console.log(imageUrl)
  }
  return (
    <div>
      <h1>Add new videogames!</h1>

      <form>
        <label htmlFor="image"></label>
        <input
          type="file"
          id="formFile"
          name="image"
          onChange={handleUploadImage}
        />
        <br />
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          name="name"
          value={nameInput}
          onChange={handleNameChange}
        />
        <br />

        <label htmlFor="release">Fecha de salida</label>
        <input
          type="text"
          name="release"
          value={releaseInput}
          onChange={handleReleaseChange}
        />
        <br />

        <label htmlFor="description">Descripción</label>
        <input
          type="text"
          name="description"
          value={descriptionInput}
          onChange={handledescriptionChange}
        />
        <br />

        <label htmlFor="metacriticScore">Puntuación en metacritic</label>
        <input
          type="text"
          name="metacriticScore"
          value={metacriticScoreInput}
          onChange={handleMetacriticScoreChange}
        />
        <br />

        <label htmlFor="developer">Desarrolladora</label>
        <input
          type="text"
          name="developer"
          value={developerInput}
          onChange={handleDeveloperChange}
        />
        <br />

        <label htmlFor="genre">Género</label>
        <input
          type="text"
          name="genre"
          value={genreInput}
          onChange={handleGenreChange}
        />
        <br />

      <button type='form' onClick={addVideogame}>Añádelo!</button>

      </form>

      <button onClick={chechImageUrl} >Comprovar</button>
    </div>
  );
}

export default CreateVideogame;
