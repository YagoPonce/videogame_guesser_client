import service from "./config.services";

const uploadImageService = (imageFile) => {
  return service.post("/uploader", imageFile)
}

const uploadImageNamelessService = (imageFile) => {
  return service.post("/uploader/nameless", imageFile)
}

export {
  uploadImageService,
  uploadImageNamelessService

}