import express from "express";
import { addMovie, getAllMovies, getMoviesById } from "../controllers/movie-controller";
const movieRouter = express.Router();

movieRouter.get("/",getAllMovies);
movieRouter.get("/:id",getMoviesById);
movieRouter.post("/",addMovie);


export default movieRouter;