const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tracks: [{ type: Schema.Types.ObjectId, ref: "Track" }],
    image: {type:String, required: true},
    resources: [{ type: String }],
    order: { type: Number },
})

CourseSchema.virtual("url").get(function () {
    return `/course/${this._id}`;
});


module.exports = mongoose.model("Course", CourseSchema);

//Pendientes:
// Arreglar las descripciones de los cursos y corregir si alguna lección está mal (hecho) xd
// Mejorar las imagenes de los cursos (delegar a liuke :v) xd
// Recursos a las lecciones  (agregar ahora) xd
// Corregir lo de los blogs que se ve mal (preguntarle a Rama) xd

// Links para que suban los posts que ellos mismos hacen

// Podria agregar alguna funcionalidad para que todas las lecciones esten conectadas (secundario)
// entre ellas lo que haria más interactivo la lectura de las mismas (secundario)
// Problema de margen con la barra de nav en devs skills :) :) (secundario)
// Que aparezca la cantidad de estudiantes inscriptos (secundario)
// Links de los estudiantes (secundario)