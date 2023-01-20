import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
  cloud_name: "dpqjgptpj",
  api_key: "993698627727735",
  api_secret: "iTjr9o_sH1xDrmA7qXs8hlIlf60",
  secure: true,
}); //configuracion de mi perfil clodinary

describe("Pruebas en fileUpload", () => {
  test("debe de subir el archivo correctamente a cloudinary", async () => {
    const imageUrl =
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80";
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "foto.jpg"); //crea un nuevo archivo con el nombre foto.jpg

    const url = await fileUpload(file); //sube la imagen a cloudinary en caso de no arrojar error
    expect(typeof url).toBe("string"); //se espera qie tipo de dato de la url sea un string si está correcto

    // console.log(url);

    const segments = url.split("/");
    // console.log(segments);
    const imageId = segments[segments.length - 1].replace(".jpg", ""); // borra el ultimo segemento de la ruta
    // console.log({imageId})

    const cloudResp = await cloudinary.api.delete_resources(['journal/' + imageId], { resource_type: 'image' }); //elimina la img correspondiente a la url que enivamos en el test
    // console.log({cloudResp});

  });
  test("debe retornar null", async () => {
    const file = new File([], "foto.jpg"); //crea un nuevo archivo recibiendo un arreglo vacio
    const url = await fileUpload(file); //arroja null en caso de que no se mande una url de imagen
    expect(url).toBe(null); //se espera que el url devuelto sea null
  });
});
